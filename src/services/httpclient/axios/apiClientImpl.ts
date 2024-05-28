import { ErrorBase } from "@/error/errorBase";
import axios, {AxiosHeaders, AxiosInstance, AxiosRequestConfig} from "axios";
import { HttpStatusCode } from "@/services/httpclient/httpStatusCode";
import {} from "@config/appConfig";
import { Headers } from "@/services/httpclient/axios/headers";
import  ApiClient from "@/services/httpclient/axios/apiClient";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES from "./types";
import appConfig from '@config/appConfig';
import { ApiRequest } from "@/services/httpclient/model/apiRequest";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import utils from "@/utils/validation";

@injectable()
export default class ApiClientImpl implements ApiClient{

    readonly _baseUrl: string;

    constructor(){
        this._baseUrl = appConfig.apiBaseUrl;
    }

    public async get(endpoint: string = "", headers: Headers, requestedData?: ApiRequest<any>, baseURL?: string): Promise<ApiResponse<any>> {
        
        let response = {} as ApiResponse<any>;
        let responseAxios : any;
        let params = {} as any;
        let axiosInstance = {} as AxiosInstance;

        try {
            
            if(utils.isNullOrUndefined(requestedData)){
                axiosInstance = this.createClient(headers);
                
            }else{
                axiosInstance = this.createClient(headers, requestedData.authToken);
                params = requestedData.params;
            }

            if(!utils.isNullOrUndefined(params)){
                responseAxios = await axiosInstance.get(endpoint, {params});
            }else{
                responseAxios = await axiosInstance.get(endpoint);
            }
            
            response.data = responseAxios.data;

        } catch (error: any) {
            response.error = this.handleError(error);
        }
        finally{
            response.statusResponse = responseAxios.status;
            return responseAxios;
        }
    }

    public async post(endpoint: string = "", headers: Headers, requestedData: ApiRequest<any>, baseURL?: string): Promise<ApiResponse<any>> {
        let response = {} as ApiResponse<any>;
        let responseAxios : any;
        let params = {} as any;
        let axiosInstance = {} as AxiosInstance;

        try {
            
            if(utils.isNullOrUndefined(requestedData)){
                axiosInstance = this.createClient(headers, null, baseURL);
                
            }else{
                axiosInstance = this.createClient(headers, requestedData.authToken, baseURL);
                params = requestedData.params;
            }
           
            if(!utils.isNullOrUndefined(params)){
                responseAxios = await axiosInstance.post(endpoint, {params});
            }else{
                responseAxios = await axiosInstance.post(endpoint);
            }
            console.log("3a");
            response.data = responseAxios.data;

        } catch (error: any) {
            console.log("3b");
            response.error = this.handleError(error);
        }
        finally{
            console.log("4");
            response.statusResponse = responseAxios.status;
            return responseAxios;
        }
    }

    // public async uploadFile(endpoint: string = "", headers: Headers, formData: ApiRequest<any>): Promise<ApiResponse<any>> {
    //     try {
    //         // let headers = new  Headers();
    //         // headers.addItem("Content-Type", "multipart/form-data")

    //         const axiosInstance = this.createClient(headers.getHeaders(), formData.authToken);
    //         const response = await axiosInstance.post(endpoint, formData)
    //         return response.data;
    //     } catch (error) {
    //         this.handleError(error);
    //     }
    //     finally{
    //         response.statusResponse = responseAxios.status;
    //     }
    // }

    public async put(endpoint: string, headers: Headers, requestedData: ApiRequest<any>, baseURL?: string): Promise<ApiResponse<any>> {
        let response = {} as ApiResponse<any>;
        let responseAxios : any;
        let params = {} as any;
        let axiosInstance = {} as AxiosInstance;

        try {
            
            if(utils.isNullOrUndefined(requestedData)){
                axiosInstance = this.createClient(headers);
                
            }else{
                axiosInstance = this.createClient(headers, requestedData.authToken);
                params = requestedData.params;
            }

            if(!utils.isNullOrUndefined(params)){
                responseAxios = await axiosInstance.put(endpoint, {params});
            }else{
                responseAxios = await axiosInstance.put(endpoint);
            }
            
            response.data = responseAxios.data;

        } catch (error: any) {
            response.error = this.handleError(error);
        }
        finally{
            response.statusResponse = responseAxios.status;
            return responseAxios;
        }
    }

    public async delete(endpoint: string, headers: Headers, requestedData: ApiRequest<any>, baseURL?: string): Promise<ApiResponse<any>> {
        let response = {} as ApiResponse<any>;
        let responseAxios : any;
        let params = {} as any;
        let axiosInstance = {} as AxiosInstance;

        try {
            
            if(utils.isNullOrUndefined(requestedData)){
                axiosInstance = this.createClient(headers, baseURL);
                
            }else{
                axiosInstance = this.createClient(headers, requestedData.authToken, baseURL);
                params = requestedData.params;
            }

            if(!utils.isNullOrUndefined(params)){
                responseAxios = await axiosInstance.delete(endpoint, {params});
            }else{
                responseAxios = await axiosInstance.delete(endpoint);
            }
            
            response.data = responseAxios.data;

        } catch (error: any) {
            response.error = this.handleError(error);
        }
        finally{
            response.statusResponse = responseAxios.status;
            return responseAxios;
        }
    }

    private createClient(headers: Headers, authToken?: string, baseURL?: string): AxiosInstance {

        if(utils.isNullOrUndefined(headers)){
            throw new Error("Headers is missing");
           
        }else{
            const config: AxiosRequestConfig = {
                baseURL: utils.isEmptyStr(baseURL) ? this._baseUrl : baseURL,
                headers: headers.getHeaders()
            }
    
            if (!utils.isNullOrUndefined(authToken)) {
                config.headers.Authorization = "Bearer " + authToken;
            }

            return axios.create(config);
        }
    }

    private getEnum(error: string):HttpStatusCode {
        return HttpStatusCode[error as keyof typeof HttpStatusCode];
    }

    private handleError(error: any): ErrorBase<any> {
        console.log("handle error");
        console.log(error);
        let errorResponse : ErrorBase<any>;

        let name  = HttpStatusCode[error.response.status as keyof typeof HttpStatusCode];

        if (!error.response) {
            errorResponse = new ErrorBase(name);
            //todo: create log
        } else {
            errorResponse = new ErrorBase<HttpStatusCode>(name, error.message, null);
            //todo: create log
        }

        return errorResponse;
    }
}
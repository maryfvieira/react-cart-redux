import { ErrorBase } from "@/error/errorBase";
import axios, {AxiosHeaders, AxiosInstance, AxiosRequestConfig} from "axios";
import { HttpStatusCode } from "../httpStatusCode";
import {} from "@config/appConfig";
import { Headers } from "./headers";
import  ApiClient from "./apiClient";
import { headers } from "next/headers";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES from "./types";
import appConfig from '@config/appConfig';

@injectable()
export default class ApiClientImpl implements ApiClient{

    readonly _baseUrl: string;

    constructor(){
        this._baseUrl = appConfig.apiBaseUrl;
    }

    public async get(endpoint: string = "", headers: Headers, params?: any, authToken?: string): Promise<any> {
        try {
            
            let response : any;
            const axiosInstance = this.createClient(headers.getHeaders());

            if(params != undefined){
                response = await axiosInstance.get(endpoint, {params});
            }else{
                response = await axiosInstance.get(endpoint);
            }

            return response.data;

        } catch (error: any) {
            this.handleError(error);
        }
    }

    public async post(endpoint: string = "", headers: Headers, data?: any, authToken?: string): Promise<any> {
        try {
            
            const axiosInstance = this.createClient(headers.getHeaders());
            const response = await axiosInstance.post(endpoint, data);
            return response.data;

        } catch (error) {
            this.handleError(error);
        }
    }

    public async uploadFile(endpoint: string = "", headers: Headers, formData: FormData, authToken?: string): Promise<any> {
        try {
            // let headers = new  Headers();
            // headers.addItem("Content-Type", "multipart/form-data")

            const axiosInstance = this.createClient(headers.getHeaders());
            const response = await axiosInstance.post(endpoint, formData)
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async put(endpoint: string, headers: Headers, data?: any, authToken?: string): Promise<any> {
        const axiosInstance = this.createClient(headers.getHeaders());
        const response = await axiosInstance.put(endpoint, data);
        return response.data;
    }

    public async delete(endpoint: string, headers: Headers, data?: any, authToken?: string): Promise<any> {
        const axiosInstance = this.createClient(headers.getHeaders());
        const response = await axiosInstance.delete(endpoint, data);
        return response.data;
    }

    private createClient(headers: AxiosHeaders, authToken?: string): AxiosInstance {

        if(headers == undefined){
            throw new Error("Headers is missing");
           
        }else{
            const config: AxiosRequestConfig = {
                baseURL: this._baseUrl,
                headers: headers
            }
    
            if (authToken) {
                config.headers!= undefined? config.headers.Authorization = "Bearer " + authToken : "";
            }

            return axios.create(config);
        }
        
    }

    private getEnum(error: string):HttpStatusCode {
        return HttpStatusCode[error as keyof typeof HttpStatusCode];
    }

    private handleError(error: any): never {
        let name  = HttpStatusCode[error.response.status as keyof typeof HttpStatusCode];

        if (!error.response) {
            throw new ErrorBase(name);
        } else {
            throw new ErrorBase<HttpStatusCode>(name, error.message, null);
        }
    }
}
import { Headers } from '@/services/httpclient/axios/headers';
import type ApiClient from '@/services/httpclient/axios/apiClient';
import appConfig from '@config/appConfig';
import { Product } from "@/global";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES from '@/services/httpclient/axios/types';
import { ApiResponse } from '@/services/httpclient/model/apiResponse';
import { ApiRequest } from '@/services/httpclient/model/apiRequest';


@injectable()
export class UserApi {

    private _apiClient: ApiClient;
    private headers: Headers;

    constructor(@inject(TYPES.ApiClient) apiClient: ApiClient) {
        this._apiClient = apiClient;
        this.headers = new Headers();
    }

    public async login(user: string, password: string, captchaValue: string): Promise<ApiResponse<any>> {

        let apiRespose: ApiResponse<any>;
        
        console.log(appConfig.SecretKeyToCaptcha);
        console.log(captchaValue);
        //call capcha validation
        console.log("*");
        
        this.setformUrlencodedHeader();
        this.setCors();
        apiRespose = await this._apiClient.post(null, this.headers, {
            params: {
               secret: appConfig.SecretKeyToCaptcha,
               response: captchaValue
            }
         }, 'https://www.google.com/recaptcha/api/siteverify');
         
         //apiRespose = await this._apiClient.post(null, this.getformUrlencodedHeader(), null, `https://www.google.com/recaptcha/api/siteverify?secret=${appConfig.SecretKeyToCaptcha}&response=${captchaValue}`)
         
         console.log(  apiRespose.data );

        if(apiRespose.data.data.success){
            //call user/pass  validation
            //apiRespose = await this._apiClient.post();
            apiRespose = { error: {}, statusResponse: 200, data: { success: true} };
        }else{
            apiRespose = { error: {message: "Invalid capcha"}, statusResponse: 403, data: { success: false} };
        }
        
        return apiRespose;
    }

    private setJsonHeader(){
        this.headers.addItem("Content-Type", "application/json");
    }
    private setformUrlencodedHeader(){
        this.headers.addItem("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    }
    private setMultipartFormDataHeader(){
        this.headers.addItem("Content-Type", "multipart/form-data");
    }
    private setCors(){
        this.headers.addItem("Access-Control-Allow-Origin", "*");
        //this.headers.addItem("Access-Control-Allow-Credentials", "true");
        this.headers.addItem("Access-Control-Allow-Headers", "Content-Type");
        this.headers.addItem("Access-Control-Allow-Methods", "POST, OPTIONS");
        //this.headers.addItem("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    }
    private getEndpoint(): string {
        return "user";
    }
    

}
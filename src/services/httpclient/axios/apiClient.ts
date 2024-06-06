import { ApiRequest } from "@/services/httpclient/model/apiRequest";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { Headers } from "@/services/httpclient/axios/headers";

export default interface ApiClient {

     get(endpoint: string, headers: Headers, requestedData?: ApiRequest<any>, baseURL?: string): Promise<ApiResponse<any>>;

     post(endpoint: string, headers: Headers, requestedData?: ApiRequest<any>, baseURL?: string): Promise<ApiResponse<any>>;

     put(endpoint: string, headers: Headers, requestedData?: ApiRequest<any>, baseURL?: string): Promise<ApiResponse<any>>;

     delete(endpoint: string, headers: Headers, requestedData?: ApiRequest<any>, baseURL?: string): Promise<ApiResponse<any>>;



}

import { Headers } from "./headers";

export default interface ApiClient {

     get(endpoint: string, headers: Headers, params?: any): Promise<any>;

     post(endpoint: string, headers: Headers, data?: any): Promise<any>;

     put(endpoint: string, headers: Headers, id?: number, data?: any): Promise<any>;

     delete(endpoint: string, headers: Headers, data?: any): Promise<any>;

     uploadFile(endpoint: string, headers: Headers, formData: FormData): Promise<any>;

}

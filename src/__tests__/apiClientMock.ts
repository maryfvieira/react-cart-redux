
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Headers } from "@/app/api/client/axios/headers";
import  ApiClient from "@/app/api/client/axios/apiClient";
import products from '@/app/api/product.json';

@injectable()
export default class ApiClientMock implements ApiClient{

    public async get(endpoint: string = "", headers: Headers, params?: any, authToken?: string): Promise<any> {
        return [];
    }

    public async post(endpoint: string = "", headers: Headers, data?: any, authToken?: string): Promise<any> {
        return products;
    }

    public async uploadFile(endpoint: string = "", headers: Headers, formData: FormData, authToken?: string): Promise<any> {
        return products;
    }

    public async put(endpoint: string, headers: Headers, data?: any, authToken?: string): Promise<any> {
        return products;
    }

    public async delete(endpoint: string, headers: Headers, data?: any, authToken?: string): Promise<any> {
        return products;
    }
}
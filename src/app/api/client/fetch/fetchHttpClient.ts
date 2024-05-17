import { FetchHttpClientBase } from "./fetchHttpClientBase";
import { HttpClientBaseHeader } from "./httpClientBaseHeader";
import { HttpClientBaseMehod } from "./httpClientBaseMehod";

  export interface HttpClientResponse<T> {
    data: T;
    isOk: boolean;
  }
  
  export class FetchHttpClient extends FetchHttpClientBase {
    private header: HttpClientBaseHeader;
  
    constructor() {
      super();
      this.header = {
        "Content-Type": "application/json"
      };
    }
  
    async get<T>(url: string): Promise<HttpClientResponse<T>> {
      const request = await this.createRequest(
        url,
        HttpClientBaseMehod.GET,
        this.header
      );
  
      return {
        data: request.responseByKey<T>(),
        isOk: request.isOk()
      };
    }
  
    async post<T>(
      url: string,
      requestData: any
    ): Promise<HttpClientResponse<T>> {
      const request = await this.createRequest(
        url,
        HttpClientBaseMehod.POST,
        this.header,
        requestData
      );
  
      return {
        data: request.responseByKey<T>(),
        isOk: request.isOk()
      };
    }
  
    async put<T>(
      url: string,
      requestData: any
    ): Promise<HttpClientResponse<T>> {
      const request = await this.createRequest(
        url,
        HttpClientBaseMehod.PUT,
        this.header,
        requestData
      );
  
      return {
        data: request.responseByKey<T>(),
        isOk: request.isOk()
      };
    }
  }
  
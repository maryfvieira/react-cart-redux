import { Headers } from '@/services/httpclient/axios/headers';

import type ApiClient from '@/services/httpclient/axios/apiClient';
import { Product } from "@/global";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES from '@/services/httpclient/axios/types';

import { ApiResponse } from '@/services/httpclient/model/apiResponse';

@injectable()
export class ProductService {

   @inject(TYPES.ApiClient)
   private _apiClient: ApiClient;

   public async getAll(): Promise<ApiResponse<Product[]>> {
      let apiRespose: ApiResponse<Product[]>;

      apiRespose = await this._apiClient.get(`${this.getEndpoint()}/all`, this.getJsonHeader());

      return apiRespose;
   }

   public async getById(id: String): Promise<ApiResponse<Product>> {
      let apiRespose: ApiResponse<Product>;

      apiRespose = await this._apiClient.get(this.getEndpoint(), this.getJsonHeader(), {
         params: {
            id: id
         }
      });

      return apiRespose;
   }

   public async getByName(name: String): Promise<ApiResponse<Product[]>> {
      let apiRespose: ApiResponse<Product[]>;

      apiRespose = await this._apiClient.get(this.getEndpoint(), this.getJsonHeader(), {
         params: {
            product_name: name
         }
      });

      return apiRespose;
   }

   private getJsonHeader(): Headers {
      let headers = new Headers();
      headers.addItem("Content-Type", "application/json");
      return headers;
   }

   private getMultipartFormDataHeader(): Headers {
      let headers = new Headers();
      headers.addItem("Content-Type", "multipart/form-data");
      return headers;
   }

   private getBaseURL(): string {
      return "";
   }
   private getEndpoint(): string {
      return "product";
   }
}
import { Headers } from '../client/axios/headers';
import { FetchHttpClient } from '../client/fetch/fetchHttpClient';
import type ApiClient from '../client/axios/apiClient';
import appConfig from '@config/appConfig';
import { Product } from "@/global";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES from '../client/axios/types';

@injectable()
export class ProductsApi {

   private _apiClient: ApiClient;

   constructor(@inject(TYPES.ApiClient) apiClient: ApiClient) {
      this._apiClient = apiClient;
   }

   public async getAll(headers: Headers, endpoint?: string): Promise<Product[]> {
      return this._apiClient.get(endpoint, headers);
   }

   public async getById(id: String, headers: Headers, endpoint?: string): Promise<Product> {
      return this._apiClient.get(endpoint, headers, {
         params: {
           id: id
         }
       });
   }

   public async getByName(name: String, headers: Headers, endpoint?: string): Promise<Product[]> {
      return this._apiClient.get(endpoint, headers, {
         params: {
           product_name: name
         }
       });
   }

}
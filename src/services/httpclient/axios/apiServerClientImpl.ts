import { ErrorBase } from "@/error/errorBase";
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { HttpStatusCode } from "@/services/httpclient/httpStatusCode";
import {} from "@config/appConfig";
import { Headers } from "@/services/httpclient/axios/headers";
import ApiClient from "@/services/httpclient/axios/apiClient";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES from "./types";
import appConfig from "@config/appConfig";
import { ApiRequest } from "@/services/httpclient/model/apiRequest";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import utils from "@/utils/validation";

interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}

let failedRequests: FailedRequests[] = [];
let isTokenRefreshing = false;

@injectable()
export default class ApiServerClientImpl implements ApiClient {
  readonly _baseUrl: string;

  constructor() {
    this._baseUrl = appConfig.apiBaseUrl ? appConfig.apiBaseUrl : "";
  }

  public async get(
    endpoint: string = "",
    headers: Headers,
    requestedData?: ApiRequest<any>,
    baseURL?: string
  ): Promise<ApiResponse<any>> {
    let response = {} as ApiResponse<any>;
    let responseAxios: any;
    let params = {} as any;
    let axiosInstance = {} as AxiosInstance;

    try {
      if (utils.isNullOrUndefined(requestedData)) {
        axiosInstance = this.createClient(headers, baseURL);
      } else {
        axiosInstance = this.createClient(
          headers,
          baseURL,
          requestedData?.authToken
        );
        params = requestedData?.params;
      }

      if (!utils.isNullOrUndefined(params)) {
        responseAxios = await axiosInstance.get(endpoint, { params });
      } else {
        responseAxios = await axiosInstance.get(endpoint);
      }

      response.data = responseAxios.data;
    } catch (error: any) {
      response.error = this.handleError(error);
    } finally {
      response.statusResponse = responseAxios.status;
      return response;
    }
  }

  public async post(
    endpoint: string = "",
    headers: Headers,
    requestedData?: ApiRequest<any>,
    baseURL?: string
  ): Promise<ApiResponse<any>> {
    let response = {} as ApiResponse<any>;
    let axiosResponse = {} as AxiosResponse;
    let data = {} as any;
    let axiosInstance = {} as AxiosInstance;

    try {
      if (utils.isNullOrUndefined(requestedData)) {
        axiosInstance = this.createClient(headers, baseURL);
      } else {
        axiosInstance = this.createClient(
          headers,
          baseURL,
          requestedData?.authToken
        );
        data = requestedData?.data;
      }

      axiosResponse = await axiosInstance.post(endpoint, data);

      response.data = axiosResponse.data;
    } catch (error: any) {
      response.error = this.handleError(error);
    } finally {
      response.statusResponse = axiosResponse.status;

      return response;
    }
  }

  public async put(
    endpoint: string = "",
    headers: Headers,
    requestedData?: ApiRequest<any>,
    baseURL?: string
  ): Promise<ApiResponse<any>> {
    let response = {} as ApiResponse<any>;
    let responseAxios: any;
    let params = {} as any;
    let axiosInstance = {} as AxiosInstance;

    try {
      if (utils.isNullOrUndefined(requestedData)) {
        axiosInstance = this.createClient(headers, baseURL);
      } else {
        axiosInstance = this.createClient(
          headers,
          baseURL,
          requestedData?.authToken
        );
        params = requestedData?.params;
      }

      if (!utils.isNullOrUndefined(params)) {
        responseAxios = await axiosInstance.put(endpoint, { params });
      } else {
        responseAxios = await axiosInstance.put(endpoint);
      }

      response.data = responseAxios.data;
    } catch (error: any) {
      response.error = this.handleError(error);
    } finally {
      response.statusResponse = responseAxios.status;
      return response;
    }
  }

  public async delete(
    endpoint: string = "",
    headers: Headers,
    requestedData?: ApiRequest<any>,
    baseURL?: string
  ): Promise<ApiResponse<any>> {
    let response = {} as ApiResponse<any>;
    let responseAxios: any;
    let params = {} as any;
    let axiosInstance = {} as AxiosInstance;

    try {
      if (utils.isNullOrUndefined(requestedData)) {
        axiosInstance = this.createClient(headers, baseURL);
      } else {
        axiosInstance = this.createClient(
          headers,
          baseURL,
          requestedData?.authToken
        );
        params = requestedData?.params;
      }

      if (!utils.isNullOrUndefined(params)) {
        responseAxios = await axiosInstance.delete(endpoint, { params });
      } else {
        responseAxios = await axiosInstance.delete(endpoint);
      }

      response.data = responseAxios.data;
    } catch (error: any) {
      response.error = this.handleError(error);
    } finally {
      response.statusResponse = responseAxios.status;
      return response;
    }
  }

  private createClient(
    headers: Headers,
    baseURL?: string,
    authToken?: string
  ): AxiosInstance {
    console.log("baseURL " + baseURL);

    if (utils.isNullOrUndefined(headers)) {
      throw new Error("Headers is missing");
    } else {
      const config: AxiosRequestConfig = {
        baseURL: utils.isNullOrUndefined(baseURL) ? this._baseUrl : baseURL,
        headers: headers.getHeaders(),
      };

      if (!utils.isNullOrUndefined(authToken) && config.headers != undefined) {
        config.headers.Authorization = "Bearer " + authToken;
      }

      console.log("axios create " + JSON.stringify(config));
      const axiosInstance = axios.create(config);

      // Response interceptor

      axiosInstance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
          const status = error.response?.status;
          const originalRequestConfig = error.config!;
      
          if (status !== 401) {
            return Promise.reject(error);
          }
      
          if (isTokenRefreshing) {
            return new Promise((resolve, reject) => {
              failedRequests.push({
                resolve,
                reject,
                config: originalRequestConfig,
                error: error,
              });
            });
          }
      
          isTokenRefreshing = true;
      
          try {
            const response = await axiosInstance.post("/access-token", {
              refreshToken: JSON.parse(localStorage.getItem("refreshToken") ?? ""),
            });
            const { accessToken = null, refreshToken = null } = response.data ?? {};
      
            if (!accessToken || !refreshToken) {
              throw new Error(
                "Something went wrong while refreshing your access token"
              );
            }
      
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
            localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
      
            failedRequests.forEach(({ resolve, reject, config }) => {
              axiosInstance(config)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
            });
          } catch (_error: unknown) {
            console.error(_error);
            failedRequests.forEach(({ reject, error }) => reject(error));
            localStorage.setItem("accessToken", "");
            localStorage.setItem("refreshToken", "");
            return Promise.reject(error);
          } finally {
            failedRequests = [];
            isTokenRefreshing = false;
          }
      
          return axiosInstance(originalRequestConfig);
        }
      );

      return axiosInstance;
    }
  }

  private getEnum(error: string): HttpStatusCode {
    return HttpStatusCode[error as keyof typeof HttpStatusCode];
  }

  private handleError(error: any): ErrorBase {
    console.log("handle error");
    console.log(error);
    let errorResponse: ErrorBase;

    //let name  = HttpStatusCode[error.response.status as keyof typeof HttpStatusCode];

    if (!error.response) {
      errorResponse = new ErrorBase(error.response.status);
      //todo: create log
    } else {
      errorResponse = new ErrorBase(error.response.status, error.message, null);
      //todo: create log
    }

    return errorResponse;
  }
}

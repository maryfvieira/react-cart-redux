import { Headers } from "@/services/httpclient/axios/headers";
import type ApiClient from "@/services/httpclient/axios/apiClient";
import appConfig from "@config/appConfig";
import { Product } from "@/global";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES from "@/services/httpclient/axios/types";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { ApiRequest } from "@/services/httpclient/model/apiRequest";
import { ErrorBase } from "@error/errorBase";
import utils from "@/utils/validation";
import { GoogleResponse } from "@/global";

@injectable()
export class GoogleRecapchaService {
  private _apiClient: ApiClient;
  private headers: Headers;
  private baseURL: string;

  constructor(@inject(TYPES.ApiClient) apiClient: ApiClient) {
    this._apiClient = apiClient;
    this.headers = new Headers();
    this.baseURL = appConfig.googleRecapchaVerifyUrl;
  }

  public async verify(token: string): Promise<ApiResponse<any>> {
    const data = new URLSearchParams({
      secret: appConfig.SecretKeyToCaptcha,
      response: token,
    });

    const apiRequest: ApiRequest<any> = { data: data };

    this.headers.addItem(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=utf-8"
    );

    const googleResponse = await this._apiClient.post(
      "",
      this.headers,
      apiRequest,
      this.baseURL
    );

    let response = {} as GoogleResponse;
    response = googleResponse.data;
    response.statusResponse = googleResponse.statusResponse;

    if (!response.success) {
      const errorResponse = response["error-codes"] as unknown as string;

      return {
        statusResponse: response.statusResponse,
        error: new ErrorBase(response.statusResponse, errorResponse),
      };
    } else {
      return {
        statusResponse: response.statusResponse,
        data: googleResponse.data,
      };
    }
  }

  private setCors() {
    this.headers.addItem("Access-Control-Allow-Origin", "*");
    //this.headers.addItem("Access-Control-Allow-Credentials", "true");
    this.headers.addItem("Access-Control-Allow-Headers", "Content-Type");
    this.headers.addItem("Access-Control-Allow-Methods", "POST, OPTIONS");
    //this.headers.addItem("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  }
}

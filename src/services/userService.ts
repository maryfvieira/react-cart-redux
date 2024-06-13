import { Headers } from "@/services/httpclient/axios/headers";
import type ApiClient from "@/services/httpclient/axios/apiClient";
import appConfig from "@config/appConfig";
import { Product } from "@/global";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES from "@/services/httpclient/axios/types";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { ApiRequest } from "@/services/httpclient/model/apiRequest";

//const googleApiEndpoint: string = "user/login";

@injectable()
export class UserService {
  private _apiClient: ApiClient;
  private headers: Headers;
  private baseURL: string;
  private readonly googleApiEndpoint: string = "user/login";

  constructor(@inject(TYPES.ApiClient) apiClient: ApiClient) {
    this._apiClient = apiClient;
    this.headers = new Headers();
    this.baseURL = appConfig.apiUrl;
  }

  public async login(
    user: string,
    password: string,
    captchaValue: string
  ): Promise<ApiResponse<any>> {
    const googleApiURL: string = "http://localhost:3000/api/v1/";

    let apiRequest: ApiRequest<any>;
    let apiRespose: ApiResponse<any>;

    apiRequest = {
      data: { user: user, password: password, token: captchaValue },
    };

    this.setJsonHeader();
    //this.setCors();

    apiRespose = await this._apiClient.post(
      this.googleApiEndpoint,
      this.headers,
      apiRequest,
      googleApiURL
    );

    //console.log("response from userService =>" + JSON.stringify(apiRespose));
    return apiRespose;
  }

  private setJsonHeader() {
    this.headers.addItem("Content-Type", "application/json");
  }
  private setformUrlencodedHeader() {
    this.headers.addItem(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=utf-8"
    );
  }
  private setMultipartFormDataHeader() {
    this.headers.addItem("Content-Type", "multipart/form-data");
  }
  private setCors() {
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

import { Headers } from "@/services/httpclient/axios/headers";
import type ApiClient from "@/services/httpclient/axios/apiClient";
import appConfig from "@config/appConfig";
import { I_UserPublic, Product } from "@/global";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES from "@/services/httpclient/axios/types";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { ApiRequest } from "@/services/httpclient/model/apiRequest";
import { SignJWT } from "jose";
import authConfig from "@config/authConfig";
import { generateJwtToken, getJwtSecretKey } from "@/utils/auth";

import { clearUser, setUser } from "@/redux/slices/userSlice";
import { UserState } from "@/global";
import { useSelector, useDispatch, dispatch } from "@redux/store";


//const googleApiEndpoint: string = "user/login";

@injectable()
export class UserService {
  private _apiClient: ApiClient;
  private headers: Headers;
  private baseURL: string;
  private readonly googleApiEndpoint: string = "user/login/googleValidation";
  private readonly userApiEndpoint: string = "user/login";
  private readonly apiBaseEndpoint: string = "http://localhost:3000/api/v1/";

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
    let apiRequest = {} as ApiRequest<any>;
    let apiRespose = {} as ApiResponse<any>;

    apiRequest = {
      data: { token: captchaValue },
    };

    this.setJsonHeader();

    let googleResponse = await this._apiClient.post(
      this.googleApiEndpoint,
      this.headers,
      apiRequest,
      this.apiBaseEndpoint
    );

    if (googleResponse.statusResponse != 200) {
      apiRespose.statusResponse = googleResponse.statusResponse;
      apiRespose.error = googleResponse.error;
    } else {
      let userValidationResponse = await this._apiClient.post(
        this.userApiEndpoint,
        this.headers,
        apiRequest,
        this.apiBaseEndpoint
      );

      if (userValidationResponse.statusResponse != 200) {
        apiRespose.statusResponse = userValidationResponse.statusResponse;
        apiRespose.error = userValidationResponse.error;
      } else {
        apiRespose.statusResponse = 200;
        const userData = userValidationResponse.data as I_UserPublic;

        // let jwtToken: string;
        const token = await generateJwtToken(userData);

        //persist token
        // const cookieStore = cookies()
        // cookieStore.delete("token");
        // const testCookie = cookieStore.set("token", token);

        //cleand and persist data in redux store
        dispatch(clearUser());
        dispatch(setUser(userData));


        // jwtToken = await new SignJWT({
        //   id: userData.id,
        //   firstName: userData.firstName,
        //   lastName: userData.lastName,
        //   email: userData.email,
        //   phone: userData.phone,
        //   role: userData.role,
        // })
        //   .setProtectedHeader({ alg: "HS256" })
        //   .setIssuedAt()
        //   .setExpirationTime(`${authConfig.jwtExpires}s`)
        //   .sign(getJwtSecretKey());

        apiRespose.data = userData;
      }
    }

    //console.log("response from userService =>" + JSON.stringify(apiRespose));
    return apiRespose;
  }

  public async updateExpirationDate(userId: string) {}

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

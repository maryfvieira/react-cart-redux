import "reflect-metadata";
import ApiClient from "@/services/httpclient/axios/apiClient";
import TYPES from "@/services/httpclient/axios/types";
import { Container } from "inversify";
import { GoogleRecapchaService } from "@/services/googleReCaptchaService";
import container from "@/di/ioc.config";
import utils from "@/utils/validation";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { ErrorBase } from "@error/errorBase";
import { SignJWT } from "jose";
import { I_User, I_UserPublic, T_UserRole } from "@/global";
import authConfig from "@config/authConfig";
import { getJwtSecretKey } from "@/utils/auth";
import { NextResponse, NextRequest } from 'next/server';

export interface I_ApiUserLoginRequest {
  userName: string;
  password: string;
}

export async function POST(httpRequest: NextRequest) {
  const body = (await httpRequest.json()) as I_ApiUserLoginRequest;
  
  const { userName, password } = Object.fromEntries(
    Object.entries(body).map(([key, value]) => [key, value?.trim()])
  ) as I_ApiUserLoginRequest;

  //console.log("2");
  //const request = await httpRequest.json();
  let apiRespose: ApiResponse<any>;

  console.log("route.ts" + JSON.stringify(body));

  if (
    utils.isNullOrUndefined(userName) ||
    utils.isNullOrUndefined(password) 
  ) {
    apiRespose = {
      statusResponse: 400,
      error: new ErrorBase(400, "Parameters missing"),
    };
    return NextResponse.json(apiRespose);
  }else{
    //todo: create a db call to verify user credentials or call an other api to perfom the validation
    const user = getMockedUser(userName);

    apiRespose = {
      statusResponse: 200,
      data: {user}
    };
  
    return NextResponse.json(apiRespose);
  }
}

function exportPublic(userParam: I_User): I_UserPublic {
  const { password, ...user } = userParam as I_User;
  return user;
}

function getGoogleService(container: Container): GoogleRecapchaService {
  const googleService = container.get<ApiClient>(TYPES.ApiClient);
  return new GoogleRecapchaService(googleService);
}

function getMockedUser(userName: string): I_UserPublic {
  const user: I_UserPublic = {
    id: "1" as string,
    email: "user1@mail.com" as string,
    phone: "551199999999" as string,
    pin: "123" as string,
    firstName: userName as string,
    lastName: "One" as string,
    avatar: "" as string,
    role: T_UserRole.User,
    createdAt: new Date(),
  };

  return user;
}
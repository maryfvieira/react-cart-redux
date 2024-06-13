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
import { getJwtSecretKey, setUserDataCookie } from "@/utils/auth";
import { NextResponse, NextRequest } from 'next/server';

export interface I_ApiUserLoginRequest {
  user: string;
  password: string;
  token: string;
}

export async function GET(request: Request) {
  return new Response(`Hello, ${request.url}!`);
}

export async function POST(httpRequest: Request) {
  const body = (await httpRequest.json()) as I_ApiUserLoginRequest;

  // trim all input values
  const { user, password, token } = Object.fromEntries(
    Object.entries(body).map(([key, value]) => [key, value?.trim()])
  ) as I_ApiUserLoginRequest;

  //console.log("2");
  //const request = await httpRequest.json();
  let apiRespose: ApiResponse<any>;

  console.log("route.ts" + JSON.stringify(body));

  //const user = request.user;
  //const pass = request.password;
  //const recapcha = request.token;

  if (
    utils.isNullOrUndefined(user) ||
    utils.isNullOrUndefined(password) ||
    utils.isNullOrUndefined(token)
  ) {
    apiRespose = {
      statusResponse: 400,
      error: new ErrorBase(400, "Parameters missing"),
    };
    return Response.json(apiRespose);
  }

  //perform google validation
  const googleResult = await getGoogleService(container).verify(token);

  let apiResponse = {} as ApiResponse<any>;
  let jwtToken: any;

  if (!googleResult.error) {
    jwtToken = await new SignJWT({
      id: getMockedUser().id,
      firstName: getMockedUser().firstName,
      lastName: getMockedUser().lastName,
      email: getMockedUser().email,
      phone: getMockedUser().phone,
      role: getMockedUser().role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${authConfig.jwtExpires}s`)
      .sign(getJwtSecretKey());

    apiResponse.data = jwtToken;
    apiResponse.statusResponse = 200;

  } else {
    console.log(googleResult.error._message);

    apiResponse.statusResponse = 500;
    apiResponse.error = new ErrorBase(500, `Ocorreu um erro ao validar recapcha,  detalhes do erro: ${googleResult.error._message}`, "");

  }

  console.log("result:" + JSON.stringify(apiResponse));
  const response = NextResponse.json(apiResponse);

  const userData = exportPublic(getMockedUser());
  setUserDataCookie(userData, jwtToken);

  return  NextResponse.json(apiResponse);

}

function exportPublic(userParam: I_User): I_UserPublic {
  const { password, ...user } = userParam as I_User;
  return user;
}

function getGoogleService(container: Container): GoogleRecapchaService {
  const googleService = container.get<ApiClient>(TYPES.ApiClient);
  return new GoogleRecapchaService(googleService);
}

function getMockedUser(): I_User {
  const user: I_User = {
    id: "1" as string,
    email: "user1@mail.com" as string,
    phone: "551199999999" as string,
    password: "pass" as string,
    pin: "123" as string,
    firstName: "User " as string,
    lastName: "One" as string,
    avatar: "" as string,
    role: T_UserRole.User,
    totpSecret: "" as string,
    createdAt: new Date(),
  };

  return user;
}

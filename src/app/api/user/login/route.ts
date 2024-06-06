import "reflect-metadata";
import ApiClient from "@/services/httpclient/axios/apiClient";
import TYPES from "@/services/httpclient/axios/types";
import { Container } from "inversify";
import { GoogleRecapchaService } from "@/services/googleReCaptchaService";
import container from "@/di/ioc.config";
import utils from "@/utils/validation";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { ErrorBase } from "@error/errorBase";

export async function GET(request: Request) {
  return new Response(`Hello, ${request.url}!`);
}

export async function POST(httpRequest: Request) {
  //console.log("2");
  const request = await httpRequest.json();
  let apiRespose: ApiResponse<any>;

  console.log("route.ts" + JSON.stringify(request));

  const user = request.user;
  const pass = request.password;
  const recapcha = request.token;

  if (
    utils.isNullOrUndefined(user) ||
    utils.isNullOrUndefined(pass) ||
    utils.isNullOrUndefined(recapcha)
  ) {
    apiRespose = {
      statusResponse: 400,
      error: new ErrorBase(400, "Parameters missing"),
    };
    return Response.json(apiRespose);
  }

  //perform google validation
  const result = await getGoogleService(container).verify(recapcha);

  //todo: perform user/password validation
console.log("result:"+JSON.stringify(result));
  return Response.json(result);
}

function getGoogleService(container: Container): GoogleRecapchaService {
  const googleService = container.get<ApiClient>(TYPES.ApiClient);
  return new GoogleRecapchaService(googleService);
}

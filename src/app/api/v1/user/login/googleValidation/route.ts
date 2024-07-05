
import "reflect-metadata";
import ApiClient from '@/services/httpclient/axios/apiClient';
import TYPES from '@/services/httpclient/axios/types';
import { Container } from "inversify";
import { GoogleRecapchaService } from "@/services/googleReCaptchaService";
import container from '@/di/ioc.config';
import utils from "@/utils/validation";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { ErrorBase } from "@error/errorBase";

export async function GET(request: Request) {
  return new Response(`Hello, ${request.url}!`);
}

export async function POST(httpRequest:Request){
  //console.log("2");

  const request = await httpRequest.json();
  console.log("route.ts"+ JSON.stringify(request));
  if (utils.isNullOrUndefined(request) || utils.isNullOrUndefined(request.token)){
    const apiRespose = {
      statusResponse: 400,
      error: new ErrorBase(400, "Parameters missing"),
    };
    return Response.json(apiRespose);
  }
  
  const result = await getGoogleService(container).verify(request.token);

  console.log(JSON.stringify(result));

  return Response.json(result);
}

function getGoogleService(container: Container): GoogleRecapchaService {
  const googleService = container.get<ApiClient>(TYPES.ApiClient);
  return new GoogleRecapchaService(googleService);
}
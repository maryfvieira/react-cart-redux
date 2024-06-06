
import "reflect-metadata";
import ApiClient from '@/services/httpclient/axios/apiClient';
import TYPES from '@/services/httpclient/axios/types';
import { Container } from "inversify";
import { GoogleRecapchaService } from "@/services/googleReCaptchaService";
import container from '@/di/ioc.config';

export async function GET(request: Request) {
  return new Response(`Hello, ${request.url}!`);
}

export async function POST(httpRequest:Request){
  //console.log("2");
  const request = await httpRequest.json();
  console.log("route.ts"+ JSON.stringify(request));

  const result = await getGoogleService(container).verify(request.token);

  console.log(JSON.stringify(result));
  return Response.json(result);
}

function getGoogleService(container: Container): GoogleRecapchaService {
  const googleService = container.get<ApiClient>(TYPES.ApiClient);
  return new GoogleRecapchaService(googleService);
}
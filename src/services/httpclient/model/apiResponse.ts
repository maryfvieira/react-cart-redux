import { ErrorBase } from "@error/errorBase";
import { HttpStatusCode } from "@/services/httpclient/httpStatusCode";

export interface ApiResponse <T>{
    error?: ErrorBase;
	statusResponse: number;
	data?: T;
}
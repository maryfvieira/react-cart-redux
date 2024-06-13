import { ErrorBase } from "@error/errorBase";

export interface ApiResponse <T>{
    error?: ErrorBase;
	statusResponse: number;
	data?: T;
}
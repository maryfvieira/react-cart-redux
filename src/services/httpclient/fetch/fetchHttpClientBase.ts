import { HttpClientBaseHeader } from "@/services/httpclient/fetch/httpClientBaseHeader";
import { HttpClientBaseMehod } from "@/services/httpclient/fetch/httpClientBaseMehod";
import { HttpClientBaseStatusCode } from "@/services/httpclient/fetch/httpClientBaseStatusCode";
import { HttpStatusCode } from "@/services/httpclient/httpStatusCode";

export class FetchHttpClientBase {
    private resp!: Response;
    private respBody: any;

    async createRequest(
        url: string,
        method: HttpClientBaseMehod,
        httpHeader?: HttpClientBaseHeader,
        requestData?: any
    ): Promise<this> {
        const requestInit: RequestInit = {
            method
        }
    
        if (httpHeader) {
            requestInit.headers = httpHeader as any
        }
    
        if (requestData) {
            requestInit.body = JSON.stringify(requestData)
        }
    
        this.resp = await fetch(url, requestInit)
        this.respBody = await this.resp.json()
    
        return this
    }
    
    statusCode(): HttpClientBaseStatusCode {
        const statusCode = this.resp.status as HttpStatusCode
        const statusText = HttpStatusCode[this.resp.status] as unknown as HttpStatusCode
    
        return {
            statusCode,
            statusText
        }
    }
    
    isOk(): boolean {
        return this.resp.ok
    }
    
    responseByKey<T>(key: string | null = null): T {
        if (key) {
            return this.respBody[key]
        } else {
            return this.respBody
        }
    }
    
    responseData<T>(): T {
        return this.respBody.data
    }
}
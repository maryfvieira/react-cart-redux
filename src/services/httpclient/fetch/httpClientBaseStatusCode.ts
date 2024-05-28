import { HttpStatusCode } from "@/services/httpclient/httpStatusCode"

export interface HttpClientBaseStatusCode {
    statusCode: number
    statusText: HttpStatusCode
}
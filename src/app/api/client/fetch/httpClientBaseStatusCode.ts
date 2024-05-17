import { HttpStatusCode } from "../httpStatusCode"

export interface HttpClientBaseStatusCode {
    statusCode: number
    statusText: HttpStatusCode
}
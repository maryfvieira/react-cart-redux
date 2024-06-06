import { HttpStatusCode } from "@/services/httpclient/httpStatusCode";
export class ErrorBase extends Error {
    _name: string;
    _message?: string;
    _cause?: any;

    constructor(
        statusCode: number,
        message?: string,
        cause?:any
    ) {
        super();
        //this.name = HttpStatusCode[name].toString();
        this._name  = HttpStatusCode[statusCode];
        //this._name = Object.keys(HttpStatusCode)[Object.values(HttpStatusCode).indexOf(statusCode)];
        this._message = message;
        this._cause = cause;
    }
}
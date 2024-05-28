import { HttpStatusCode } from "@/services/httpclient/httpStatusCode";
export class ErrorBase<T extends number> extends Error {
    _name: string;
    _message?: string;
    _cause?: any;

    constructor(
        name: T,
        message?: string,
        cause?:any
    ) {
        super();
        //this.name = HttpStatusCode[name].toString();
        
        this._name = Object.keys(HttpStatusCode)[Object.values(HttpStatusCode).indexOf(name)];
        if(message != null)
            this._message = message;
        this._cause = cause;
    }
}
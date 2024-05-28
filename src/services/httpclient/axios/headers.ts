
import {AxiosHeaders} from "axios";

 export class Headers {
    private values = new Map<string, string>();

    constructor() {
    }

    public addItem(key: string, value: string) {
        this.values.set(key,value);
    }

    public getHeaders(): AxiosHeaders {

        let headers = new AxiosHeaders();

        this.values.forEach((v, k) => {
            headers[k] = v;
        });

        return headers;
    }
}
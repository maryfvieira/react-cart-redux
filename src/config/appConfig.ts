
export default {
    get apiBaseUrl(): string  {
        return process.env.API_BASE_URL || "";
    },
    get PagSeguroToken(): string {
        return process.env.PAGSEGURO_TOKEN || "";
    },
    get PagSeguroEmail(): string {
        return process.env.PAGSEGURO_EMAIL || "";
    }
}
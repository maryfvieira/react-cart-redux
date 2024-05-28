
export default {
    get apiBaseUrl(): string  {
        return process.env.API_BASE_URL || "";
    },
    get PagSeguroToken(): string {
        return process.env.PAGSEGURO_TOKEN || "";
    },
    get PagSeguroEmail(): string {
        return process.env.PAGSEGURO_EMAIL || "";
    },
    get SiteKeyToCaptcha(): string {
        return process.env.SITE_KEY || "";
    },
    get SecretKeyToCaptcha(): string {
        return process.env.SECRET_KEY || "";
    },
}
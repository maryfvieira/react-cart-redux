// const nextConfig = {
//     reactStrictMode: true,
//     env:{
//         API_BASE_URL : process.env.API_BASE_URL,
//         API_BASE_URL2 : process.env.NEXT_PUBLIC_API_BASE_URL2,
//         MODE: process.env.MODE,
//     }
//   }
  
//   module.exports = nextConfig

  // @ts-check
 
export default async () => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        reactStrictMode: true,
        env:{
            API_BASE_URL : process.env.API_BASE_URL,
            SITE_KEY : process.env.SITE_KEY,
            SECRET_KEY: process.env.SECRET_KEY,
            MODE: process.env.MODE,
        },
        async headers() {
          return [
              {
                  // matching all API routes
                  //source: "/api/:path*",
                  source: "/",
                  headers: [
                      { key: "Access-Control-Allow-Credentials", value: "true" },
                      { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                      { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                      { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                  ]
              }
          ]
      }
    }
    
    return nextConfig
  }
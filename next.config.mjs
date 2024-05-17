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
            MODE: process.env.MODE,
        }
    }
    return nextConfig
  }
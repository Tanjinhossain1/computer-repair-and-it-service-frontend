
export const getBaseUrl = (): string =>{
    return process.env.BACKEND_API_URL || "https://computer-services-nine.vercel.app"
}
 
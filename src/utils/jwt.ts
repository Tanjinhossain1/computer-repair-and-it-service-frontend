import jwtDecode from "jwt-decode"

export const decodedJWTToken = (token: string) =>{
    return jwtDecode(token)
}
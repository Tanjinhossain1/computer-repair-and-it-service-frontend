import { authKey } from "@/constants/storageKey"
import { decodedJWTToken } from "@/utils/jwt"
import { getTOLocalStorage, setTOLocalStorage } from "@/utils/local-storage"

export const storeUserInfo = ({accessToken}: {accessToken: string}) =>{
    setTOLocalStorage(authKey, accessToken)
}

export const getUserInfo = () =>{
    const authToken = getTOLocalStorage(authKey);
    if(authToken){
        const accessUserData = decodedJWTToken(authToken)
        return accessUserData
    }else{
        return ""
    }
}

export const isLoggedIn = () =>{
    const authToken = getTOLocalStorage(authKey);

    return !!authToken
}

export const removeLocalStorageInfo = (key: string) =>{
    return localStorage.removeItem(key)
}
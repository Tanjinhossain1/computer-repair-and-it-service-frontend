

export const setTOLocalStorage = (key: string,value: string) =>{
    if(!key || typeof window === "undefined") {
        return ""
    }

    localStorage.setItem(key,value)
}

export const getTOLocalStorage = (key: string) =>{
    if(!key || typeof window === "undefined") {
        return ""
    }

   return localStorage.getItem(key)
}
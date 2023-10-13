import { authKey } from "@/constants/storageKey";
import { ResponseErrorType, ResponseSuccessType } from "@/types";
import { getTOLocalStorage } from "@/utils/local-storage";
import axios from "axios";


const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken  = getTOLocalStorage(authKey);
    if(accessToken){
        config.headers.Authorization = accessToken
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
// @ts-ignore
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    const responseObject: ResponseSuccessType = {
        data: response?.data?.data,
        meta: response?.data?.meta
    }
    return responseObject;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const responseObject: ResponseErrorType = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "SomeThing Went Wrong",
        errorMessages: error?.response?.data?.messages
    }
    return responseObject
    // return Promise.reject(error);
  });



export {instance}
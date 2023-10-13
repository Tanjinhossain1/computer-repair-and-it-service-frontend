import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const AUTH_URL = "user";

export const registerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userCreate: build.mutation({
      query: (registerData) =>({
        url: `/${AUTH_URL}/create`,
        method: "POST",
        data: registerData
      }), 
      invalidatesTags: [tagTypes.user]
    }),

  }),
  
})

export const { useUserCreateMutation } = registerApi
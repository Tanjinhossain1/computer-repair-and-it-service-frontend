import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginDaa) =>({
        url: `/${AUTH_URL}/auth/login`,
        method: "POST",
        data: loginDaa
      }),
      invalidatesTags: [tagTypes.user]
    }),
  }),
  
})

export const { useUserLoginMutation } = authApi
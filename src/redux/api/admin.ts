import { IMeta, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const ADMIN_URL = "user";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdmin: build.mutation({
      query: (data) =>({
        url: `/${ADMIN_URL}/update/${data.id}`,
        method: "PATCH", 
        data: data.body,
      }),  
      invalidatesTags: [tagTypes.user]
    }),   

    admins: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: `/${ADMIN_URL}/admins`,
            method: "GET",
            params: arg,
          };
        },
        transformResponse: (response: IUser[], meta: IMeta) => {
          return {
            admins: response,
            meta,
          };
        },
        providesTags: [tagTypes.user],
      }),
      
      addAdminRole: build.mutation({
        query: (data) =>({
          url: `/${ADMIN_URL}/add-admin-permission/${data.id}`,
          method: "PATCH", 
          data: data.body,
        }),  
        invalidatesTags: [tagTypes.user]
      }),
  }),
  
})

export const { useAddAdminMutation,useAdminsQuery,useAddAdminRoleMutation } = adminApi
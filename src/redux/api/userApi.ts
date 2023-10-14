import { IMeta, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const USER_URL = "user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allUser: build.query({
      query: (arg: Record<string, any>) =>({
        url: `/${USER_URL}/users`,
        method: "GET", 
        params: arg,
      }), 
      transformResponse: (response: IUser[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user]
    }),
    getProfileDetail: build.query({
        query: (data) =>({
          url: `/${USER_URL}/profile/${data.id}`,
          method: "GET",  
        }), 
        transformResponse: (response: IUser, meta: IMeta) => {
          return {
            profile: response,
            meta,
          };
        },
        providesTags: [tagTypes.user]
      }),

    deleteTheUser: build.mutation({
      query: (data) =>({
        url: `/${USER_URL}/delete/${data.id}`,
        method: "DELETE",  
      }),  
      invalidatesTags: [tagTypes.user]
    }),
    
    updateProfile: build.mutation({
        query: (data) =>({
          url: `/${USER_URL}/update/${data.id}`,
          method: "PATCH", 
          data: data.body,
        }),  
        invalidatesTags: [tagTypes.user]
      }),   

    
      
  }),
  
})

export const { useAllUserQuery,useGetProfileDetailQuery,useDeleteTheUserMutation,useUpdateProfileMutation } = userApi
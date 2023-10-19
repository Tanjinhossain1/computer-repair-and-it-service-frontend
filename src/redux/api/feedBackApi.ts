import { IMeta, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const FEEDBACK_URL = "feedback";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFeedback: build.mutation({
      query: (data) =>({
        url: `/${FEEDBACK_URL}/create`,
        method: "Post", 
        data: data.body,
      }),  
      invalidatesTags: [tagTypes.feedback]
    }),   

    allFeedBack: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: `/${FEEDBACK_URL}/`,
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
       
  }),
  
})

export const { useCreateFeedbackMutation, useAllFeedBackQuery } = adminApi
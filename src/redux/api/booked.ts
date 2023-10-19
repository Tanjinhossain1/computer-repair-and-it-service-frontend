import { IMeta, IService, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const BOOKED_URL = "booking";

export const bookedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateBooking: build.mutation({
      query: (data) =>({
        url: `/${BOOKED_URL}/update/${data.id}`,
        method: "PATCH", 
        data: data.body,
      }),  
      invalidatesTags: [tagTypes.booking]
    }),   

    bookedServices: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: `/${BOOKED_URL}`,
            method: "GET",
            params: arg,
          };
        },
        transformResponse: (response: IService[], meta: IMeta) => {
          return {
            bookedServices: response,
            meta,
          };
        },
        providesTags: [tagTypes.booking],
      }),

    bookedService: build.query({
        query: (data) => {
          return {
            url: `/${BOOKED_URL}/${data.userId}`,
            method: "GET", 
            params: data.arg,
          };
        }, 
        transformResponse: (response: IService[], meta: IMeta) => {
          return {
            bookedServices: response,
            meta,
          };
        },
        providesTags: [tagTypes.booking],
      }), 
      
      createBooking: build.mutation({
        query: (data) =>({
          url: `/${BOOKED_URL}/create`,
          method: "POST", 
          data: data.body,
        }),  
        invalidatesTags: [tagTypes.booking]
      }),

      deleteBookedService: build.mutation({
        query: (data) =>({
          url: `/${BOOKED_URL}/delete/${data.id}`,
          method: "DELETE",  
        }),  
        invalidatesTags: [tagTypes.booking]
      }), 
      haveBookedService: build.query({
        query: (data) => {
          return {
            url: `/${BOOKED_URL}/${data.userId}/${data.serviceId}`,
            method: "GET", 
          };
        }, 
        providesTags: [tagTypes.booking],
      }),

      createReview: build.mutation({
        query: (data) =>({
          url: `/${BOOKED_URL}/review`,
          method: "POST", 
          data: data.body,
        }),  
        invalidatesTags: [tagTypes.review]
      }),
      reviews: build.query({
        query: (data) => {
          return {
            url: `/${BOOKED_URL}/review/${data.id}`,
            method: "GET", 
          };
        }, 
        providesTags: [tagTypes.review],
      }),
  }),
  
})

export const { useUpdateBookingMutation,useBookedServicesQuery,useBookedServiceQuery,useCreateBookingMutation,useDeleteBookedServiceMutation,useHaveBookedServiceQuery,useCreateReviewMutation,useReviewsQuery } = bookedApi
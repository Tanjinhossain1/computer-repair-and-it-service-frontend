import { IAddToCart, IMeta, IService, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const SERVICE_URL = "services";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateService: build.mutation({
      query: (data) =>({
        url: `/${SERVICE_URL}/update/${data.id}`,
        method: "PATCH", 
        data: data.body,
      }),  
      invalidatesTags: [tagTypes.service]
    }),   

    services: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: `/${SERVICE_URL}`,
            method: "GET",
            params: arg,
          };
        },
        transformResponse: (response: IService[], meta: IMeta) => {
          return {
            services: response,
            meta,
          };
        },
        providesTags: [tagTypes.service],
      }),

    service: build.query({
        query: (data) => {
          return {
            url: `/${SERVICE_URL}/${data.id}`,
            method: "GET", 
          };
        }, 
        providesTags: [tagTypes.service],
      }),
      
      createService: build.mutation({
        query: (data) =>({
          url: `/${SERVICE_URL}/create`,
          method: "POST", 
          data: data.body,
        }),  
        invalidatesTags: [tagTypes.service]
      }),

      deleteService: build.mutation({
        query: (data) =>({
          url: `/${SERVICE_URL}/delete/${data.id}`,
          method: "DELETE",  
        }),  
        invalidatesTags: [tagTypes.service]
      }),
      
    availableService: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/${SERVICE_URL}/available`,
          method: "GET", 
          params:arg
        };
      }, 
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),
    upComingService: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/${SERVICE_URL}/up-coming`,
          method: "GET",
          params:arg 
        };
      }, 
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),
    getAllAddToCart: build.query({
      query: (data) => {
        return {
          url: `/${SERVICE_URL}/add-to-cart/${data.id}`,
          method: "GET",  
        };
      }, 
      transformResponse: (response: IAddToCart[], meta: IMeta) => {
        return {
          addToCart: response,
          meta,
        };
      },
      providesTags: [tagTypes.addToCart],
    }),
    createAddToCart: build.mutation({
      query: (data) => {
        return {
          url: `/${SERVICE_URL}/add-to-cart`,
          method: "POST",
          data:data.body 
        };
      },  
      invalidatesTags: [tagTypes.addToCart],
    }),
  }),
  
})

export const { useUpdateServiceMutation,useServicesQuery,useServiceQuery,useCreateServiceMutation,useDeleteServiceMutation, useAvailableServiceQuery,useUpComingServiceQuery,useGetAllAddToCartQuery,useCreateAddToCartMutation } = serviceApi
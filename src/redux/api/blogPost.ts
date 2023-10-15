import { IMeta, IBlogPost, IUser, IFaqs } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const BLOG_POST_URL = "blogPost";

export const blogPostApi = baseApi.injectEndpoints({
  endpoints: (build) => ({ 

    allBlogPosts: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: `/${BLOG_POST_URL}`,
            method: "GET",
            params: arg,
          };
        },
        transformResponse: (response: IBlogPost[], meta: IMeta) => {
          return {
            blogPosts: response,
            meta,
          };
        },
        providesTags: [tagTypes.blog_post],
      }),

    getAllFaqs: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: `/${BLOG_POST_URL}/faqs`,
            method: "GET",
            params: arg,
          };
        },
        transformResponse: (response: IFaqs[], meta: IMeta) => {
          return {
            faqs: response,
            meta,
          };
        },
        providesTags: [tagTypes.blog_post],
      }),

    blogPost: build.query({
        query: (data) => {
          return {
            url: `/${BLOG_POST_URL}/${data.id}`,
            method: "GET", 
          };
        }, 
        providesTags: [tagTypes.blog_post],
      }),
      
      createBlogPost: build.mutation({
        query: (data) =>({
          url: `/${BLOG_POST_URL}/create`,
          method: "POST", 
          data: data.body,
        }),  
        invalidatesTags: [tagTypes.blog_post]
      }),

      deleteBlogPost: build.mutation({
        query: (data) =>({
          url: `/${BLOG_POST_URL}/delete/${data.id}`,
          method: "DELETE",  
        }),  
        invalidatesTags: [tagTypes.blog_post]
      }), 
      createFaqs: build.mutation({
        query: (data) =>({
          url: `/${BLOG_POST_URL}/faqs/create`,
          method: "POST",  
          data: data.body
        }),  
        invalidatesTags: [tagTypes.blog_post]
      }), 
      deleteFaqs: build.mutation({
        query: (data) =>({
          url: `/${BLOG_POST_URL}/faqs/delete/${data.id}`,
          method: "DELETE",  
        }),  
        invalidatesTags: [tagTypes.blog_post]
      }), 
  }),
  
})

export const { useAllBlogPostsQuery,useBlogPostQuery,useGetAllFaqsQuery,useCreateBlogPostMutation,useDeleteBlogPostMutation , useCreateFaqsMutation,useDeleteFaqsMutation} = blogPostApi
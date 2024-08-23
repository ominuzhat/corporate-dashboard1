import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../app/utils/tagTypes";
import {
  TBlogDataTypes,
  TCreateBlogTypes,
} from "../types/BlogTypes";

const blogEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getBlog: builder.query<ApiResponse<TBlogDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/blog",
        params,
      }),
      providesTags: [{ type: TagTypes.BLOG, id: "Blog_ID" }],
    }),

    singleBlogItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/blog/${id}`,
      }),
      providesTags: [{ type: TagTypes.BLOG, id: "Blog_ID" }],
    }),

    deleteBlogItem: builder.mutation<
      ApiResponse<TBlogDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.BLOG, id: "Blog_ID" }],
    }),

    createBlog: builder.mutation<
      ApiResponse<TCreateBlogTypes>,
      FormData
    >({
      query: (data) => ({
        url: "/blog",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.BLOG, id: "Blog_ID" }],
    }),

    updateBlog: builder.mutation<
      ApiResponse<TCreateBlogTypes>,
      { id: number | undefined; data: TCreateBlogTypes }
    >({
      query: ({ id, data }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.BLOG, id: "Blog_ID" }],
    }),
  }),
});

export const {
  useDeleteBlogItemMutation,
  useGetBlogQuery,
  useSingleBlogItemQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
} = blogEndpoint;

import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { closeModal } from "../../../app/features/modalSlice";
import { openNotification } from "../../../app/features/notificationSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../app/utils/tagTypes";
import { TBlogDataTypes, TCreateBlogTypes } from "../types/BlogTypes";

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

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            openNotification({
              type: "success",
              message: data.message || " Deleted successfully!",
            })
          );
          dispatch(closeModal());
        } catch (error: any) {
          const errorMessage =
            error?.error?.data?.error?.message || "An unknown error occurred";

          dispatch(
            openNotification({
              type: "error",
              message: errorMessage,
              placement: "topRight",
            })
          );
        }
      },

      invalidatesTags: [{ type: TagTypes.BLOG, id: "Blog_ID" }],
    }),

    createBlog: builder.mutation<ApiResponse<TCreateBlogTypes>, FormData>({
      query: (data) => ({
        url: "/blog",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            openNotification({
              type: "success",
              message: data.message || "Created successfully!",
            })
          );
          dispatch(closeModal());
        } catch (error: any) {
          const errorMessage =
            error?.error?.data?.error?.message || "An unknown error occurred";

          dispatch(
            openNotification({
              type: "error",
              message: errorMessage,
              placement: "topRight",
            })
          );
        }
      },
      invalidatesTags: [{ type: TagTypes.BLOG, id: "Blog_ID" }],
    }),

    updateBlog: builder.mutation<
      ApiResponse<TCreateBlogTypes>,
      {
        id: number | undefined;
        data: TCreateBlogTypes;
        successMessage?: string;
      }
    >({
      query: ({ id, data }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { successMessage } = arg;
        await handleOnQueryStarted(queryFulfilled, dispatch, successMessage);
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

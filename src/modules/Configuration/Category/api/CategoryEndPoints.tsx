import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { closeModal } from "../../../../app/features/modalSlice";
import { openNotification } from "../../../../app/features/notificationSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import {
  TCategoryDataTypes,
  TCreateCategoryTypes,
} from "../types/CategoryTypes";

const categoryEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<ApiResponse<TCategoryDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/category",
        params,
      }),
      providesTags: [{ type: "Category", id: "Category_ID" }],
    }),

    singleCategoryItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/category/${id}`,
      }),
      providesTags: [{ type: "Category", id: "Category_ID" }],
    }),

    deleteCategoryItem: builder.mutation<
      ApiResponse<TCategoryDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/category/${id}`,
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

      invalidatesTags: [{ type: "Category", id: "Category_ID" }],
    }),

    createCategory: builder.mutation<
      ApiResponse<TCreateCategoryTypes>,
      FormData
    >({
      query: (data) => ({
        url: "/category",
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
      invalidatesTags: [{ type: "Category", id: "Category_ID" }],
    }),

    updateCategory: builder.mutation<
      ApiResponse<TCreateCategoryTypes>,
      {
        id: number | undefined;
        data: TCreateCategoryTypes;
        successMessage?: string;
      }
    >({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { successMessage } = arg;
        await handleOnQueryStarted(queryFulfilled, dispatch, successMessage);
      },
      invalidatesTags: [{ type: "Category", id: "Category_ID" }],
    }),
  }),
});

export const {
  useDeleteCategoryItemMutation,
  useGetCategoryQuery,
  useSingleCategoryItemQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categoryEndpoint;

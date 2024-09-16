import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { closeModal } from "../../../../app/features/modalSlice";
import { openNotification } from "../../../../app/features/notificationSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { TCreateTag, TTagResponse } from "../types/TagTypes";


const tagEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getTag: builder.query<ApiResponse<TTagResponse[]>, FilterTypes>({
      query: (params) => ({
        url: "/tag",
        params,
      }),

      providesTags: [{ type: TagTypes.TAG, id: "Tag_ID" }],
    }),

    singleTagItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/tag/${id}`,
      }),
      providesTags: [{ type: TagTypes.TAG, id: "Tag_ID" }],
    }),

    deleteTagItem: builder.mutation<
      ApiResponse<TTagResponse>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/tag/${id}`,
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

      invalidatesTags: [{ type: TagTypes.TAG, id: "Tag_ID" }],
    }),

    createTag: builder.mutation<
      ApiResponse<TCreateTag>,
      FormData
    >({
      query: (data) => ({
        url: "/tag",
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
      invalidatesTags: [{ type: TagTypes.TAG, id: "Tag_ID" }],
    }),

    updateTag: builder.mutation<
      ApiResponse<TCreateTag>,
      {
        id: number | undefined;
        data: TCreateTag;
        successMessage?: string;
      }
    >({
      query: ({ id, data }) => ({
        url: `/tag/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { successMessage } = arg;
        await handleOnQueryStarted(queryFulfilled, dispatch, successMessage);
      },
      invalidatesTags: [{ type: TagTypes.TAG, id: "Tag_ID" }],
    }),
  }),
});

export const {
  useDeleteTagItemMutation,
  useGetTagQuery,
  useSingleTagItemQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
} = tagEndpoint;

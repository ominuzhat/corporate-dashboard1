import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { closeModal } from "../../../../app/features/modalSlice";
import { openNotification } from "../../../../app/features/notificationSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { TKmsDataTypes, TCreateKmsTypes } from "../types/KmsTypes";

const kmsEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getKms: builder.query<ApiResponse<TKmsDataTypes[]>, FilterTypes>({
      query: () => ({
        url: "/kms/api-key",
      }),
      providesTags: [{ type: TagTypes.KMS, id: "Kms_ID" }],
    }),

    singleKmsItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/kms/api-key/${id}`,
      }),
      providesTags: [{ type: TagTypes.KMS, id: "Kms_ID" }],
    }),

    deleteKmsItem: builder.mutation<ApiResponse<TKmsDataTypes>, { id: string }>(
      {
        query: ({ id }) => ({
          url: `/kms/api-key/${id}`,
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

        invalidatesTags: [{ type: TagTypes.KMS, id: "Kms_ID" }],
      }
    ),

    createKms: builder.mutation<ApiResponse<TCreateKmsTypes>, FormData>({
      query: (data) => ({
        url: "/kms/api-key",
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
      invalidatesTags: [{ type: TagTypes.KMS, id: "Kms_ID" }],
    }),

    updateKms: builder.mutation<
      ApiResponse<TCreateKmsTypes>,
      { id: number | undefined; data: TCreateKmsTypes; successMessage?: string }
    >({
      query: ({ id, data }) => ({
        url: `/kms/api-key/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { successMessage } = arg;
        await handleOnQueryStarted(queryFulfilled, dispatch, successMessage);
      },
      invalidatesTags: [{ type: TagTypes.KMS, id: "Kms_ID" }],
    }),
  }),
});

export const {
  useDeleteKmsItemMutation,
  useGetKmsQuery,
  useSingleKmsItemQuery,
  useCreateKmsMutation,
  useUpdateKmsMutation,
} = kmsEndpoint;

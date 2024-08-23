import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import {
  TKmsDataTypes,
  TCreateKmsTypes,
} from "../types/KmsTypes";

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

    deleteKmsItem: builder.mutation<
      ApiResponse<TKmsDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/kms/api-key/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.KMS, id: "Kms_ID" }],
    }),

    createKms: builder.mutation<
      ApiResponse<TCreateKmsTypes>,
      FormData
    >({
      query: (data) => ({
        url: "/kms/api-key",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.KMS, id: "Kms_ID" }],
    }),

    updateKms: builder.mutation<
      ApiResponse<TCreateKmsTypes>,
      { id: number | undefined; data: TCreateKmsTypes }
    >({
      query: ({ id, data }) => ({
        url: `/kms/api-key/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
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

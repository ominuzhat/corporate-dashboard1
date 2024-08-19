import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { TOfficeInfoData } from "../types/officeInfoTypes";

const officeInfoEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getOfficeInfo: builder.query<ApiResponse<TOfficeInfoData[]>, FilterTypes>({
      query: (params) => ({
        url: "/core/office-info",
        params,
      }),
      providesTags: [{ type: "OfficeInfo", id: "OfficeInfo_ID" }],
    }),

    createOfficeInfo: builder.mutation<ApiResponse<TOfficeInfoData>, FormData>({
      query: (data) => ({
        url: "/core/office-info",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "OfficeInfo", id: "OfficeInfo_ID" }],
    }),

    singleOfficeInfo: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/core/office-info/${id}`,
      }),
      providesTags: [{ type: "OfficeInfo", id: "OfficeInfo_ID" }],
    }),

    deleteOfficeInfo: builder.mutation<ApiResponse<any>, { id: string }>({
      query: ({ id }) => ({
        url: `/core/office-info/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "OfficeInfo", id: "OfficeInfo_ID" }],
    }),

    updateOfficeInfo: builder.mutation<
      ApiResponse<TOfficeInfoData>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/core/office-info/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "OfficeInfo", id: "OfficeInfo_ID" }],
    }),
  }),
});

export const {
  useCreateOfficeInfoMutation,
  useGetOfficeInfoQuery,
  useUpdateOfficeInfoMutation,
  useDeleteOfficeInfoMutation,
  useSingleOfficeInfoQuery,
} = officeInfoEndPoint;

import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import {
  TWebServiceDataTypes,
  TCreateWebServiceTypes,
} from "../types/WebServiceTypes";

const webServiceEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getWebService: builder.query<ApiResponse<TWebServiceDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/web-service",
        params,
      }),
      providesTags: [{ type: TagTypes.WEBSERVICE, id: "WebService_ID" }],
    }),

    singleWebServiceItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/web-service/${id}`,
      }),
      providesTags: [{ type: TagTypes.WEBSERVICE, id: "WebService_ID" }],
    }),

    deleteWebServiceItem: builder.mutation<
      ApiResponse<TWebServiceDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/web-service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.WEBSERVICE, id: "WebService_ID" }],
    }),

    createWebService: builder.mutation<
      ApiResponse<TCreateWebServiceTypes>,
      FormData
    >({
      query: (data) => ({
        url: "/web-service",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.WEBSERVICE, id: "WebService_ID" }],
    }),

    updateWebService: builder.mutation<
      ApiResponse<TCreateWebServiceTypes>,
      { id: number | undefined; data: TCreateWebServiceTypes }
    >({
      query: ({ id, data }) => ({
        url: `/web-service/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.WEBSERVICE, id: "WebService_ID" }],
    }),
  }),
});

export const {
  useDeleteWebServiceItemMutation,
  useGetWebServiceQuery,
  useSingleWebServiceItemQuery,
  useCreateWebServiceMutation,
  useUpdateWebServiceMutation,
} = webServiceEndpoint;

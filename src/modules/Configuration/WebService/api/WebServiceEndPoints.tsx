import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import {
  TWebServiceDataTypes,
  TCreateWebServiceTypes,
} from "../types/WebServiceTypes";
import { openNotification } from "../../../../app/features/notificationSlice";
import { closeModal } from "../../../../app/features/modalSlice";

const webServiceEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getWebService: builder.query<
      ApiResponse<TWebServiceDataTypes[]>,
      FilterTypes
    >({
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
        try {
          const { data } = await queryFulfilled;

          dispatch(
            openNotification({
              type: "success",
              message: data.message || "Web service created successfully!",
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
      invalidatesTags: [{ type: TagTypes.WEBSERVICE, id: "WebService_ID" }],
    }),

    updateWebService: builder.mutation<
      ApiResponse<TCreateWebServiceTypes>,
      {
        id: number | undefined;
        data: TCreateWebServiceTypes;
        successMessage?: string;
      }
    >({
      query: ({ id, data }) => ({
        url: `/web-service/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { successMessage } = arg;
        await handleOnQueryStarted(queryFulfilled, dispatch, successMessage);
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

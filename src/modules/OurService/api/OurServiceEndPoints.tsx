import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { closeModal } from "../../../app/features/modalSlice";
import { openNotification } from "../../../app/features/notificationSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../app/utils/tagTypes";
import {
  TOurServiceDataTypes,
  TCreateOurServiceTypes,
} from "../types/OurServiceTypes";

const ourServiceEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getOurService: builder.query<
      ApiResponse<TOurServiceDataTypes[]>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/our-service",
        params,
      }),
      providesTags: [{ type: TagTypes.OUR_SERVICE, id: "OurService_ID" }],
    }),

    singleOurServiceItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/our-service/${id}`,
      }),
      providesTags: [{ type: TagTypes.OUR_SERVICE, id: "OurService_ID" }],
    }),

    deleteOurServiceItem: builder.mutation<
      ApiResponse<TOurServiceDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/our-service/${id}`,
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

      invalidatesTags: [{ type: TagTypes.OUR_SERVICE, id: "OurService_ID" }],
    }),

    createOurService: builder.mutation<
      ApiResponse<TCreateOurServiceTypes>,
      FormData
    >({
      query: (data) => ({
        url: "/our-service",
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
      invalidatesTags: [{ type: TagTypes.OUR_SERVICE, id: "OurService_ID" }],
    }),

    updateOurService: builder.mutation<
      ApiResponse<TCreateOurServiceTypes>,
      {
        id: number | undefined;
        data: TCreateOurServiceTypes;
        successMessage?: string;
      }
    >({
      query: ({ id, data }) => ({
        url: `/our-service/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { successMessage } = arg;
        await handleOnQueryStarted(queryFulfilled, dispatch, successMessage);
      },
      invalidatesTags: [{ type: TagTypes.OUR_SERVICE, id: "OurService_ID" }],
    }),
  }),
});

export const {
  useDeleteOurServiceItemMutation,
  useGetOurServiceQuery,
  useSingleOurServiceItemQuery,
  useCreateOurServiceMutation,
  useUpdateOurServiceMutation,
} = ourServiceEndpoint;

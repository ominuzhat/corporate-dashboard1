import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { closeModal } from "../../../app/features/modalSlice";
import { openNotification } from "../../../app/features/notificationSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";

const orderEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query<ApiResponse<any[]>, FilterTypes>({
      query: (params) => ({
        url: "/order",
        params,
      }),
      providesTags: [{ type: "Order", id: "Order_ID" }],
    }),

    singleOrderItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/order/${id}`,
      }),
      providesTags: [{ type: "Order", id: "Order_ID" }],
    }),

    deleteOrderItem: builder.mutation<ApiResponse<any>, { id: string }>({
      query: ({ id }) => ({
        url: `/order/${id}`,
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

      invalidatesTags: [{ type: "Order", id: "Order_ID" }],
    }),

    createOrder: builder.mutation<ApiResponse<any>, FormData>({
      query: (data) => ({
        url: "/order",
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
      invalidatesTags: [{ type: "Order", id: "Order_ID" }],
    }),

    updateOrder: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Order", id: "Order_ID" }],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useDeleteOrderItemMutation,
  useSingleOrderItemQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = orderEndpoint;

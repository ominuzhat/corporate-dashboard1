import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { closeModal } from "../../../app/features/modalSlice";
import { openNotification } from "../../../app/features/notificationSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../app/utils/tagTypes";
import { TCreateProduct, TProductData } from "../type/ProductTypes";

const productEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<ApiResponse<TProductData[]>, FilterTypes>({
      query: (params) => ({
        url: "/product",
        params,
      }),
      providesTags: [{ type: TagTypes.PRODUCT, id: "Product_ID" }],
    }),

    singleProductItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/product/${id}`,
      }),
      providesTags: [{ type: TagTypes.PRODUCT, id: "Product_ID" }],
    }),

    deleteProductItem: builder.mutation<
      ApiResponse<any>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/product/${id}`,
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

      invalidatesTags: [{ type: TagTypes.PRODUCT, id: "Product_ID" }],
    }),

    createProduct: builder.mutation<
      ApiResponse<TCreateProduct>,
      FormData
    >({
      query: (data) => ({
        url: "/product",
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
      invalidatesTags: [{ type: TagTypes.PRODUCT, id: "Product_ID" }],
    }),

    updateProduct: builder.mutation<
      ApiResponse<TCreateProduct>,
      {
        id: number | undefined;
        data: TCreateProduct;
        successMessage?: string;
      }
    >({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { successMessage } = arg;
        await handleOnQueryStarted(queryFulfilled, dispatch, successMessage);
      },
      invalidatesTags: [{ type: TagTypes.PRODUCT, id: "Product_ID" }],
    }),
  }),
});

export const {
  useDeleteProductItemMutation,
  useGetProductQuery,
  useSingleProductItemQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productEndpoints;

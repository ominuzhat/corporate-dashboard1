import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { closeModal } from "../../../../app/features/modalSlice";
import { openNotification } from "../../../../app/features/notificationSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { TCreateProductCategoryTypes, TProductCategoryDataTypes } from "../types/ProductCategoryTypes";


const productCategoryEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getProductCategory: builder.query<ApiResponse<TProductCategoryDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/product-category",
        params,
      }),
      providesTags: [{ type: TagTypes.PRODUCT_CATEGORY, id: "ProductCategory_ID" }],
    }),

    singleProductCategoryItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/product-category/${id}`,
      }),
      providesTags: [{ type: TagTypes.PRODUCT_CATEGORY, id: "ProductCategory_ID" }],
    }),

    deleteProductCategoryItem: builder.mutation<
      ApiResponse<TProductCategoryDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/product-category/${id}`,
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

      invalidatesTags: [{ type: TagTypes.PRODUCT_CATEGORY, id: "ProductCategory_ID" }],
    }),

    createProductCategory: builder.mutation<
      ApiResponse<TCreateProductCategoryTypes>,
      FormData
    >({
      query: (data) => ({
        url: "/product-category",
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
      invalidatesTags: [{ type: TagTypes.PRODUCT_CATEGORY, id: "ProductCategory_ID" }],
    }),

    updateProductCategory: builder.mutation<
      ApiResponse<TCreateProductCategoryTypes>,
      {
        id: number | undefined;
        data: TCreateProductCategoryTypes;
        successMessage?: string;
      }
    >({
      query: ({ id, data }) => ({
        url: `/product-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { successMessage } = arg;
        await handleOnQueryStarted(queryFulfilled, dispatch, successMessage);
      },
      invalidatesTags: [{ type: TagTypes.PRODUCT_CATEGORY, id: "ProductCategory_ID" }],
    }),
  }),
});

export const {
  useDeleteProductCategoryItemMutation,
  useGetProductCategoryQuery,
  useSingleProductCategoryItemQuery,
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation,
} = productCategoryEndpoint;

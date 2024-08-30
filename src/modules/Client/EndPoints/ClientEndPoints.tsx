import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";

const clientEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getClient: builder.query<ApiResponse<any[]>, FilterTypes>({
      query: (params) => ({
        url: "/category",
        params,
      }),
      providesTags: [{ type: "Restaurant", id: "RESTAURANT_ID" }],
    }),

    // createRestaurant: builder.mutation<ApiResponse<RestaurantTypes>, FormData>({
    //   query: (data) => ({
    //     url: "/admin/restaurants",
    //     method: "POST",
    //     body: data,
    //   }),
    //   async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
    //     await handleOnQueryStarted(queryFulfilled, dispatch);
    //   },
    //   invalidatesTags: [{ type: "Restaurant", id: "RESTAURANT_ID" }],
    // }),

    // updateRestaurant: builder.mutation<
    //   ApiResponse<RestaurantTypes>,
    //   { id: number | undefined; data: FormData }
    // >({
    //   query: ({ id, data }) => ({
    //     url: `/admin/restaurants/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
    //     await handleOnQueryStarted(queryFulfilled, dispatch);
    //   },
    //   invalidatesTags: [{ type: "Restaurant", id: "RESTAURANT_ID" }],
    // }),
  }),
});

export const { useGetClientQuery } = clientEndpoint;

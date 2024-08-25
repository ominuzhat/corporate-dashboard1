import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../app/utils/tagTypes";
import {
  TOurServiceDataTypes,
  TCreateOurServiceTypes,
} from "../types/OurServiceTypes";

const ourServiceEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getOurService: builder.query<ApiResponse<TOurServiceDataTypes[]>, FilterTypes>({
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
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.OUR_SERVICE, id: "OurService_ID" }],
    }),

    updateOurService: builder.mutation<
      ApiResponse<TCreateOurServiceTypes>,
      { id: number | undefined; data: TCreateOurServiceTypes }
    >({
      query: ({ id, data }) => ({
        url: `/our-service/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
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

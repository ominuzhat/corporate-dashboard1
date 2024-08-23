import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import {
  TSectionDataTypes,
  TCreateSectionTypes,
} from "../types/SectionTypes";

const blogEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getSection: builder.query<ApiResponse<TSectionDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/core/generic-page-section",
        params,
      }),
      providesTags: [{ type: TagTypes.SECTION, id: "Section_ID" }],
    }),

    singleSectionItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/core/generic-page-section/${id}`,
      }),
      providesTags: [{ type: TagTypes.SECTION, id: "Section_ID" }],
    }),

    deleteSectionItem: builder.mutation<
      ApiResponse<TSectionDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/core/generic-page-section/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.SECTION, id: "Section_ID" }],
    }),

    createSection: builder.mutation<
      ApiResponse<TCreateSectionTypes>,
      FormData
    >({
      query: (data) => ({
        url: "/core/generic-page-section",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.SECTION, id: "Section_ID" }],
    }),

    updateSection: builder.mutation<
      ApiResponse<TCreateSectionTypes>,
      { id: number | undefined; data: TCreateSectionTypes }
    >({
      query: ({ id, data }) => ({
        url: `/core/generic-page-section/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.SECTION, id: "Section_ID" }],
    }),
  }),
});

export const {
  useDeleteSectionItemMutation,
  useGetSectionQuery,
  useSingleSectionItemQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
} = blogEndpoint;

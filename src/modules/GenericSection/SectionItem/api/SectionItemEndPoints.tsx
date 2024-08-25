import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import {
  TSectionItemDataTypes,
  TCreateSectionItemTypes,
} from "../types/SectionItemTypes";

const sectionItemEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getSectionItem: builder.query<ApiResponse<TSectionItemDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/core/generic-page-section-item",
        params,
      }),
      providesTags: [{ type: TagTypes.SECTION_ITEM, id: "SectionItem_ID" }],
    }),

    singleSectionItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/core/generic-page-section-item/${id}`,
      }),
      providesTags: [{ type: TagTypes.SECTION_ITEM, id: "SectionItem_ID" }],
    }),

    deleteSectionItem: builder.mutation<
      ApiResponse<TSectionItemDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/core/generic-page-section-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.SECTION_ITEM, id: "SectionItem_ID" }],
    }),

    createSectionItem: builder.mutation<
      ApiResponse<TCreateSectionItemTypes>,
      FormData
    >({
      query: (data) => ({
        url: "/core/generic-page-section-item",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.SECTION_ITEM, id: "SectionItem_ID" }],
    }),

    updateSectionItem: builder.mutation<
      ApiResponse<TCreateSectionItemTypes>,
      { id: number | undefined; data: TCreateSectionItemTypes }
    >({
      query: ({ id, data }) => ({
        url: `/core/generic-page-section-item/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.SECTION_ITEM, id: "SectionItem_ID" }],
    }),
  }),
});

export const {
  useDeleteSectionItemMutation,
  useGetSectionItemQuery,
  useSingleSectionItemQuery,
  useCreateSectionItemMutation,
  useUpdateSectionItemMutation,
} = sectionItemEndpoint;

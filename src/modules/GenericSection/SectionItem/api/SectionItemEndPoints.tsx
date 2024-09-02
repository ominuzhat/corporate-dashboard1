import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { closeModal } from "../../../../app/features/modalSlice";
import { openNotification } from "../../../../app/features/notificationSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import {
  TSectionItemDataTypes,
  TCreateSectionItemTypes,
} from "../types/SectionItemTypes";

const sectionItemEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getSectionItem: builder.query<
      ApiResponse<TSectionItemDataTypes[]>,
      FilterTypes
    >({
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

      invalidatesTags: [{ type: TagTypes.SECTION_ITEM, id: "SectionItem_ID" }],
    }),

    updateSectionItem: builder.mutation<
      ApiResponse<TCreateSectionItemTypes>,
      {
        id: number | undefined;
        data: TCreateSectionItemTypes;
        successMessage?: string;
      }
    >({
      query: ({ id, data }) => ({
        url: `/core/generic-page-section-item/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { successMessage } = arg;
        await handleOnQueryStarted(queryFulfilled, dispatch, successMessage);
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

import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { closeModal } from "../../../../app/features/modalSlice";
import { openNotification } from "../../../../app/features/notificationSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { TSectionDataTypes, TCreateSectionTypes } from "../types/SectionTypes";

const sectionEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getSection: builder.query<ApiResponse<TSectionDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/core/generic-page-section",
        params,
      }),
      providesTags: [{ type: TagTypes.SECTION, id: "Section_ID" }],
    }),

    singleSection: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/core/generic-page-section/${id}`,
      }),
      providesTags: [{ type: TagTypes.SECTION, id: "Section_ID" }],
    }),

    deleteSection: builder.mutation<
      ApiResponse<TSectionDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/core/generic-page-section/${id}`,
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

      invalidatesTags: [{ type: TagTypes.SECTION, id: "Section_ID" }],
    }),

    createSection: builder.mutation<ApiResponse<TCreateSectionTypes>, FormData>(
      {
        query: (data) => ({
          url: "/core/generic-page-section",
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
        invalidatesTags: [{ type: TagTypes.SECTION, id: "Section_ID" }],
      }
    ),

    updateSection: builder.mutation<
      ApiResponse<TCreateSectionTypes>,
      {
        id: number | undefined;
        data: TCreateSectionTypes;
        successMessage?: string;
      }
    >({
      query: ({ id, data }) => ({
        url: `/core/generic-page-section/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { successMessage } = arg;
        await handleOnQueryStarted(queryFulfilled, dispatch, successMessage);
      },
      invalidatesTags: [{ type: TagTypes.SECTION, id: "Section_ID" }],
    }),
  }),
});

export const {
  useDeleteSectionMutation,
  useGetSectionQuery,
  useSingleSectionQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
} = sectionEndpoint;

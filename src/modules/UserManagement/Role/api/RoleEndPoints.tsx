import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import {
  TRoleDataTypes,
  TCreateRoleTypes,
} from "../types/RoleTypes";

const categoryEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getRole: builder.query<ApiResponse<TRoleDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/role",
        params,
      }),
      providesTags: [{ type: TagTypes.ROLE, id: "Role_ID" }],
    }),

    singleRoleItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/role/${id}`,
      }),
      providesTags: [{ type: TagTypes.ROLE, id: "Role_ID" }],
    }),

    deleteRoleItem: builder.mutation<
      ApiResponse<TRoleDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/role/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.ROLE, id: "Role_ID" }],
    }),

    createRole: builder.mutation<
      ApiResponse<TCreateRoleTypes>,
      FormData
    >({
      query: (data) => ({
        url: "/role",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.ROLE, id: "Role_ID" }],
    }),

    updateRole: builder.mutation<
      ApiResponse<TCreateRoleTypes>,
      { id: number | undefined; data: TCreateRoleTypes }
    >({
      query: ({ id, data }) => ({
        url: `/role/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.ROLE, id: "Role_ID" }],
    }),
  }),
});

export const {
  useDeleteRoleItemMutation,
  useGetRoleQuery,
  useSingleRoleItemQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
} = categoryEndpoint;

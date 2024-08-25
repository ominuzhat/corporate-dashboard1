import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import {
  TUserDataTypes,
  TCreateUserTypes,
} from "../types/UserTypes";

const userEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<ApiResponse<TUserDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/user",
        params,
      }),
      providesTags: [{ type: TagTypes.USER, id: "User2_ID" }],
    }),

    singleUser: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/user/${id}`,
      }),
      providesTags: [{ type: TagTypes.USER, id: "User2_ID" }],
    }),

    deleteUser: builder.mutation<
      ApiResponse<TUserDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TagTypes.USER, id: "User2_ID" }],
    }),

    createUser: builder.mutation<
      ApiResponse<TCreateUserTypes>,
      FormData
    >({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.USER, id: "User2_ID" }],
    }),

    updateUser: builder.mutation<
      ApiResponse<TCreateUserTypes>,
      { id: number | undefined; data: TCreateUserTypes }
    >({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: TagTypes.USER, id: "User2_ID" }],
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetUserQuery,
  useSingleUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userEndpoint;

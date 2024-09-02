import { Dispatch } from "@reduxjs/toolkit";
import { ApiResponse } from "./constant";
import { closeModal } from "../features/modalSlice";
import { openNotification } from "../features/notificationSlice";

interface QueryFulfilledResponse<T> {
  data: ApiResponse<T>;
}

interface QueryError {
  error: {
    status: number;
    data: { message: string; success: boolean };
  };
}

export const handleOnQueryStarted = async <T>(
  queryFulfilled: Promise<QueryFulfilledResponse<T>>,
  dispatch: Dispatch,
  successMessage?: string // Add successMessage parameter
) => {
  try {
    const response = await queryFulfilled;
    dispatch(closeModal());
    dispatch(
      openNotification({
        type: "success",
        message:
          successMessage || response.data.message || "Operation successful!",
      })
    );
  } catch (err) {
    const error = err as QueryError;
    dispatch(
      openNotification({
        type: "error",
        message: error.error.data.message || "An unknown error occurred",
        placement: "bottomLeft",
      })
    );
  }
};

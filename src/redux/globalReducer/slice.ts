import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType, UserLoggedType } from "../../types/types";

const initialState: { user: UserLoggedType | null; notification: NotificationType | null } = {
  user: null,
  notification: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserLoggedType>) => {
      state.user = action.payload;
    },
    setNotification: (state, action: PayloadAction<NotificationType | null>) => {
      state.notification = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setUser, setNotification } = globalSlice.actions;

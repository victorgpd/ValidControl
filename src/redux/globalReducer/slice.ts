import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType, UserLoggedType } from "../../types/types";

interface initialStateType {
  user: UserLoggedType | null;
  openCurrentMenu: string[];
  notification: NotificationType | null;
}
const initialState: initialStateType = {
  user: null,
  openCurrentMenu: ["dashboard"],
  notification: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserLoggedType>) => {
      state.user = action.payload;
    },
    setOpenCurrentMenu: (state, action: PayloadAction<string[]>) => {
      state.openCurrentMenu = action.payload;
    },
    setNotification: (state, action: PayloadAction<NotificationType | null>) => {
      state.notification = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setUser, setOpenCurrentMenu, setNotification } = globalSlice.actions;

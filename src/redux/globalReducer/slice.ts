import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InformacoesType, NotificationType, UserLoggedType } from "../../types/types";

interface initialStateType {
  openCurrentMenu: string[];
  user: UserLoggedType | null;
  loja: InformacoesType | null;
  notification: NotificationType | null;
}
const initialState: initialStateType = {
  loja: null,
  user: null,
  notification: null,
  openCurrentMenu: ["dashboard"],
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
    setLoja: (state, action: PayloadAction<InformacoesType>) => {
      state.loja = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setUser, setLoja, setOpenCurrentMenu, setNotification } = globalSlice.actions;

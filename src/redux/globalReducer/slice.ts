import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InformacoesType, NotificationType, StoresType, UserLoggedType } from "../../types/types";

interface initialStateType {
  openCurrentMenu: string[];
  lojas: StoresType[] | null;
  user: UserLoggedType | null;
  loja: InformacoesType | null;
  selectedLojaId: string | null;
  notification: NotificationType | null;
}

const initialState: initialStateType = {
  loja: null,
  user: null,
  lojas: null,
  notification: null,
  openCurrentMenu: ["dashboard"],
  selectedLojaId: null, // Novo campo
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
    setLoja: (state, action: PayloadAction<InformacoesType | null>) => {
      state.loja = action.payload;
    },
    setLojas: (state, action: PayloadAction<StoresType[] | null>) => {
      state.lojas = action.payload;
    },
    setSelectedLojaId: (state, action: PayloadAction<string | null>) => {
      state.selectedLojaId = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setUser, setLoja, setLojas, setSelectedLojaId, setOpenCurrentMenu, setNotification } = globalSlice.actions;

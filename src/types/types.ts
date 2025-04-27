import { Timestamp } from "firebase/firestore";

export interface UserType {
  email: string;
  password: string;
  name?: string;
  uid?: string;
  nameStore?: string;
}

export interface UserLoggedType {
  uid: string | null;
  name: string | null;
  image: string | null;
  email: string | null;
}

export interface NotificationType {
  type: "success" | "info" | "warning" | "error" | "";
  message: string;
  description: string;
}

export interface ValidityType {
  id: number;
  name: string;
  date: string;
  barcode: string;
  quantity: number;
}

export interface ProductType {
  id: number;
  name: string;
  barcode: string;
}

interface LogType {
  id: number;
  user: string;
  date: string;
  action: string;
  data: ProductType | ValidityType | string | null;
}

export interface InformacoesType {
  name: string | null;
  store: string | null;
  logs: LogType[] | null;
  createdBy: string | null;
  lengthBarcode: number | null;
  products: ProductType[] | null;
  idDocument?: string | undefined;
  aVencer?: ValidityType[] | null;
  vencidos?: ValidityType[] | null;
  validitys: ValidityType[] | null;
  createdAt: string | Timestamp | null;
  access: { name: string; email: string }[] | null;
}

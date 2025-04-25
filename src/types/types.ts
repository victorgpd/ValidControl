export interface UserType {
  email: string;
  password: string;
  name?: string;
  nameStore?: string;
  uid?: string;
}

export interface UserLoggedType {
  uid: string | null;
  name: string | null;
  email: string | null;
}

export interface NotificationType {
  type: "success" | "info" | "warning" | "error" | "";
  message: string;
  description: string;
}

export interface ValidityType {
  id: string;
  name: string;
  date: number;
  quantity: number;
}

export interface ProductType {
  id: string;
  name: string;
  barcode: string;
  idDocument?: string | undefined;
}

export interface InformacoesType {
  name: string | null;
  store: string | null;
  access: string[] | null;
  createdAt: string | null;
  createdBy: string | null;
  aVencer: ValidityType[] | null;
  products: ProductType[] | null;
  vencidos: ValidityType[] | null;
  validitys: ValidityType[] | null;
}

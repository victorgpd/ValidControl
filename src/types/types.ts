export interface UserType {
  email: string;
  password: string;
  name?: string;
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

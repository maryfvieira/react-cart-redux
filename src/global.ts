import { DefaultUser } from "next-auth";

export interface Product {
  id: number;
  product_name: string;
  product_desc: string;
  product_color: string;
  product_size: string;
  product_price: number;
  product_image: string;
  product_qty: number;
}
export interface ApiRoles {
  id: number;
  description: string;
  url: string;
  roles: string[];
  methods: string[];
}

export interface Stock {
  product: Product;
  product_qty: number;
}

export interface Wishlist {
  products: Product[];
}

export interface CartItemState {
  id: string | undefined | null;
  product: Product;
  cartItemAmount: number;
  cartItemTotal: number;
}

export interface CartState {
  //products: Product[];
  createdDate: Date|undefined;
  wishlist: Wishlist;
  cartItems: CartItemState[];
  amount: number;
  total: number;
  isLoading: boolean;
}

export interface GoogleResponse {
  success: boolean;
  "error-codes": any[];
  statusResponse: number;
}
export interface AuthPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  iat: number;
  exp: number;
  openIdSub?: string;
}
export enum T_UserRole {
  Admin = "Admin",
  None = "None",
  User = "User",
  Moderator = "Moderator",
}
export interface I_User {
  id: string;
  email: string;
  phone: string;
  password: string;
  pin: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: T_UserRole;
  //status: T_UserStatus;
  totpSecret?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  lastLogin?: Date;
  lastSeen?: Date;
}

export interface UserState {
  data: I_UserPublic;
  token: string | null;
  isLoading: boolean;
  isLogged: boolean;
}

export interface I_UserPublic extends Omit<I_User, "password" | "totpSecret"> {}

export interface ApiResponse {
  success: boolean;
  message?: string;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface UserSession {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: T_UserRole;
}

export interface AuthUser{
  user: UserSession;
  access_token?: string;
  expires_at?: number;
  refresh_token?: string;
}

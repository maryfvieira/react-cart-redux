import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { T_UserRole } from "@/global";
import * as jwt from 'jsonwebtoken'

export interface UserSession {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: T_UserRole;

}

type UserId = string;
declare module "next-auth/jwt" {
  interface JWT {
  user: UserSession;
  access_token: string;
  expires_at: number;
  refresh_expire_at: number;
  refresh_token: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: UserSession;
    access_token: string;
    expires_at: number;
    refresh_token: string;
  }
}

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        userId: string
    }
}


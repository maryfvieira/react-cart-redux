import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { T_UserRole } from "@/global";

type UserId = string;
declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: T_UserRole;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: UserId;
      email: string;
      firstName: string;
      lastName: string;
      avatar?: string;
      role: T_UserRole;
    };
  }
}

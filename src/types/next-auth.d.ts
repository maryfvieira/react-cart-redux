import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      phone: string;
      password: string;
      pin: string;
      firstName: string;
      lastName: string;
      avatar?: string;
      role: T_UserRole;
    };
  }
}
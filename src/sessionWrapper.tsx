// src/app/auth_wrapper.tsx
"use client";
import SessionManager from "@components/SessionManager";
// SessionProvider must be used with Client Side Rendering
// Therfore we create a separate client side component to run AuthWrapper
import { SessionProvider } from "next-auth/react";

type Props = {children: React.ReactNode};

export default function SessionWrapper({ children }: Props) {
  return (
    <SessionProvider>
      <SessionManager />
      {children}
    </SessionProvider>
  );
}

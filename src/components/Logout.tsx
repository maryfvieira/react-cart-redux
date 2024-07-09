"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Loading from "./Loading";

const Logout = () => {
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });
  }

  useEffect(() => {
    logout()
      .catch(console.error)
      .finally(() => {
        router.replace("/");
      });
  });

  return (
    <div className="container mt-5">
      <Loading />
    </div>
  );
};

export default Logout;

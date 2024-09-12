"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toZonedTime } from 'date-fns-tz'

const SessionManager = () => {
  const { data: session, update } = useSession();
  const pt_BR = "America/Sao_Paulo";

  function isNearToExpireSession() {
    if (session?.expires != null) {
      const expiresAt = toZonedTime(new Date(session?.expires), pt_BR);
      const now = toZonedTime(new Date(), pt_BR)
      const nowPlusTwoMinutes = toZonedTime(new Date(now.getTime() + 1000 * 60 * 3), pt_BR);  

      //verifica se sessao vai expirar em ate2 min
      if (now < expiresAt && nowPlusTwoMinutes > expiresAt) {
        updateSession();
      }
    }
  }

  async function updateSession() {
    await update();
  }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       update(); // extend client session
//       // TODO request token refresh from server
//     }, 1000 * 60 * 60)
//     return () => clearInterval(interval)
//   }, [update]); 
//   return (
//     <></>
//   )
  useEffect(() => {
    isNearToExpireSession();
  });

  return <></>;
};

export default SessionManager;

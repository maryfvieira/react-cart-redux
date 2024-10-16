"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

const SessionManager = () => {
  const { data: session, update } = useSession();
  //const [isLoading, setIsLoading] = useState(true)
  const now =  Date.now() / 1000;

  // if(session==undefined)
  //   redirect('/logout')
 
  useEffect(() => {
    if(session!= undefined && session.expires_at < now){
      signOut()
    }
    //setIsLoading(false)

    
  },[]);

  return <></>;
};

export default SessionManager;

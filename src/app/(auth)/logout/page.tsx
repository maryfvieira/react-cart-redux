
import Loading from '@components/Loading';
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import Logout from '@components/Logout';

const LogoutPage = async () => {

  const user = await getCurrentUser();

  if (!user) {
      redirect('/')
  }
 return (<main><Logout/></main>)

}

export default LogoutPage;
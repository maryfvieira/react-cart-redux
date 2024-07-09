//'use client'

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from '@redux/store';
import Navbar from "@/components/Navbar";
import Footer from "@components/Footer";
//import '../app/index.css'
import container from '@/di/ioc.config';
import LoginRegister from '@components/LoginRegister';
import Login from '@components/Login';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

// Define the Login page
const LoginPage = async () => {

  const user = await getCurrentUser();

  if (user) {
      redirect('/')
  }
  
  return (
    <main>
      <Navbar /> 
      <div className="container">
        <Login/>
      </div>
      <Footer />
    </main>
  );
};


export default LoginPage;

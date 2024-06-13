'use client'

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from '@redux/store';
import Navbar from "@/components/Navbar";
import Footer from "@components/Footer";
//import '../app/index.css'
import container from '@/di/ioc.config';
import LoginRegister from '@components/LoginRegister';

// Define the Login page
const AccessDeniedPage: React.FC = () => {

  // JSX for the main component
  return (
    <main>
      <Navbar /> 
      <div className="container">
        Acesso Negado
      </div>
      <Footer />
    </main>
  );
};


export default AccessDeniedPage;

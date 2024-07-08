"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "@redux/store";
import Navbar from "@/components/Navbar";
import Footer from "@components/Footer";
//import '../app/index.css'
import container from "@/di/ioc.config";
import LoginRegister from "@components/LoginRegister";
import Login from "@components/Login";
import Link from "next/link";

// Define the Login page
const SigninPage: React.FC = () => {
  // JSX for the main component
  return (
    <main>
      <Navbar />
      <div className="container">
        <div className="Auth-form-container">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <Login container={container} />
            <div className="text-center">
              Not registered yet?<br></br>
             <Link href="/signup">Create new account</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SigninPage;

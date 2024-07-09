import React, { useState } from "react";

import "reflect-metadata";

import { Container } from "inversify";
import Login from "@components/Login";
import Register from "@components/Register";

type Props = { container: Container };

const LoginRegister = ({ container }: Props) => {
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  return (
    <div className="Auth-form-container">
      {(() => {
        if (authMode === "signin") {
          return (<><div className="Auth-form-content"><h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div></div><Login /></>)
        } else {
          return (<><div className="Auth-form-content"><h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div></div><Register container={container} /></>)
        }
      })()}
    </div>
  );
};

export default LoginRegister;

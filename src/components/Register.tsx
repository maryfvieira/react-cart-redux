import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "@/hooks/useRecaptcha";

import 'reflect-metadata';
import ApiClient from '@/services/httpclient/axios/apiClient';
import TYPES from '@/services/httpclient/axios/types';
import { Container } from 'inversify';
import { UserService } from '@/services/userService';

function getLoginApi(container: Container): UserService {
  const apiClient = container.get<ApiClient>(TYPES.ApiClient);
  return new UserService(apiClient);
}

type Props = { container: Container};

const Register = ({ container }: Props) => {

  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    recaptchaRef.current?.reset();
  };

  return (
    
      <form className="Auth-form">
        <div className="Auth-form-content">
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
              <br />
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.SITE_KEY || ""}
                onChange={handleRecaptcha}
              /> <br />
              <button
                disabled={!capchaToken}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button> 
            </div>
         
        </div>
      </form>

  );
};

export default Register;

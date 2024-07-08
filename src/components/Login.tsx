import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "@/hooks/useRecaptcha";

import "reflect-metadata";
import ApiClient from '@/services/httpclient/axios/apiClient';
import TYPES from '@/services/httpclient/axios/types';
import { Container } from "inversify";
//import { UserApi } from "@/services/user/userApi";

// function getLoginApi(container: Container): UserApi {
//   const apiClient = container.get<ApiClient>(TYPES.ApiClient);
//   return new UserApi(apiClient);
// }

type Props = { container: Container };

const Login = ({ container }: Props) => {
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const result = {data: {success: true, error:{message:""}}};
     if (capchaToken && username && password) {
    //   const result = await getLoginApi(container).login(
    //     username,
    //     password,
    //     capchaToken
    //   );

      if (result.data.success === false) {
        alert(result.data.error.message);
        handleRecaptcha("");
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        return;
      }

      // Reset captcha after submission
      recaptchaRef.current?.reset();

      // If the login is successful, perform post-login logic
      if (result.data.success) {
        // Example post-login logic:
        // - Store user token or session data
        // - Redirect to a protected page
        // - Update user state in the application
        console.log("Login successful");
        // ...
      } else {
        // If the login fails, display an error message to the user
        alert("Login failed. Please check your credentials and try again.");
      }
    } else {
      alert("Please fill in all fields and complete the captcha.");
    }
  };

  return (

      <form onSubmit={handleSubmitLogin} className="Auth-form">
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
          @@{process.env.SITE_KEY}
          <div className="d-grid gap-2 mt-3">
            <br />
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.SITE_KEY || ""}
              onChange={handleRecaptcha}
            />{" "}
            <br />
            <button
              disabled={!capchaToken}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>

  );
};
export default Login;
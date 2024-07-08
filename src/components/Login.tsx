"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "@/hooks/useRecaptcha";

import "reflect-metadata";
import ApiClient from "@/services/httpclient/axios/apiClient";
import TYPES from "@/services/httpclient/axios/types";
import { Container } from "inversify";
import { UserService } from "@/services/userService";
import Alert from "@mui/material/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import { AlertTitle } from "@mui/material";
import Fade from "@mui/material/Fade";
 import { setUser } from '@/redux/slices/userSlice'; 
import { UserState } from '@/global';
import { useSelector, useDispatch, dispatch } from '@redux/store';
import {generateJwtToken} from "@/utils/auth";

function getLoginApi(container: Container): UserService {
  const apiClient = container.get<ApiClient>(TYPES.ApiClient);
  return new UserService(apiClient);
}

type Props = { container: Container };

const Login = ({ container }: Props) => {

  const dispatch = useDispatch();
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = React.useState("error");
  const [alertMsg, setAlertMsg] = useState("Login realizado com sucesso");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVisibility, setAlertVisibility] = useState(false);

  const handleChange = (status) => {
    setStatus(status);
    setShowAlert(true);
  };

  // const alert = (
  //   <Alert severity={status} variant="standard" className="alert">
  //     <AlertTitle>{status== "error"? "Erro":"Sucesso"}</AlertTitle>
  //     {alertMsg}
  //   </Alert>
  // );

  const alert = (
    <Alert variant="standard" className="alert">
      <AlertTitle>{status== "error"? "Erro":"Sucesso"}</AlertTitle>
      {alertMsg}
    </Alert>
  );

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (capchaToken && username && password) {
      const result = await getLoginApi(container).login(
        username,
        password,
        capchaToken
      );

      recaptchaRef.current?.reset();

      console.log("erro ***=>" + JSON.stringify(result));
      if (result.data.error != null) {
        console.log("erro" + result.error);
       
        if (result.data.error._message) 
          setAlertMsg(result.data.error._message);
        else 
          setAlertMsg("Ocorreu um erro inesperado");

        handleChange("error");

        handleRecaptcha("");
        // if (recaptchaRef.current) {
        //   recaptchaRef.current.reset();
        // }
        return;
      } else {
        
        const userData = result.data;
        const token = await generateJwtToken(userData);
        dispatch(setUser({token: token, data: userData}))
        

        handleChange("success");
        setAlertMsg("");
      }

      // Reset captcha after submission
      //recaptchaRef.current?.reset();

      // If the login is successful, perform post-login logic
      // if (result.data.data.success) {
      //   // Example post-login logic:
      //   // - Store user token or session data
      //   // - Redirect to a protected page
      //   // - Update user state in the application
      //   console.log("Login successful");
      //   // ...
      // } else {
      //   // If the login fails, display an error message to the user
      //   alert("Login failed. Please check your credentials and try again.");
      // }
    } else {
      handleChange("error");
      setAlertMsg("Por favor, preencha todos os campos e resolva o capcha para continuar");
    }
  };

  return (
    <>
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
      <Fade
        in={showAlert} //Write the needed condition here to make it appear
        timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
        addEndListener={() => {
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        }}
      >
        {alert}
      </Fade>
    </>
  );
};
export default Login;

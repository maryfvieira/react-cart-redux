"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "@/hooks/useRecaptcha";
import "reflect-metadata";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import Fade from "@mui/material/Fade";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { TokenProvider } from "@/services/jwt/TokenProvider";
import authConfig from "@config/authConfig";

const Login = () => {
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = React.useState("error");
  const [alertMsg, setAlertMsg] = useState("Login realizado com sucesso");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const router = useRouter();

  const handleChange = (status) => {
    setStatus(status);
    setShowAlert(true);
  };

  const alert = (
    <Alert severity="error" className="alert">
      <AlertTitle>{"Erro"}</AlertTitle>
      {alertMsg}
    </Alert>
  );

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (capchaToken && username && password) {
      const result = await signIn("credentials", {
        username,
        password,
        capchaToken,
        callbackUrl: "/",
        redirect: false,
      });

      recaptchaRef.current?.reset();

      if (result?.error != null) {
        console.log("erro" + JSON.stringify(result));

        setAlertMsg("Não foi possível realizar o login, tente novamente");

        handleChange("error");

        handleRecaptcha("");

        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }

        return;
      } else {
        router.replace("/");
      }
    } else {
      handleChange("error");
      setAlertMsg(
        "Por favor, preencha todos os campos e resolva o capcha para continuar"
      );
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

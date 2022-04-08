import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import Button from "../../components/button";

import UserContext from "../../services/user";
import { signInWithGithub } from "../../services/firebase";

import style from "./style.module.css";

function Login() {
  const user = useContext(UserContext);

  const leave = () => {
    window.location.href = 'https://www.youtube.com/watch?v=SvZmRv6U_s0';
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={style.page}>
      <div className={style.container}>
        <h1 className={style.title}>A very sh*t notes app.</h1>

        <Button onClick={signInWithGithub} text={'Login'} />
        <Button onClick={leave} text={'LEAVE!'} />

        <h3 className={style.subtitle}>
          Now featuring <span className={style.bold}>markdown!</span>
        </h3>
      </div>
    </div>
  );
}

export default Login;

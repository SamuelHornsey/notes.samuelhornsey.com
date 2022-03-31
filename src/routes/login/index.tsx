import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import UserContext from "../../services/user";
import { signInWithGoogle } from "../../services/firebase";

import style from "./style.module.css";

function Login() {
  const user = useContext(UserContext);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={style.page}>
      <div className={style.container}>
        <h1 className={style.title}>A very sh*t notes app.</h1>

        <button className={style.button} onClick={signInWithGoogle}>
          Login
        </button>
        <button className={style.button}>LEAVE!</button>

        <h3 className={style.subtitle}>
          Now featuring <span className={style.bold}>markdown!</span>
        </h3>
      </div>
    </div>
  );
}

export default Login;

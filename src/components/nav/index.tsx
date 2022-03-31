import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

import UserContext from "../../services/user";
import { auth } from "../../services/firebase";

import style from "./style.module.css";

export default function Nav() {
  const user = useContext(UserContext);

  const logout = () => {
    signOut(auth);
  };

  if (!user) return <React.Fragment></React.Fragment>;

  return (
    <nav className={style.nav}>
      <ul className={style.container}>
        <li className={style.element}>
          <Link className={style.link} to="/">
            Home.
          </Link>
        </li>
        <li className={style.element}>
          <Link className={style.link} to="/what-the-hell-is-this">
            what is this?
          </Link>
        </li>
        <li className={style.element}>
          <a
            className={style.link}
            target="_blank"
            href="https://github.com/SamuelHornsey/brutalist-notes"
          >
            Github.
          </a>
        </li>
        <li className={style.element}>
          <a className={style.link} onClick={logout} href="#">
            LEAVE!(logoff)
          </a>
        </li>
      </ul>
    </nav>
  );
}

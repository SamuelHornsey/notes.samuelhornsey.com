import React from "react";

// Styles
import style from "./style.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <p className={style.text}>
          built in a day by a <span className={style.italic}>bored</span> dev.
          See code and submit bugs{" "}
          <a
            href="https://github.com/SamuelHornsey/brutalist-notes"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

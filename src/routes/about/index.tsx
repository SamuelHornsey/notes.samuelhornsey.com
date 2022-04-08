import React from "react";

import style from "./style.module.css";

export default function About() {
  return (
    <div className={style.about}>
      <h1 className={style.heading}>What on earth is this?</h1>

      <h4 className={style.callout}>
        Every developer tries to make a notes app. THis is just a particularly
        sh*t one.
      </h4>

      <p className={style.paragraph}>
        Hi There. I am <span className={style.strike}>designer</span> and
        developer from Australia.
      </p>
      <p className={style.paragraph}>
        I made (and designed) this app one rainy evening. Use it for your notes.
        Or don't. I could care less... Follow on{" "}
        <a
          href="https://github.com/SamuelHornsey/brutalist-notes"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>{" "}
        if you like bad code and/or websites.
      </p>
      <p className={`${style.paragraph} ${style.italic}`}>
        *all PRs and bugs will be rudely rejected*{" "}
      </p>

      <h3 className={style.heading}>Reviews.</h3>

      <ol className={style.list}>
        <li>unusable. very borken. 1/5</li>
        <li>i think my computer has been hacked?</li>
        <li>more depressing than being an acutal software developer</li>
        <li>Pretty sure this site hasn't changed since the ninties.</li>
      </ol>
    </div>
  );
}

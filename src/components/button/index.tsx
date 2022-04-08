import React from "react";

// Styles
import style from "./style.module.css";

// Props type
interface Props {
  text: string;
  onClick: React.MouseEventHandler;
}

export default function Button(props: Props) {
  return (
    <button className={style.button} onClick={props.onClick}>
      {props.text}
    </button>
  )
}
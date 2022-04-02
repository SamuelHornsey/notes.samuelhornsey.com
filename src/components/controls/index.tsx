import React from "react";

// Styles
import style from "./style.module.css";

// Props types
interface Props {
  onNew: Function
}

export default function Controls(props: Props) {
  // Run on new handler
  const onClick = () => {
    props.onNew();
  }
  
  return (
    <div className={style.controls}>
      <div className={style.title}>My Folders</div>
      <button className={style.new} onClick={onClick}>
        NEW...!
      </button>
    </div>
  );
}

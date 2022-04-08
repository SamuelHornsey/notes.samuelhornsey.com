import React from "react";

// Styles
import style from "./style.module.css";

// Props types
interface Props {
  onNew: Function
}

export default function Header(props: Props) {
  // Run on new handler
  const onClick = () => {
    props.onNew();
  }
  
  return (
    <div className={style.header}>
      <div className={style.title}>My Folders</div>
      <button className={style.new} onClick={onClick}>
        NEW...!
      </button>
    </div>
  );
}

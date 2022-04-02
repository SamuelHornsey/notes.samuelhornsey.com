import React from "react";

// Components
import Notes from "../notes";

// Styles
import style from "./style.module.css";

// Props types
interface Props {
  uuid: string;
  index: number;
  name: string;
  open: boolean;
  onClick: Function;
}

export default function Folder(props: Props) {
  // Run on click handler
  const toggle = (e: React.MouseEvent) => {
    props.onClick(props.index);
  }

  return (
    <div className={style.folder}>
      <button
        className={style.name}
        onClick={toggle}
      >
        {props.name}
      </button>

      {props.open ? <Notes folder={props.uuid} /> : null}
    </div>
  );
}

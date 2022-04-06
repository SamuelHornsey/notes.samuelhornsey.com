import React from "react";

import edit from "../../assets/edit.png";
import trash from "../../assets/trash.png";

import style from "./style.module.css";

interface Props {
  show: boolean;
  onDelete: Function;
  onEdit: Function;
}

export default function Controls(props: Props) {
  const onDelete = () => {
    props.onDelete();
  }

  const onEdit = () => {
    props.onEdit();
  }

  return (
    <>
      <button
        className={props.show ? `${style.button} ${style.show}` : style.button}
        onClick={onEdit}
      >
        <img className={style.edit} src={edit}></img>
      </button>

      <button
        className={props.show ? `${style.button} ${style.show}` : style.button}
        onClick={onDelete}
      >
        <img className={style.edit} src={trash}></img>
      </button>
    </>
  );
}

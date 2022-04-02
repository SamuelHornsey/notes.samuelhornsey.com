import React from "react";
import { useNavigate } from "react-router-dom";

import style from "./style.module.css";

interface Props {
  uuid: string;
  name: string;
  folder: string;
}

export default function Note(props: Props) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/edit/${props.folder}/${props.uuid}`);
  };

  return (
    <button
      onClick={onClick}
      className={style.note}
    >{`${props.name}.txt`}</button>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Controls from "../controls";

import style from "./style.module.css";

interface Props {
  uuid: string;
  index: number;
  name: string;
  folder: string;
  deleteNote: Function;
  editNote: Function;
}

export default function Note(props: Props) {
  const [hover, setHover] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/edit/${props.folder}/${props.uuid}`);
  };

  const onEnter = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  const onDelete = () => {
    props.deleteNote(props.uuid);
  };

  const onEdit = () => {
    props.editNote(props.index);
  };

  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} className={style.note}>
      <button
        onClick={onClick}
        className={style.link}
      >{`${props.name}.txt`}</button>

      <Controls show={hover} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

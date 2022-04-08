import React, { useState } from "react";

// Components
import Notes from "../notes";
import Controls from "../controls";

// Styles
import style from "./style.module.css";

// Props types
interface Props {
  uuid: string;
  index: number;
  name: string;
  open: boolean;
  onClick: Function;
  deleteFolder: Function;
  editFolder: Function;
}

export default function Folder(props: Props) {
  const [hover, setHover] = useState(false);

  // Run on click handler
  const toggle = (e: React.MouseEvent) => {
    props.onClick(props.index);
  };

  const onEnter = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  const onDelete = () => {
    props.deleteFolder(props.uuid);
  };

  const onEdit = () => {
    props.editFolder(props.index);
  };

  return (
    <div className={style.folder}>
      <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <button className={style.name} onClick={toggle}>
          {props.name}
        </button>
        <Controls show={hover} onDelete={onDelete} onEdit={onEdit} />
      </div>

      {props.open ? <Notes folder={props.uuid} /> : null}
    </div>
  );
}

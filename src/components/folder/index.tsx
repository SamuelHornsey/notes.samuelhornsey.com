import React, { useState } from "react";

// Components
import Controls from "../controls";

// Styles
import style from "./style.module.css";

// Props types
interface Props {
  folderId: string;
  index: number;
  name: string;
  open: boolean;
  handleClick: Function;
  handleDelete: Function;
  handleEdit: Function;
  notes: React.ReactNode;
}

export default function Folder(props: Props) {
  const [hover, setHover] = useState(false);

  // Run on click handler
  const toggle = (e: React.MouseEvent) => {
    props.handleClick(props.index);
  };

  const onEnter = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  const onDelete = () => {
    props.handleDelete(props.folderId);
  };

  const onEdit = () => {
    props.handleEdit(props.index);
  };

  return (
    <div className={style.folder}>
      <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <button className={style.name} onClick={toggle}>
          {props.name}
        </button>
        <Controls show={hover} onDelete={onDelete} onEdit={onEdit} />
      </div>

      {props.open ? props.notes : null}
    </div>
  );
}

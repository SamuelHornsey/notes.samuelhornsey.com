import React, { useState } from "react";

// Components
import Button from "../button";
import Modal from "../modal";

import style from "./style.module.css";

interface Props {
  onSubmit: Function;
  onCancel: Function;
}

export default function NewModal(props: Props) {
  const [value, setValue] = useState("");

  // on text field change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.onSubmit(value);
    }
  };

  const onClick = () => {
    props.onSubmit(value);
  };

  const onExit = () => {
    props.onCancel();
  };

  return (
    <Modal>
      <div>
        <input
          className={style.input}
          placeholder="New folder name..."
          value={value}
          onChange={onChange}
          onKeyUp={keyUp}
        ></input>
      </div>
      <div className={style.buttons}>
        <Button onClick={onClick} text={"submit."}></Button>
        <Button onClick={onExit} text={"LEAVE!"}></Button>
      </div>
    </Modal>
  );
}

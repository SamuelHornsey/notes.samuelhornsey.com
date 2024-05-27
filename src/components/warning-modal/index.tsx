import React from "react";

// Components
import Modal from "../modal";
import Button from "../button";

import style from "./style.module.css";

interface Props {
  handleConfirm: Function;
  handleCancel: Function;
}

export default function WarningModal(props: Props) {
  const onCancel = () => {
    props.handleCancel();
  };

  const onConfirm = () => {
    props.handleConfirm();
  };

  return (
    <Modal>
      <div>
        <h4>Are You SURE?</h4>
      </div>
      <div className={style.buttons}>
        <Button onClick={onConfirm} text={"delete."}></Button>
        <Button onClick={onCancel} text={"NOOOOOOO!"}></Button>
      </div>
    </Modal>
  );
}

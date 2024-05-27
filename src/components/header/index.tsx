import { useContext } from "react";

import ModalContext from "../../context/modal";

import NewModal from "../new-modal";

import UserContext from "../../services/user";
import { createFolder } from "../../services/folders";
import { IfcUser } from "../../types/interfaces";

// Styles
import style from "./style.module.css";

export default function Header() {
  const user = useContext(UserContext) as IfcUser;
  const { setModal } = useContext(ModalContext);

  const onSubmit = (name: string) => {
    if (name === "") return;

    createFolder(`notes/${user.uid}/folders/`, { name }).then(() =>
      setModal(null)
    );
  };

  const onCancel = () => {
    setModal(null);
  };

  // Run on new handler
  const onClick = () => {
    setModal(<NewModal onSubmit={onSubmit} onCancel={onCancel} />);
  };

  return (
    <div className={style.header}>
      <div className={style.title}>My Folders</div>
      <button className={style.new} onClick={onClick}>
        NEW...!
      </button>
    </div>
  );
}

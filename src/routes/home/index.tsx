import React, { useState, useContext } from "react";

// Components
import Modal from "../../components/modal";
import Header from "../../components/header";
import Folders from "../../components/folders";

// Services
import { IfcUser } from "../../types/interfaces";
import UserContext from "../../services/user";
import { createFolder } from "../../services/folders";

// Styles
import style from "./style.module.css";

function Home() {
  const user = useContext(UserContext) as IfcUser;
  const [modal, setModal] = useState<boolean>(false);

  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = (name: string) => {
    createFolder(`notes/${user.uid}/folders/`, { name })
      .then(() => setModal(false));
  };

  return (
    <div className={style.home}>
      <div className={style.container}>
        {modal ? <Modal toggle={toggle} onSubmit={onSubmit} /> : null}
        <Header onNew={toggle} />
        <Folders />
      </div>
    </div>
  );
}

export default Home;

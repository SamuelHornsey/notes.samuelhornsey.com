import React, { useState, useContext } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import Modal from "../../components/modal";
import Header from "../../components/header";
import Folders from "../../components/folders";

import { db } from "../../services/firebase";
import UserContext from "../../services/user";

import style from "./style.module.css";

function Home() {
  const user = useContext(UserContext);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = (value: string) => {
    const { uid } = { ...user };
    addDoc(collection(db, `notes/${uid}/folders/`), {
      name: value,
      timestamp: serverTimestamp(),
    }).then(() => setModal(false));
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

import React, { useState } from "react";

// Components
import Header from "../../components/header";
import Folders from "../../components/folders";

// Services
import ModalContext from "../../context/modal";

// Styles
import style from "./style.module.css";

function Home() {
  const [modal, setModal] = useState<React.ReactNode | null>(null);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <div className={style.home}>
        <div className={style.container}>
          {modal ? modal : null}
          <Header />
          <Folders />
        </div>
      </div>
    </ModalContext.Provider>
  );
}

export default Home;

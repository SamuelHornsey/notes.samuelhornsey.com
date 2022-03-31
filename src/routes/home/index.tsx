import React from "react";

import Folders from "../../components/folders";

import style from "./style.module.css";

function Home() {
  return (
    <div className={style.home}>
      <div className={style.container}>
        <Folders />
      </div>
    </div>
  )
}

export default Home;
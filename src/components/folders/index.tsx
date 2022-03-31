import React, { useState } from "react";

import style from "./style.module.css";

export default function Folders() {
  const [folders, setFolders] = useState(['Folder 1', 'Folder 2', 'Folder 3']);

  return (
    <div>
      <div className={style.controls}>
        <div className={style.title}>My Folders</div>
        <a className={style.new} href="#">
          NEW...!
        </a>
      </div>

      <div className={style.folders}>
        <ul>
          {
            folders.map(folder => (<li>{folder}</li>))
          }
        </ul>
      </div>
    </div>
  );
}

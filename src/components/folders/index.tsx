import React, { useState, useEffect, useContext } from "react";

// Components
import Notes from "../notes";
import InputEdit from "../input-edit";
import Folder from "../folder";
import WarningModal from "../warning-modal";

// Types
import { IfcFolder, IfcUser } from "../../types/interfaces";

// Services
import UserContext from "../../services/user";
import ModalContext from "../../context/modal";
import {
  subscribeFolders,
  deleteFolder,
  updateFolder,
} from "../../services/folders";

// Styles
import style from "./style.module.css";

export default function Folders() {
  const user = useContext(UserContext) as IfcUser;
  const { setModal } = useContext(ModalContext);
  const [folders, setFolders] = useState<Array<IfcFolder>>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [index, setIndex] = useState<number | null>();

  useEffect(() => {
    const unsubscribe = subscribeFolders(
      `notes/${user.uid}/folders`,
      (folders: Array<IfcFolder>) => {
        setFolders(folders);
      }
    );

    return unsubscribe;
  }, [user]);

  // Toggle open folder
  const toggle = (i: number) => {
    if (i === open) {
      setOpen(null);
    } else {
      setOpen(i);
    }
  };

  const onEdit = (index: number) => {
    setIndex(index);
  };

  const confirmDelete = (id: string) => {
    deleteFolder(`notes/${user.uid}/folders/${id}`).then(() => setModal(null));
  };

  const cancelDelete = () => {
    setModal(null);
  };

  const onDelete = (id: string) => {
    setModal(
      <WarningModal
        handleConfirm={() => confirmDelete(id)}
        handleCancel={() => cancelDelete()}
      />
    );
  };

  const onUpdate = (name: string) => {
    if (!index) return;

    updateFolder(`notes/${user.uid}/folders/${folders[index].folderId}`, {
      name,
    }).then(() => setIndex(null));
  };

  return (
    <div className={style.folders}>
      {folders.length > 0 ? (
        folders.map((folder, i) =>
          i === index ? (
            <InputEdit key={i} onSubmit={onUpdate} value={folder.name} />
          ) : (
            <Folder
              folderId={folder.folderId}
              index={i}
              key={i}
              name={folder.name}
              open={open === i ? true : false}
              handleClick={toggle}
              handleDelete={onDelete}
              handleEdit={onEdit}
              notes={<Notes folder={folder.folderId} />}
            />
          )
        )
      ) : (
        <h4 className={style.empty}>There are no notes here...</h4>
      )}
    </div>
  );
}

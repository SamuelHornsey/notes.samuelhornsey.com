import React, { useState, useEffect, useContext } from "react";
import {
  getDocs,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

// Components
import Folder from "../folder";

// Types
import { IfcFolder } from "../../types/interfaces";

// Services
import { db } from "../../services/firebase";
import UserContext from "../../services/user";

// Styles
import style from "./style.module.css";

export default function Folders() {
  const user = useContext(UserContext);
  const [folders, setFolders] = useState<Array<IfcFolder>>([]);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const { uid } = { ...user };

    // Load initial folders
    const loadNotes = async () => {
      const folders: Array<IfcFolder> = [];
      const docs = await getDocs(
        query(collection(db, `notes/${uid}/folders`), orderBy("timestamp"))
      );

      docs.forEach((doc) => {
        const { name, timestamp } = doc.data();
        folders.push({
          uuid: doc.id,
          timestamp,
          name,
        });
      });

      setFolders(folders);
    };

    // Subscribe to updates to list of folders
    const unsubscribe = onSnapshot(
      query(collection(db, `notes/${uid}/folders`), orderBy("timestamp")),
      (docs) => {
        const folders: Array<IfcFolder> = [];

        docs.forEach((doc) => {
          const { name, timestamp } = doc.data();
          folders.push({
            uuid: doc.id,
            timestamp: timestamp,
            name,
          });
        });

        setFolders(folders);
      }
    );

    // Run load notes
    loadNotes();

    return unsubscribe;
  }, [user]);

  // Toggle open folder
  const toggle = (i: number) => {
    if (i === index) {
      setIndex(null);
    } else {
      setIndex(i);
    }
  };

  return (
    <div className={style.folders}>
      {folders.map((folder, i) => (
        <Folder
          uuid={folder.uuid}
          index={i}
          key={i}
          name={folder.name}
          open={index === i ? true : false}
          onClick={toggle}
        />
      ))}
    </div>
  );
}

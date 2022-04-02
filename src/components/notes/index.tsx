import React, { useState, useEffect, useContext } from "react";
import {
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Components
import Note from "../note";
import InputEdit from "../input-edit";

// Types
import { IfcNote } from "../../types/interfaces";

// Services
import { db } from "../../services/firebase";
import UserContext from "../../services/user";

// Styles
import style from "./style.module.css";

interface Props {
  folder: string;
}

export default function Notes(props: Props) {
  /**
   * @TODO useReducer
   */
  const user = useContext(UserContext);
  const [notes, setNotes] = useState<Array<IfcNote>>([]);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    const { uid } = { ...user };

    const loadDocs = async () => {
      const notes: Array<IfcNote> = [];
      const docs = await getDocs(
        query(
          collection(db, `notes/${uid}/folders/${props.folder}/notes`),
          orderBy("timestamp")
        )
      );

      docs.forEach((doc) => {
        const { name, timestamp } = doc.data();
        notes.push({
          uuid: doc.id,
          name,
          timestamp,
          content: "",
        });
      });

      setNotes(notes);
    };

    onSnapshot(
      query(
        collection(db, `notes/${uid}/folders/${props.folder}/notes`),
        orderBy("timestamp")
      ),
      (docs) => {
        const notes: Array<IfcNote> = [];

        docs.forEach((doc) => {
          const { name, timestamp } = doc.data();
          notes.push({
            uuid: doc.id,
            name,
            timestamp,
            content: "",
          });
        });

        setNotes(notes);
      }
    );

    loadDocs();
  }, []);

  const saveNote = async (value: string) => {
    if (value === "") {
      setEdit(false);
      return;
    }

    const { uid } = { ...user };
    await addDoc(collection(db, `notes/${uid}/folders/${props.folder}/notes`), {
      name: value,
      timestamp: serverTimestamp(),
      content: "",
    });

    setEdit(false);
  };

  const onClick = () => {
    setEdit(true);
  };

  return (
    <div className={style.notes}>
      {notes.map((note, i) => (
        <Note key={i} uuid={note.uuid} name={note.name} folder={props.folder} />
      ))}

      {edit ? (
        <InputEdit onSubmit={saveNote} />
      ) : (
        <button onClick={onClick} className={style.new}>
          New...
        </button>
      )}
    </div>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";

// Components
import Note from "../note";
import InputEdit from "../input-edit";

// Types
import { IfcNote } from "../../types/interfaces";

// Services
import UserContext from "../../services/user";
import { subscribeNotes, createNote, deletNote, updateNote } from "../../services/notes";

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
  const [index, setIndex] = useState<number | null>();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeNotes(
      user.uid,
      props.folder,
      (notes: Array<IfcNote>) => {
        setNotes(notes);
      }
    );

    return unsubscribe;
  }, []);

  const saveNote = (name: string) => {
    if (name === "") {
      setEdit(false);
      return;
    }

    if (!user) return;

    createNote(user.uid, props.folder, { name }).then(() => setEdit(false));
  };

  const deleteNote = (id: string) => {
    if (!user) return;

    deletNote(user.uid, props.folder, id);
  };

  const onClick = () => {
    setEdit(true);
  };

  const editNote = (index: number) => {
    setIndex(index);
  };

  const onUpdate = (name: string) => {
    if (index == null || !user) {
      setIndex(null);
      return;
    }

    updateNote(user.uid, props.folder, notes[index].uuid, { name })
      .then(() => setIndex(null));
  };

  return (
    <div className={style.notes}>
      {notes.map((note, i) =>
        i === index ? (
          <InputEdit key={i} onSubmit={onUpdate} value={note.name} />
        ) : (
          <Note
            key={i}
            index={i}
            deleteNote={deleteNote}
            editNote={editNote}
            uuid={note.uuid}
            name={note.name}
            folder={props.folder}
          />
        )
      )}

      {edit ? (
        <InputEdit value={""} placeholder={"New Note Name"} onSubmit={saveNote} />
      ) : (
        <button onClick={onClick} className={style.new}>
          New...
        </button>
      )}
    </div>
  );
}

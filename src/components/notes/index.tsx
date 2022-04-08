import React, { useState, useEffect, useContext } from "react";

// Components
import Note from "../note";
import InputEdit from "../input-edit";

// Types
import { IfcNote, IfcUser } from "../../types/interfaces";

// Services
import UserContext from "../../services/user";
import {
  subscribeNotes,
  createNote,
  deleteNote,
  updateNote,
} from "../../services/notes";

// Styles
import style from "./style.module.css";

interface Props {
  folder: string;
}

export default function Notes(props: Props) {
  /**
   * @TODO useReducer
   */
  const user = useContext(UserContext) as IfcUser;
  const [notes, setNotes] = useState<Array<IfcNote>>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [index, setIndex] = useState<number | null>();

  useEffect(() => {
    const unsubscribe = subscribeNotes(
      `notes/${user.uid}/folders/${props.folder}/notes`,
      (notes: Array<IfcNote>) => {
        setNotes(notes);
      }
    );

    return unsubscribe;
  }, [user.uid, props.folder]);

  const saveNote = (name: string) => {
    if (name === "") {
      setEdit(false);
      return;
    }

    createNote(`notes/${user.uid}/folders/${props.folder}/notes`, {
      name,
    }).then(() => setEdit(false));
  };

  const delNote = (id: string) => {
    deleteNote(`notes/${user.uid}/folders/${props.folder}/notes/${id}`);
  };

  const onClick = () => {
    setEdit(true);
  };

  const editNote = (index: number) => {
    setIndex(index);
  };

  const onUpdate = (name: string) => {
    if (index == null) {
      setIndex(null);
      return;
    }

    updateNote(
      `/notes/${user.uid}/folders/${props.folder}/notes/${notes[index].uuid}`,
      { name }
    ).then(() => setIndex(null));
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
            deleteNote={delNote}
            editNote={editNote}
            uuid={note.uuid}
            name={note.name}
            folder={props.folder}
          />
        )
      )}

      {edit ? (
        <InputEdit
          value={""}
          placeholder={"New Note Name"}
          onSubmit={saveNote}
        />
      ) : (
        <button onClick={onClick} className={style.new}>
          New...
        </button>
      )}
    </div>
  );
}

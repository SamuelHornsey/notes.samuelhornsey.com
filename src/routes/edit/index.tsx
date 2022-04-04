import React, { useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import debounce from 'lodash.debounce';

// Components
import Button from "../../components/button";
import Markdown from "../../components/markdown";
import Editor from "../../components/editor";

// Services
import UserContext from "../../services/user";
import { db } from "../../services/firebase";

// Styles
import style from "./style.module.css";

function Edit() {
  // TODO: use reducer
  const params = useParams();
  const user = useContext(UserContext);
  const [content, setContent] = useState<string>("");
  const [preview, setPreview] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    // Load note doc
    const loadNote = async () => {
      const { uid } = { ...user };
      const note = await getDoc(
        doc(db, `/notes/${uid}/folders/${params.folder}/notes/${params.note}`)
      );

      const data = note.data();

      if (!data) return;

      setContent(data.content);
    };

    // Note note
    loadNote();
  }, []);

  // Save note to db
  const save = (value: string) => {
    const { uid } = { ...user };
    updateDoc(
      doc(db, `/notes/${uid}/folders/${params.folder}/notes/${params.note}`),
      { content: value }
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const debounceSave = useCallback(
    debounce((value) => save(value), 500),
    []
  );

  const togglePreview = () => {
    setPreview(true);
  };

  const toggleEdit = () => {
    setPreview(false);
  };

  const onChange = (value: string) => {
    setContent(value);
    debounceSave(value);
  };

  return (
    <div className={style.edit}>
      <div className={style.container}>
        <div className={style.buttons}>
          <Button text="Edit" onClick={toggleEdit} />
          <Button text="PREVIEW" onClick={togglePreview} />

          <span className={saved ? `${style.saved} ${style.show}` : style.saved}>Saved!... ✓</span>
        </div>
        {preview ? (
          <Markdown content={content} />
        ) : (
          <Editor content={content} onChange={onChange} />
        )}
      </div>
    </div>
  );
}

export default Edit;

import React, { useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import { marked } from "marked";

import Button from "../../components/button";

import UserContext from "../../services/user";
import { db } from "../../services/firebase";

import style from "./style.module.css";

function Edit() {
  const params = useParams();
  const user = useContext(UserContext);
  const [content, setContent] = useState<string>("");
  const [preview, setPreview] = useState<boolean>(false);

  const debounceHandler = (func: Function) => {
    let timer: ReturnType<typeof setTimeout> | null;

    return (...args: any) => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        timer = null;
        func.apply(func, args);
      }, 3000);
    };
  };

  const save = (value: string) => {
    const { uid } = { ...user };
    updateDoc(
      doc(db, `/notes/${uid}/folders/${params.folder}/notes/${params.note}`),
      { content: value }
    );
  };

  const debounce = useCallback(debounceHandler(save), []);

  useEffect(() => {
    const loadNotes = async () => {
      const { uid } = { ...user };
      const note = await getDoc(
        doc(db, `/notes/${uid}/folders/${params.folder}/notes/${params.note}`)
      );

      const data = note.data();

      if (!data) {
        return;
      }

      setContent(data.content);
    };

    loadNotes();
  }, []);

  useEffect(() => {
    return () => {
      save(content);
    };
  });

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    debounce(e.target.value);
  };

  const togglePreview = () => {
    setPreview(true);
  };

  const toggleEdit = () => {
    setPreview(false);
  };

  return (
    <div className={style.edit}>
      <div className={style.container}>
        <div className={style.buttons}>
          <Button text="Edit" onClick={toggleEdit} />
          <Button text="PREVIEW" onClick={togglePreview} />

          <span className={style.saved}>Saved!... ✓</span>
        </div>
        {preview ? (
          <div
            className={style.preview}
            dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
          ></div>
        ) : (
          <textarea
            placeholder="Your text here..."
            className={style.textarea}
            onChange={onChange}
            value={content}
          ></textarea>
        )}
      </div>
    </div>
  );
}

export default Edit;

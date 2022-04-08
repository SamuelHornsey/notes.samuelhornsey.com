import React, { useContext, useState, useEffect, useMemo } from "react";
import { useParams, Params } from "react-router-dom";
import debounce from 'lodash.debounce';

// Components
import Button from "../../components/button";
import Markdown from "../../components/markdown";
import Editor from "../../components/editor";

// Services
import UserContext from "../../services/user";
import { getNote, updateNote } from "../../services/notes";
import { IfcUser } from "../../types/interfaces";

// Styles
import style from "./style.module.css";

interface IfcQueryParam extends Params {
  folder: string;
  note: string;
}

function Edit() {
  // @TODO use reducer
  const { folder, note } = useParams() as IfcQueryParam;
  const user = useContext(UserContext) as IfcUser;

  // State
  const [content, setContent] = useState<string>("");
  const [preview, setPreview] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {    
    getNote(`/notes/${user.uid}/folders/${folder}/notes/${note}`)
      .then(note => setContent(note.content));
  }, [user.uid, folder, note]);

  const save = useMemo(
    () => (content: string) => {
      updateNote(`/notes/${user.uid}/folders/${folder}/notes/${note}`, { content })
      .then(() => {
        setSaved(true);

        setTimeout(() => {
          setSaved(false);
        }, 2000);
      });
    },
    [folder, note, user.uid]
  )

  const debounceSave = useMemo(
    () => debounce((value) => save(value), 500),
    [save]
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

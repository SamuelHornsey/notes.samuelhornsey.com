import React, { useState, useEffect } from "react";

import style from "./style.module.css";

interface Props {
  onChange: Function;
  content: string;
}

export default function Editor(props: Props) {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    setValue(props.content);
  }, [props.content]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange(e.target.value);
  }

  return (
    <textarea
      placeholder="Your text here..."
      className={style.textarea}
      value={value}
      onChange={onChange}
    ></textarea>
  );
}

import React, { useState, useEffect } from "react";

interface Props {
  text: string;
}

export default function Editor(props: Props) {
  const [text, setText] = useState<string>(props.text);

  useEffect(() => {
    setText(props.text);
  }, [props.text])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }
  
  return (
    <textarea onChange={onChange} value={text}>
    </textarea>
  )
}
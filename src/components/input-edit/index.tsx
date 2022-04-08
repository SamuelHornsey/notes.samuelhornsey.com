import React, { useState, useRef } from "react";

// Styles
import style from "./style.module.css";

// Props types
interface Props {
  onSubmit: Function;
  value: string;
  placeholder?: string; 
}

export default function InputEdit(props: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>(props.value);
  
  /**
   * When user removes focus from
   * inpute element
   */
  const onBlur = () => {
    props.onSubmit(value);
  }

  // change event handler.
  // Save vale to state
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Check if users presses enter
  // and remove their focus from input
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      input.current?.blur();
    }
  };

  return (
    <input
      autoFocus
      className={style.input}
      ref={input}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onKeyUp={onKeyUp}
      placeholder={props.placeholder}
    ></input>
  );
}

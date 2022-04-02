import React, { useState, useEffect } from "react";

// Components
import Button from "../button";

// Styles
import style from "./style.module.css";

// Props types
interface Props {
  toggle: Function;
  onSubmit: Function;
}

export default function Modal(props: Props) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    // Hanlder for user pressing
    // esc key to leave modal
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggle();
      }

      if (e.key === 'Enter') {
        props.onSubmit(value);
        toggle();
      }
    };
    
    window.addEventListener("keyup", handler);

    // Remove handler
    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, [value]);

  // toggle handler
  const toggle = () => {
    props.toggle();
  };

  // on text field change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // handle submit
  const onClick = () => {
    props.onSubmit(value);
  };

  return (
    <div className={style.modal}>
      <div className={style.container}>
        <div>
          <input
            className={style.input}
            placeholder="New folder name..."
            value={value}
            onChange={onChange}
          ></input>
        </div>
        <div className={style.buttons}>
          <Button onClick={onClick} text={"submit."}></Button>
          <Button onClick={toggle} text={"LEAVE!"}></Button>
        </div>
      </div>
    </div>
  );
}

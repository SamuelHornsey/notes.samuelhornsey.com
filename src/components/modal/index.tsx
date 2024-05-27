import React, { useEffect, useContext } from "react";

import ModalContext from "../../context/modal";

// Styles
import style from "./style.module.css";

// Props types
interface Props {
  children: React.ReactNode;
}

export default function Modal({ children }: Props) {
  const { setModal } = useContext(ModalContext);

  useEffect(() => {
    // Hanlder for user pressing
    // esc key to leave modal

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(null);
      }
    };

    window.addEventListener("keyup", handler);

    // Remove handler
    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, [setModal]);

  return (
    <div className={style.modal}>
      <div className={style.container}>{children}</div>
    </div>
  );
}

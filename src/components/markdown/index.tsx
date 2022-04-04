import React from "react";
import { marked } from "marked";

import style from "./style.module.css";

interface Props {
  content: string;
}

export default function Markdown(props: Props) {
  return (
    <div
      className={style.markdown}
      dangerouslySetInnerHTML={{ __html: marked.parse(props.content) }}
    ></div>
  );
}

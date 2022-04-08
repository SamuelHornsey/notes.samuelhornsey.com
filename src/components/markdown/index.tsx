import React from "react";
import { marked } from "marked";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
 
import style from "./style.module.css";

interface Props {
  content: string;
}

marked.setOptions({
  highlight: function(code, lang) {
    return hljs.highlight(lang, code).value;
  }
});

export default function Markdown(props: Props) {
  return (
    <div
      className={style.markdown}
      dangerouslySetInnerHTML={{ __html: marked.parse(props.content) }}
    ></div>
  );
}

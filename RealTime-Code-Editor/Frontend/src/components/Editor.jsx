import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { python } from "@codemirror/lang-python";

const Editor = () => {
  const [code, setCode] = useState("// Write your code here\n");
  return (
    <CodeMirror
      className="realtimeEditor"
      value={code}
      height="400px"
      extensions={[javascript({ jsx: true }), python(), html()]}
      onChange={(value) => setCode(value)}
      theme="dark"
    />
  );
};

export default Editor;

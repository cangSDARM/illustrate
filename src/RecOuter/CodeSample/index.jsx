import clsx from "clsx";
import React from "react";
import classes from "./style.module.css";

const CodeSample = ({ code = "" }) => {
  const [show, setShow] = React.useState(false);

  return (
    <span className={clsx(classes["sample"], show && classes["show"])}>
      <button className={classes["show-code"]} onClick={() => setShow(!show)}>
        {show ? "隐藏" : "展示"}代码
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </span>
  );
};

export default CodeSample;

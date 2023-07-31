import React from "react";
import classes from "./style.module.css";
import { renderExplanations } from "../utils";

const FlexContainer = ({ Right, children }) => {
  return (
    <div className={classes["container"]}>
      <div>{renderExplanations(children)}</div>
      <div>{renderExplanations(Right, 0, { defaultTag: "div" })}</div>
    </div>
  );
};

export default FlexContainer;

import React from "react";
import classes from "./style.module.css";
import { renderExplanations } from "../utils";

const FlexContainer = ({ Right, RightProps = {}, children, ...props }) => {
  return (
    <div className={classes["container"]} {...props}>
      <div>{children}</div>
      <div {...RightProps}>
        {renderExplanations(Right, 0, { defaultTag: "div" })}
      </div>
    </div>
  );
};

export default FlexContainer;

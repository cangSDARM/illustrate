import React from "react";
import clsx from "clsx";
import classes from "./style.module.css";
import { renderExplanations } from "../utils";
import { useAnnotationContext } from "./context";

export const AnnotationToggler = () => {
  const { folding, setFolding } = useAnnotationContext();

  return (
    <button
      className={classes["annotate-toggle"]}
      onClick={() => setFolding(!folding)}
    >
      {folding ? "展开注释" : "折叠注释"}
    </button>
  );
};

const Annotations = ({ type, data }) => {
  const { folding } = useAnnotationContext();

  return (
    <>
      <span className={classes[type]}>
        {data.map((item, idx) => {
          // item is not modifiable
          const [label, ...restItem] = item;
          const explanations = restItem.pop();

          return (
            <span
              className={clsx(
                classes["string"],
                !folding && classes["annotate"]
              )}
              key={idx}
            >
              <span key="label">{label}</span>
              {restItem.map((info, i) => (
                <span key={info.content} {...(info.props || {})}>
                  {info.content}
                </span>
              ))}
              <span
                className={clsx(
                  classes["explanation"],
                  !folding && classes["explanation-expanded"]
                )}
                key="last"
              >
                {renderExplanations([
                  { Tag: "h4", content: label },
                  ...explanations,
                ])}
              </span>
            </span>
          );
        })}
      </span>
    </>
  );
};

export default Annotations;

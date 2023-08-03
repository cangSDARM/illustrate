import React from "react";
import classes from "./style.module.css";
import { renderExplanations } from "../../utils";

const QA = ({ content }) => {
  return (
    <>
      {content.map((child, idx) => {
        const mark = idx === 0 ? "Q:" : idx === 1 ? "A:" : undefined;
        if (mark) {
          return (
            <div key={idx}>
              <span className={classes["qa-mark"]}>{mark}</span>
              {...renderExplanations(
                Array.isArray(child) ? child : [child],
                1,
                {
                  defaultTag: React.Fragment,
                }
              )}
            </div>
          );
        }
      })}
    </>
  );
};

export default QA;

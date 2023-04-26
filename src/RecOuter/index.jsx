import clsx from "clsx";
import React from "react";
import classes from "./style.module.css";
import { AnnotationContextProvider } from "./Annotations/context";
import { useSluggerContext } from "../context/slugger";
import { renderExplanations } from "./utils";

const RecOuter = ({
  types = [],
  id = "",
  label = "",
  illustration,
  explanation,
  json,
}) => {
  const { curSlug, changeCurSlug, getSlug } = useSluggerContext();
  const slug = React.useMemo(() => getSlug(id || label), [id, label]);
  const [labelOriginalSize, setLabelOriginalSize] = React.useState();
  const labelRef = React.useRef();
  const [lazyExplanation, setLazyExplanation] = React.useState();

  return (
    <div className={classes["rec-outer"]}>
      <div
        id={slug}
        className={clsx(
          ...types.map((t) => classes[t]),
          curSlug === slug && classes["selected"]
        )}
        onClick={(e) => {
          const client = { x: e.clientX, y: e.clientY };
          const currentPos = labelRef.current.getBoundingClientRect();
          const rect = {
            width: labelOriginalSize.width,
            height: labelOriginalSize.height,
            x: currentPos.x,
            y: currentPos.y,
          };
          if (client.x > rect.x && client.x - rect.x < rect.width) {
            if (client.y > rect.y && client.y - rect.y < rect.height) {
              const willSelect = currentPos.width >= rect.width;
              if (willSelect) {
                if (!lazyExplanation && typeof json === "function") {
                  json().then(setLazyExplanation);
                }
              }
              changeCurSlug(willSelect ? slug : "");

              // only stop the label's event
              e.stopPropagation();
              e.preventDefault();
            }
          }
        }}
      >
        <div
          className={classes["rec-label"]}
          ref={(ref) => {
            if (ref) {
              !labelOriginalSize &&
                setLabelOriginalSize(ref.getBoundingClientRect());
              labelRef.current = ref;
            }
          }}
        >
          {label}
        </div>
        {illustration && (
          <img
            className={classes["illustration"]}
            src={illustration.src}
            width={illustration.width}
            height={illustration.height}
            alt={illustration.alt}
          />
        )}
        <div className={classes["rec-explanation"]}>
          {!explanation && !lazyExplanation ? (
            <div>Loading...</div>
          ) : (
            <AnnotationContextProvider>
              {renderExplanations(explanation || lazyExplanation)}
            </AnnotationContextProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecOuter;
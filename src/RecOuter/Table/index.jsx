import React from "react";
import { renderExplanations } from "../utils";

const Table = ({ headers, data, dataProps = [], style }) => {
  return (
    <table style={style}>
      {headers && (
        <thead>
          <tr>{renderExplanations(headers, 0, { defaultTag: "th" })}</tr>
        </thead>
      )}
      <tbody>
        {data.map((item, idx) => {
          const content = renderExplanations(item, 0, {
            defaultTag: "td",
          });
          return (
            <tr key={idx}>
              {React.Children.map(content, (child, idx) => {
                const props = dataProps[idx] || {};
                if (child?.type !== "td") {
                  return (
                    <td key={child.key} {...props}>
                      {child}
                    </td>
                  );
                }
                return React.cloneElement(child, props);
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

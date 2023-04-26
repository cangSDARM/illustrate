import React from "react";
import { renderExplanations } from "../utils";

const Table = ({ headers, data }) => {
  return (
    <table>
      <thead>
        <tr>{renderExplanations(headers, 0, { defaultTag: "th" })}</tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>{renderExplanations(item, 0, { defaultTag: "td" })}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

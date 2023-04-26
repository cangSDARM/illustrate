import React from "react";
import classes from "./style.module.css";

const Datagram = ({ label = "", children }) => {
  return (
    <div className={classes["datagram"]}>
      <span className={classes["label"]}>{label}</span>
      {children}
    </div>
  );
};

export default Datagram;

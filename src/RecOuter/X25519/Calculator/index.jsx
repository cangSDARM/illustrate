import React from "react";
import classes from "./style.module.css";
import { startCase } from "./utils";
import SecretKeyMultiplier from "./SecretKeyMultiplier";
import PublicKeyMultiplier from "./PublicKeyMultiplier";
import YCoordinate from "./YCoordinate";

const Calculator = ({ type = "" }) => {
  let calculator;

  if (type === "SecretKeyMultiplier") calculator = <SecretKeyMultiplier />;
  if (type === "PublicKeyMultiplier") calculator = <PublicKeyMultiplier />;
  if (type === "YCoordinate") calculator = <YCoordinate />;

  return (
    <div className={classes["calculator"]}>
      <div style={{ fontWeight: "bold", paddingBottom: "1em" }}>
        {startCase(type)}
      </div>
      {calculator}
    </div>
  );
};

export default Calculator;

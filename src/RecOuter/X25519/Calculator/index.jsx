import React from "react";
import MathBlock from "../../Math";
import classes from "./style.module.css";
import { startCase } from "./utils";
import SecretKeyMultiplier from "./SecretKeyMultiplier";
import PublicKeyMultiplier from "./PublicKeyMultiplier";

const Calculator = ({ type = "" }) => {
  let calculator;

  if (type === "SecretKeyMultiplier") calculator = <SecretKeyMultiplier />;
  if (type === "PublicKeyMultiplier") calculator = <PublicKeyMultiplier />;

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

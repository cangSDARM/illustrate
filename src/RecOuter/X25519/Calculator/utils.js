import React from "react";
import field from "../field";
import curve from "../curve";

export function getHexValue(raw = "", def) {
  if (!raw.startsWith("0x") && raw.match(/^[0-9a-fA-F]+$/)) {
    raw = "0x" + raw;
  }
  if (raw.match(/^0[^x]+$/)) {
    raw = "0x" + raw.substring(1);
  }
  if (raw.match(/^0*$/)) {
    return def;
  }
  try {
    return BigInt(raw);
  } catch {
    return def;
  }
}

function setHexValue(callback = () => {}) {
  return (n = "") => {
    callback(`0x${n.toString(16)}`);
  };
}

export const useHexValue = (init = "0x1") => {
  const [raw, setRaw] = React.useState(init);

  return [raw, getHexValue(raw), setHexValue(setRaw)];
};

export const calcPubkey = (ctx) => {
  let result = "";
  try {
    let n = ctx.privkey;
    if (n) {
      const nn = n % 2n ** 255n;
      if (n !== nn) {
        n = nn;
        console.log("calc", n);
        ctx.setPrivkey(n);
      }
    }
    if (!n) {
      return "N/A";
    }
    let { x, z } = curve.pointMult(9n, n);
    let pubkey = curve.X(x, z);
    result = `0x${field.toHex(pubkey, 256)}`;
  } catch (e) {
    result = `Error: ${e}`;
  }

  return result;
};

export const calcMulti = (ctx) => {
  let result = "N/A";
  try {
    let n = ctx.privkey;
    let point = ctx.pubkey;
    if (!n || !point) {
      return result;
    }
    n %= 2n ** 255n;
    point %= field.p;
    let { x, z } = curve.pointMult(point, n);
    let X = curve.X(x, z);
    result = `0x${field.toHex(X, 256)}`;
  } catch (e) {
    result = `Error: ${e}`;
  }

  return result;
};

export const calcY = (ctx) => {
  let y1result = "";
  let y2result = "";
  try {
    y1result = "N/A";
    y2result = "N/A";
    let x = ctx.x;
    x %= field.p;
    let [y1, y2] = curve.Y(x);
    y1result = `0x${field.toHex(y1)}`;
    y2result = `0x${field.toHex(y2)}`;
  } catch (e) {
    if (e instanceof RangeError) {
      y1result = y2result = `x=0x${field.toHex(ctx.x)} 的点不在曲线上`;
    } else {
      y1result = e.message;
      y2result = e.message;
    }
  }

  return [y1result, y2result];
};

export const startCase = (str = "") => {
  return str.replace(/(?:[A-Z]|\s+[a-zA-Z])\w+?/g, ($1) => " " + $1).trim();
};

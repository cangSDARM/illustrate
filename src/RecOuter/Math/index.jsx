import React from "react";
import classes from "./style.module.css";

const Types = {
  Normal: 0,
  NumericalLeading: 1,
  SingleAlphabetOrNumericalLeading: 3,
};

const Tokens = {
  sup: "^",
  sub: "_",
};

const TokensRMap = Object.keys(Tokens).reduce(
  (acc, curK) => ({ ...acc, [Tokens[curK]]: curK }),
  {}
);

const resolver = (equation) => {
  if (typeof equation !== "string") return equation;

  const shiftable = (str = "") => {
    const totalLen = str.length;
    let curIdx = 0;

    return {
      shift: (sfLen = 1) => {
        if (sfLen <= 0) throw RangeError("out of shift range: " + sfLen);

        const ender = Math.min(curIdx + sfLen, totalLen);
        if (curIdx < totalLen) {
          const result = str.slice(curIdx, ender);
          curIdx = ender;
          return result;
        }
        return undefined;
      },
      rest: () => {
        if (curIdx >= totalLen) return undefined;
        return str.slice(curIdx);
      },
      shiftIndex: () => curIdx,
    };
  };

  const typeTracker = (initType = Types.Normal) => {
    let types = [initType];

    return {
      nextType: (type) => types.push(type),
      handledType: () => {
        if (!types.pop()) {
          types = [initType];
        }
      },
      curType: () => types[Math.max(types.length - 1, 0)],
      priorType: () =>
        types.length - 2 > 0 ? types[types.length - 2] : undefined,
    };
  };

  let result = [],
    curChar = "x",
    pendingContent = [],
    Token = undefined;

  const { shift, shiftIndex, rest } = shiftable(equation);
  const { nextType, curType, handledType, priorType } = typeTracker(
    Types.Normal
  );

  const getNumerical = (str = "") => {
    const numerical = str.match(/^-?\d+/i)?.[0];

    return numerical;
  };

  const isAlphabet = (str = "") => {
    const numerical = str.match(/^[a-zA-Z]+/i)?.[0];

    return !!numerical;
  };

  const pendingContentToResult = (Token = "span") => {
    const joint = pendingContent.join("");
    pendingContent = [];
    if (joint) result.push(<Token key={shiftIndex()}>{joint}</Token>);
  };

  const NumericalLeadingHandler = () => {
    const numerical = getNumerical(curChar + rest());
    if (numerical) {
      if (numerical.length > 1) shift(numerical.length - 1);
      pendingContent.push(numerical);
      pendingContentToResult(Token);
    } else {
      result.push(curChar);
    }
    handledType();
  };

  while (true) {
    curChar = shift();

    if (curChar === undefined) {
      pendingContentToResult(Token);
      break;
    }

    switch (curType()) {
      case Types.NumericalLeading:
        NumericalLeadingHandler();
        break;
      case Types.SingleAlphabetOrNumericalLeading: {
        const alphabet = isAlphabet(curChar);
        if (alphabet) {
          pendingContent.push(curChar);
          pendingContentToResult(Token);
          handledType();
        } else {
          NumericalLeadingHandler();
        }
        break;
      }
      case Types.Normal:
        switch (curChar) {
          case Tokens.sup:
          case Tokens.sub:
            nextType(Types.SingleAlphabetOrNumericalLeading);
            pendingContent = [];
            Token = TokensRMap[curChar];
            break;
          default:
            result.push(curChar);
        }
        break;
    }
  }

  // combine strings
  return result.reduce((acc, cur) => {
    const previous = acc[acc.length - 1];
    if (typeof previous === "string" && typeof cur === "string") {
      return [...acc.slice(0, Math.max(acc.length - 1, 0)), previous + cur];
    }
    return [...acc, cur];
  }, []);
};

const MathBlock = ({ children = "" }) => {
  return <span className={classes["math"]}>{resolver(children)}</span>;
};

export default MathBlock;

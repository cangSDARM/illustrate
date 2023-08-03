import React, { useState } from "react";
import { useHexValue, calcY, getHexValue } from "./utils";
import MathBlock from "../../Math";

const YCoordinate = () => {
  const [displayX, x, setX] = useHexValue("0x0");
  const [yResults, setYResults] = useState(["", ""]);

  React.useEffect(() => {
    setYResults(calcY({ x }));
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <label htmlFor="xy-x">
              <MathBlock>x</MathBlock>:
            </label>
          </td>
          <td>
            <input
              id="xy-x"
              type="text"
              data-deco="hex-ify"
              value={displayX}
              onInput={(e) => {
                const hex = getHexValue(e.target.value);
                setX(hex || 0n);
                setYResults(calcY({ x: hex }));
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="xy-y1">
              <MathBlock>y_1</MathBlock>:
            </label>
          </td>
          <td>
            <input id="xy-y1" type="text" value={yResults[0]} readOnly />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="xy-y2">
              <MathBlock>y_2</MathBlock>:
            </label>
          </td>
          <td>
            <input id="xy-y2" type="text" value={yResults[1]} readOnly />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default YCoordinate;

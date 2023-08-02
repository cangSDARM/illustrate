import React from "react";
import classes from "./style.module.css";
import { useHexValue, calcMulti, getHexValue } from "./utils";

const PublicKeyMultiplier = () => {
  const [displayPrivkey, privkey, setPrivkey] = useHexValue("");
  const [displayPubkey, pubkey, setPubkey] = useHexValue("");
  const [result, setResult] = React.useState("");

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <label htmlFor="mult-n">secret key (n):</label>
          </td>
          <td>
            <input
              id="mult-n"
              type="text"
              data-deco="hex-ify"
              placeholder="multiplier"
              value={displayPrivkey}
              onInput={(e) => {
                const hex = getHexValue(e.target.value);
                setPrivkey(hex || 0n);
                setResult(calcMulti({ privkey: hex, pubkey }));
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="mult-point">public key (Q):</label>
          </td>
          <td>
            <input
              id="mult-point"
              type="text"
              data-deco="hex-ify"
              placeholder="point"
              value={displayPubkey}
              onInput={(e) => {
                const hex = getHexValue(e.target.value);
                setPubkey(hex || 0n);
                setResult(calcMulti({ privkey, pubkey: hex }));
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="mult-result">new point (nQ):</label>
          </td>
          <td>
            <input
              id="mult-result"
              type="text"
              placeholder="result"
              readOnly
              value={result}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PublicKeyMultiplier;

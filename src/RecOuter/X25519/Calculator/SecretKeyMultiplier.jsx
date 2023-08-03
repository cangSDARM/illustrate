import React from "react";
import classes from "./style.module.css";
import { useHexValue, calcPubkey, getHexValue } from "./utils";

const plusOne = (privkey = 0n) => privkey + 1n;
const double = (privkey) => (privkey ? privkey * 2n : 1n);
const clamp = (privkey = 0n) => {
  let n = privkey;
  n %= 2n ** 255n;
  n &= 2n ** 255n - 8n;
  n |= 1n << 254n;

  return n;
};

const SecretKeyMultiplier = () => {
  const [displayPrivkey, privkey, setPrivkey] = useHexValue("0x1");
  const [result, setResult] = React.useState("");

  React.useEffect(() => {
    setResult(calcPubkey({ privkey, setPrivkey }));
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <td></td>
          <td style={{ textAlign: "right" }}>
            <button
              type="button"
              id="pubkey-plus-one"
              onClick={() => {
                const newPrivkey = plusOne(privkey);
                setPrivkey(newPrivkey);
                setResult(calcPubkey({ privkey: newPrivkey, setPrivkey }));
              }}
            >
              +1
            </button>
            <button
              type="button"
              id="pubkey-double"
              onClick={() => {
                const newPrivkey = double(privkey);
                setPrivkey(newPrivkey);
                setResult(calcPubkey({ privkey: newPrivkey, setPrivkey }));
              }}
            >
              x2
            </button>
            <button
              type="button"
              id="pubkey-clamp"
              onClick={() => {
                const newPrivkey = clamp(privkey);
                setPrivkey(newPrivkey);
                setResult(calcPubkey({ privkey: newPrivkey, setPrivkey }));
              }}
            >
              Clamp
            </button>
            <span
              className={classes["help-tip"]}
              data-tooltip-text="箝位(Clamp)：设置曲线安全所必需的 5 位，详细说明见下面的 Q&A 章节。"
            >
              ?
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="pubkey-privkey">secret key (n):</label>
          </td>
          <td>
            <input
              id="pubkey-privkey"
              type="text"
              data-deco="hex-ify"
              value={displayPrivkey}
              onInput={(e) => {
                const hex = getHexValue(e.target.value);
                setPrivkey(hex || 0n);
                setResult(
                  calcPubkey({
                    privkey: hex,
                    setPrivkey,
                  })
                );
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="pubkey-result">public key (nP):</label>
          </td>
          <td>
            <input id="pubkey-result" type="text" value={result} readOnly />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SecretKeyMultiplier;

import React from "react";

const Footer = ({ desc, mother, references }) => {
  return (
    <>
      <div>
        <p
          style={{ textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      </div>
      <div>
        <p style={{ textAlign: "center" }}>
          原作者{" "}
          <a href="https://twitter.com/xargsnotbombs" target="_blank">
            (Twitter)@XargsNotBombs
          </a>
          ,{" "}
          <a href={mother} target="_blank">
            {mother}
          </a>
        </p>
      </div>
      <div>
        <p style={{ textAlign: "center" }}>
          译者{" "}
          <a href="https://github.com/cangSDARM" target="_blank">
            (Github)@AllenLee
          </a>
          , 源代码托管在{" "}
          <a href="https://github.com/cangSDARM/illustrate/" target="_blank">
            https://github.com/cangSDARM/illustrate/
          </a>
        </p>
      </div>
      {references && (
        <div>
          <dl
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "80vw",
              margin: "0 auto",
            }}
          >
            <span style={{ alignSelf: "start" }}>参考：</span>
            {references.map((ref) => (
              <li key={ref.title}>
                {ref.title}：<a href={ref.href}>{ref.href}</a>
                {ref.quote}
              </li>
            ))}
          </dl>
        </div>
      )}
    </>
  );
};

export default Footer;

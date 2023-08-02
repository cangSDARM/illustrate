const data = {
  intro: {
    title: "图解 X25519 密钥交换算法",
    subtitle: "",
  },
  sections: [
    {
      type: "RecOuter",
      tags: ["server", "stem"],
      label: "总览",
      eagerLoad: true,
      json: () => import("./overview.json"),
    },
    {
      type: "RecOuter",
      tags: ["server", "stem"],
      label: "椭圆曲线",
      eagerLoad: true,
      json: () => import("./mathOnTheCurve.json"),
    },
    {
      type: "RecOuter",
      tags: ["server", "stem"],
      label: "上手试一试",
      eagerLoad: true,
      json: () => import("./handsOn.json"),
    },
  ],
  ending: {
    mother: "https://x25519.xargs.org/",
    references: [
      {
        title: "TLS Parameters",
        href: "https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml",
      },
    ],
  },
};

export default data;

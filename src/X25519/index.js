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
    {
      type: "RecOuter",
      tags: ["server", "stem"],
      label: "Q & A",
      eagerLoad: true,
      json: () => import("./q&a.json"),
    },
  ],
  ending: {
    mother: "https://x25519.xargs.org/",
    references: [
      {
        title: "各种椭圆曲线的比较",
        href: "https://safecurves.cr.yp.to/",
      },
      {
        title: "深入理解 X25519 (PDF, 中文)",
        href: "https://crypto-in-action.github.io/intro-ed25519/190902-intro-x25519.pdf",
      },
    ],
  },
};

export default data;

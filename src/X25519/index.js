const data = {
  intro: {
    title: "图解 X25519 密钥交换算法",
    subtitle: "",
    desc: "",
    intro: "",
  },
  sections: [
    {
      type: "RecOuter",
      tags: ["server", "stem"],
      label: "总览",
      eagerLoad: true,
      json: () => import("./overview.json"),
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

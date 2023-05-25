const data = {
  intro: {
    title: "图解 TLS 1.3 连接",
    subtitle: "对每一个字节的解释和再现",
    intro:
      '在这个演示中，客户端通过 TLS 1.3 加密协商连接服务器。客户端发送"ping"、接收"pong"后终止连接。点击下面开始探索。',
  },
  sections: [
    {
      type: "RecOuter",
      tags: ["calculation", "client"],
      label: "客户端准备密钥交换",
      illustration: {
        src: "https://quic.xargs.org/images/key6.png",
        width: "105",
        height: "250",
      },
      json: () => import("./clientKeyExchangeGeneration.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "client"],
      label: "ClientHello",
      illustration: {
        src: "https://quic.xargs.org/images/key1.png",
        width: "135",
        height: "250",
      },
      json: () => import("./clientHello.json"),
    },
  ],
  ending: {
    mother: "https://tls13.xargs.org/",
    references: [
      {
        title: "TLS Parameters",
        href: "https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml",
      },
      {
        title: "OpenSSL 邮件列表: 如何在 ClientHello 中关闭 EC Point Formats",
        href: "https://mta.openssl.org/pipermail/openssl-users/2019-November/011572.html",
      },
    ],
  },
};

export default data;

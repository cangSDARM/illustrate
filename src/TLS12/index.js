const data = {
  intro: {
    title: "图解 TLS 1.2 连接",
    subtitle: "对每一个字节的解释和再现",
    desc: "TLS 1.3 已于 2018/08 释出。",
    intro:
      '在这个演示中，客户端通过 TLS 1.2 加密协商连接服务器。客户端发送"ping"、接收"pong"后终止连接。点击下面开始探索。',
  },
  sections: [
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
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "ServerHello",
      illustration: {
        src: "https://quic.xargs.org/images/key2.png",
        width: "124",
        height: "250",
      },
      json: () => import("./serverHello.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端证书",
      illustration: {
        src: "https://quic.xargs.org/images/key3.png",
        width: "130",
        height: "250",
      },
      json: () => import("./serverCertificate.json"),
    },
    {
      type: "RecOuter",
      tags: ["calculation", "server"],
      label: "服务器端准备密钥交换",
      illustration: {
        src: "https://quic.xargs.org/images/key4.png",
        width: "106",
        height: "250",
      },
      json: () => import("./serverKeyExchangeGeneration.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端密钥交换",
      illustration: {
        src: "https://quic.xargs.org/images/key5.png",
        width: "138",
        height: "250",
      },
      json: () => import("./serverKeyExchange.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端握手完成",
      json: () => import("./serverHelloDone.json"),
    },
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
      label: "客户端密钥交换",
      illustration: {
        src: "https://quic.xargs.org/images/key7.png",
        width: "116",
        height: "250",
      },
      json: () => import("./clientKeyExchange.json"),
    },
    {
      type: "RecOuter",
      tags: ["calculation", "client"],
      label: "客户端生成会话密钥",
      illustration: {
        src: "https://quic.xargs.org/images/key8.png",
        width: "97",
        height: "250",
      },
      json: () => import("./clientEncryptionKeysGeneration.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "client"],
      label: "客户端秘钥规格变更",
      json: () => import("./clientChangeCipherSpec.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "client"],
      label: "客户端握手完成",
      json: () => import("./clientHandshakeFinished.json"),
    },
  ],
  ending: {
    mother: "https://tls12.xargs.org/",
    desc: "你可能也对更新的 <a href='https://tls13.xargs.org/' target='_blank'>TLS 1.3</a> 的内容感兴趣。",
  },
};

export default data;

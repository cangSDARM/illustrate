const data = {
  intro: {
    title: "图解 TLS 1.3 连接",
    subtitle: "对每一个字节的解释和再现",
    desc: '这里演示的连接是开启"中间件兼容模式"后的效果。具体内容请查看注释。',
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
      tags: ["calculation", "server"],
      label: "服务器端生成握手密钥",
      illustration: {
        src: "https://quic.xargs.org/images/key9.png",
        width: "97",
        height: "250",
      },
      json: () => import("./serverHandshakeKeysCalc.json"),
    },
    {
      type: "RecOuter",
      tags: ["calculation", "client"],
      label: "客户端生成握手密钥",
      illustration: {
        src: "https://quic.xargs.org/images/key8.png",
        width: "97",
        height: "250",
      },
      json: () => import("./clientHandshakeKeysCalc.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端秘钥规格变更",
      json: () => import("./serverChangeCipherSpec.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端伪装记录",
      id: "wrappedRecord1",
      json: () => import("./wrappedRecord1.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server", "embedded"],
      label: "服务器端加密后的额外扩展",
      json: () => import("./serverEncryptedExtensions.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端伪装记录",
      id: "wrappedRecord2",
      illustration: {
        src: "https://quic.xargs.org/images/key5.png",
        width: "124",
        height: "250",
      },
      json: () => import("./wrappedRecord2.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server", "embedded"],
      label: "服务器端证书",
      json: () => import("./serverCertificate.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端伪装记录",
      id: "wrappedRecord3",
      illustration: {
        src: "https://quic.xargs.org/images/key5.png",
        width: "124",
        height: "250",
      },
      json: () => import("./wrappedRecord3.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server", "embedded"],
      label: "服务器端证书验证数据",
      json: () => import("./serverCertVerify.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端伪装记录",
      id: "wrappedRecord4",
      illustration: {
        src: "https://quic.xargs.org/images/key5.png",
        width: "124",
        height: "250",
      },
      json: () => import("./wrappedRecord4.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server", "embedded"],
      label: "服务器端握手完成",
      json: () => import("./serverHandshakeFinished.json"),
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
        title: "TLS 1.3 RFC",
        href: "https://www.ietf.org/rfc/rfc8446.html",
      },
      {
        title: "OpenSSL 邮件列表: 如何在 ClientHello 中关闭 EC Point Formats",
        href: "https://mta.openssl.org/pipermail/openssl-users/2019-November/011572.html",
      },
      {
        title: "为何 openssl -enc 不支持 AEAD?",
        href: "https://github.com/openssl/openssl/issues/12220",
      },
    ],
  },
};

export default data;

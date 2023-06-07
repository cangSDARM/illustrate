const data = {
  intro: {
    title: "图解 DTLS 连接",
    subtitle: "对每一个字节的解释和再现",
    desc: 'DTLS 应被称为 "通过数据报传输的TLS"；到目前为止，有五个 DTLS-over-XYZ 的 RFC，涵盖了 UDP、DCCP、CAPWAP、SCTP 和 SRTP',
    intro:
      '在这个演示中，客户端通过 DTLS 1.3 加密协商连接服务器。客户端发送"ping"、接收"pong"后终止连接。点击下面开始探索。',
  },
  sections: [
    {
      type: "RecOuter",
      tags: ["calculation", "client"],
      label: "客户端准备密钥交换",
      illustration: {
        src: "https://quic.xargs.org/images/key1.png",
        width: "135",
        height: "250",
      },
      json: () => import("./clientKeyExchangeGeneration.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "client"],
      label: "ClientHello 数据报",
      json: () => import("./clientHelloDatagram.json"),
    },
    {
      type: "RecOuter",
      tags: ["calculation", "server"],
      label: "服务器端准备密钥交换",
      illustration: {
        src: "https://quic.xargs.org/images/key3.png",
        width: "130",
        height: "250",
      },
      json: () => import("./serverKeyExchangeGeneration.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "ServerHello 数据报",
      json: () => import("./serverHelloDatagram.json"),
    },
    {
      type: "RecOuter",
      tags: ["calculation", "server"],
      label: "服务器端生成握手密钥",
      illustration: {
        src: "https://quic.xargs.org/images/key5.png",
        width: "124",
        height: "250",
      },
      json: () => import("./serverHandshakeKeysCalc.json"),
    },
    {
      type: "RecOuter",
      tags: ["calculation", "client"],
      label: "客户端生成握手密钥",
      illustration: {
        src: "https://quic.xargs.org/images/key6.png",
        width: "105",
        height: "250",
      },
      json: () => import("./clientHandshakeKeysCalc.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端加密后的额外扩展数据报",
      illustration: {
        src: "https://quic.xargs.org/images/key5.png",
        width: "124",
        height: "250",
      },
      json: () => import("./serverEncryptedExtensionsDatagram.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端证书数据报",
      illustration: {
        src: "https://quic.xargs.org/images/key3.png",
        width: "130",
        height: "250",
      },
      json: () => import("./serverCertificateDatagram.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端证书验证数据报",
      illustration: {
        src: "https://quic.xargs.org/images/key5.png",
        width: "124",
        height: "250",
      },
      json: () => import("./serverCertVerifyDatagram.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端握手完成数据报",
      json: () => import("./serverHandshakeFinishedDatagram.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "client"],
      label: "客户端握手完成数据报",
      json: () => import("./clientHandshakeFinishedDatagram.json"),
    },
    {
      type: "RecOuter",
      tags: ["calculation", "server"],
      label: "服务器端生成会话密钥",
      illustration: {
        src: "https://quic.xargs.org/images/key9.png",
        width: "97",
        height: "250",
      },
      json: () => import("./serverApplicationKeysCalc.json"),
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
      json: () => import("./clientApplicationKeysCalc.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端握手 ACK 数据报",
      id: "serverHandshake3",
      json: () => import("./serverACKDatagram.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "client"],
      label: "客户端会话数据报",
      json: () => import("./clientApplicationDataDatagram.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端会话数据报",
      json: () => import("./serverApplicationDataDatagram.json"),
    },
    {
      type: "RecOuter",
      tags: ["record", "server"],
      label: "服务器端警告数据报(alert datagram)",
      json: () => import("./serverAlertDatagram.json"),
    },
  ],
  ending: {
    mother: "https://dtls.xargs.org/",
    desc: "你可能也对 <a href='/illustrate/tls13' target='_blank'>TLS 1.3</a> 的内容感兴趣。",
  },
};

export default data;

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
  ],
  ending: {
    mother: "https://dtls.xargs.org/",
    desc: "你可能也对 <a href='https://tls13.xargs.org/' target='_blank'>TLS 1.3</a> 的内容感兴趣。",
  },
};

export default data;

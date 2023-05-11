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
      json: () => import("./clientHelloDatagram.json"),
    },
  ],
  ending: {
    mother: "https://tls12.xargs.org/",
    desc: "你可能也对更新的 <a href='https://tls13.xargs.org/' target='_blank'>TLS 1.3</a> 的内容感兴趣。",
  },
};

export default data;

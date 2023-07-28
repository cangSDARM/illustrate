var e=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire7f38;e.register("6l0yU",function(t,r){Object.defineProperty(t.exports,"__esModule",{value:!0,configurable:!0}),Object.defineProperty(t.exports,"default",{get:()=>s,set:void 0,enumerable:!0,configurable:!0});var s={intro:{title:"图解 DTLS 连接",subtitle:"对每一个字节的解释和再现",desc:'DTLS 应被称为 "通过数据报传输的TLS"；到目前为止，有五个 DTLS-over-XYZ 的 RFC，涵盖了 UDP、DCCP、CAPWAP、SCTP 和 SRTP',intro:'在这个演示中，客户端通过 DTLS 1.3 加密协商连接服务器。客户端发送"ping"、接收"pong"后终止连接。点击下面开始探索。'},sections:[{type:"RecOuter",tags:["calculation","client"],label:"客户端准备密钥交换",illustration:{src:"https://quic.xargs.org/images/key1.png",width:"135",height:"250"},json:()=>e("1UcdV")},{type:"RecOuter",tags:["record","client"],label:"ClientHello 数据报",json:()=>e("9zoHz")},{type:"RecOuter",tags:["calculation","server"],label:"服务器端准备密钥交换",illustration:{src:"https://quic.xargs.org/images/key3.png",width:"130",height:"250"},json:()=>e("k4buq")},{type:"RecOuter",tags:["record","server"],label:"ServerHello 数据报",json:()=>e("j4Opk")},{type:"RecOuter",tags:["calculation","server"],label:"服务器端生成握手密钥",illustration:{src:"https://quic.xargs.org/images/key5.png",width:"124",height:"250"},json:()=>e("5bULt")},{type:"RecOuter",tags:["calculation","client"],label:"客户端生成握手密钥",illustration:{src:"https://quic.xargs.org/images/key6.png",width:"105",height:"250"},json:()=>e("8RaMI")},{type:"RecOuter",tags:["record","server"],label:"服务器端加密后的额外扩展数据报",illustration:{src:"https://quic.xargs.org/images/key5.png",width:"124",height:"250"},json:()=>e("UwxJu")},{type:"RecOuter",tags:["record","server"],label:"服务器端证书数据报",illustration:{src:"https://quic.xargs.org/images/key3.png",width:"130",height:"250"},json:()=>e("bTgeS")},{type:"RecOuter",tags:["record","server"],label:"服务器端证书验证数据报",illustration:{src:"https://quic.xargs.org/images/key5.png",width:"124",height:"250"},json:()=>e("g92B3")},{type:"RecOuter",tags:["record","server"],label:"服务器端握手完成数据报",json:()=>e("grBaL")},{type:"RecOuter",tags:["record","client"],label:"客户端握手完成数据报",json:()=>e("kdKQu")},{type:"RecOuter",tags:["calculation","server"],label:"服务器端生成会话密钥",illustration:{src:"https://quic.xargs.org/images/key9.png",width:"97",height:"250"},json:()=>e("8Cvah")},{type:"RecOuter",tags:["calculation","client"],label:"客户端生成会话密钥",illustration:{src:"https://quic.xargs.org/images/key8.png",width:"97",height:"250"},json:()=>e("dvTTp")},{type:"RecOuter",tags:["record","server"],label:"服务器端握手 ACK 数据报",id:"serverHandshake3",json:()=>e("4QBuU")},{type:"RecOuter",tags:["record","client"],label:"客户端会话数据报",json:()=>e("28Oxz")},{type:"RecOuter",tags:["record","server"],label:"服务器端会话数据报",json:()=>e("jp21g")},{type:"RecOuter",tags:["record","server"],label:"服务器端警告数据报(alert datagram)",json:()=>e("hOiL7")}],ending:{mother:"https://dtls.xargs.org/",desc:"你可能也对 <a href='/illustrate/tls13' target='_blank'>TLS 1.3</a> 的内容感兴趣。"}}}),e.register("1UcdV",function(t,r){t.exports=import("./"+e("27Lyk").resolve("8YoNg")).then(()=>e("e3CT3"))}),e.register("9zoHz",function(t,r){t.exports=import("./"+e("27Lyk").resolve("dgKt0")).then(()=>e("docPh"))}),e.register("k4buq",function(t,r){t.exports=import("./"+e("27Lyk").resolve("lCd8I")).then(()=>e("9jm0B"))}),e.register("j4Opk",function(t,r){t.exports=import("./"+e("27Lyk").resolve("dHXn0")).then(()=>e("6qJIj"))}),e.register("5bULt",function(t,r){t.exports=import("./"+e("27Lyk").resolve("3ubBn")).then(()=>e("jYohN"))}),e.register("8RaMI",function(t,r){t.exports=import("./"+e("27Lyk").resolve("bpgc0")).then(()=>e("cXZyf"))}),e.register("UwxJu",function(t,r){t.exports=import("./"+e("27Lyk").resolve("loksC")).then(()=>e("bo28j"))}),e.register("bTgeS",function(t,r){t.exports=import("./"+e("27Lyk").resolve("6sBz4")).then(()=>e("jTa5D"))}),e.register("g92B3",function(t,r){t.exports=import("./"+e("27Lyk").resolve("1xNJn")).then(()=>e("6tZIr"))}),e.register("grBaL",function(t,r){t.exports=import("./"+e("27Lyk").resolve("5xE1y")).then(()=>e("80RE4"))}),e.register("kdKQu",function(t,r){t.exports=import("./"+e("27Lyk").resolve("yUidd")).then(()=>e("kMdvc"))}),e.register("8Cvah",function(t,r){t.exports=import("./"+e("27Lyk").resolve("bJOLm")).then(()=>e("cGItd"))}),e.register("dvTTp",function(t,r){t.exports=import("./"+e("27Lyk").resolve("1Aqdc")).then(()=>e("29HDN"))}),e.register("4QBuU",function(t,r){t.exports=import("./"+e("27Lyk").resolve("8hNc0")).then(()=>e("kSrIM"))}),e.register("28Oxz",function(t,r){t.exports=import("./"+e("27Lyk").resolve("ebf10")).then(()=>e("0nsaP"))}),e.register("jp21g",function(t,r){t.exports=import("./"+e("27Lyk").resolve("5cLYe")).then(()=>e("owv2y"))}),e.register("hOiL7",function(t,r){t.exports=import("./"+e("27Lyk").resolve("aRRBB")).then(()=>e("g5kVq"))});
//# sourceMappingURL=DTLS.0f4e41ac.js.map

var e=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire7f38;e.register("6CsNL",(function(t,r){var s,i,o,n,l;s=t.exports,Object.defineProperty(s,"__esModule",{value:!0,configurable:!0}),i=t.exports,o="default",n=()=>g,Object.defineProperty(i,o,{get:n,set:l,enumerable:!0,configurable:!0});var g={intro:{title:"图解 TLS 1.2 连接",subtitle:"对每一个字节的解释和再现",desc:"TLS 1.3 已于 2018/08 释出。",intro:'在这个演示中，客户端通过 TLS 1.2 加密协商连接服务器。客户端发送"ping"、接收"pong"后终止连接。点击下面开始探索。'},sections:[{type:"RecOuter",tags:["record","client"],label:"ClientHello",illustration:{src:"https://quic.xargs.org/images/key1.png",width:"135",height:"250"},json:()=>e("6T5AB")},{type:"RecOuter",tags:["record","server"],label:"ServerHello",illustration:{src:"https://quic.xargs.org/images/key2.png",width:"124",height:"250"},json:()=>e("knwSX")},{type:"RecOuter",tags:["record","server"],label:"服务器端证书",illustration:{src:"https://quic.xargs.org/images/key3.png",width:"130",height:"250"},json:()=>e("fzW1X")},{type:"RecOuter",tags:["calculation","server"],label:"服务器端准备密钥交换",illustration:{src:"https://quic.xargs.org/images/key4.png",width:"106",height:"250"},json:()=>e("5cpP2")},{type:"RecOuter",tags:["record","server"],label:"服务器端密钥交换",illustration:{src:"https://quic.xargs.org/images/key5.png",width:"138",height:"250"},json:()=>e("aG5YP")},{type:"RecOuter",tags:["record","server"],label:"服务器端握手完成",json:()=>e("aClcp")},{type:"RecOuter",tags:["calculation","client"],label:"客户端准备密钥交换",illustration:{src:"https://quic.xargs.org/images/key6.png",width:"105",height:"250"},json:()=>e("gGZf8")},{type:"RecOuter",tags:["record","client"],label:"客户端密钥交换",illustration:{src:"https://quic.xargs.org/images/key7.png",width:"116",height:"250"},json:()=>e("coub4")},{type:"RecOuter",tags:["calculation","client"],label:"客户端生成会话密钥",illustration:{src:"https://quic.xargs.org/images/key8.png",width:"97",height:"250"},json:()=>e("1cS1K")}],ending:{mother:"https://tls12.xargs.org/",desc:"你可能也对更新的 <a href='https://tls13.xargs.org/' target='_blank'>TLS 1.3</a> 的内容感兴趣。"}}})),e.register("6T5AB",(function(t,r){t.exports=import("./"+e("27Lyk").resolve("1MbMp")).then((()=>e("h7Mws")))})),e.register("knwSX",(function(t,r){t.exports=import("./"+e("27Lyk").resolve("hmlDs")).then((()=>e("gYVPa")))})),e.register("fzW1X",(function(t,r){t.exports=import("./"+e("27Lyk").resolve("fIBJe")).then((()=>e("geaEz")))})),e.register("5cpP2",(function(t,r){t.exports=import("./"+e("27Lyk").resolve("fJj21")).then((()=>e("1Jw7E")))})),e.register("aG5YP",(function(t,r){t.exports=import("./"+e("27Lyk").resolve("fhFUE")).then((()=>e("7dIk7")))})),e.register("aClcp",(function(t,r){t.exports=import("./"+e("27Lyk").resolve("klOhV")).then((()=>e("6DuPx")))})),e.register("gGZf8",(function(t,r){t.exports=import("./"+e("27Lyk").resolve("7C8sP")).then((()=>e("1BHyB")))})),e.register("coub4",(function(t,r){t.exports=import("./"+e("27Lyk").resolve("4BNWr")).then((()=>e("iojZw")))})),e.register("1cS1K",(function(t,r){t.exports=import("./"+e("27Lyk").resolve("gWpYI")).then((()=>e("kcJkK")))}));
//# sourceMappingURL=TLS12.5a48b017.js.map

("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire7f38.register("1VL9Q",(function(a,e){a.exports=JSON.parse('["服务器端需要生成一个用于密钥交换的自己的“私钥/公钥”对。密钥交换(Key exchange)是一种技术，双方可以在同一数字上达成一致，而窃听者却无法知道这个数字是什么。",{"Tag":"p","children":["学习 TLS 并不需要深入了解，但你可以从",{"Tag":"a","props":{"href":"https://x25519.xargs.org/"},"content":"X25519 密钥交换算法"},"获取涉及到的密钥交换算法的具体解释。"]},[{"Tag":"strong","content":"私钥"},"是 0 到 2",{"Tag":"sup","content":"256"},"-1 之间的一个随机整数(32bytes, 256bits)","。为方便后续解释，假设我们生成的私钥是："],{"Tag":"pre","props":{"className":"ind2"},"children":[{"Tag":"code","props":{"className":"longboi"},"content":"909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeaf"}]},[{"Tag":"strong","content":"公钥"},"由上面提到的 X25519 密钥交换算法生成。例子中计算出的公钥应如下所示："],{"Tag":"pre","props":{"className":"ind2"},"children":[{"Tag":"code","props":{"className":"longboi"},"content":"9fd7ad6dcff4298dd3f96d5b1b2af910a0535b1488d7f8fabb349a982880b615"}]},"公钥的计算也可以在命令行中运行以下命令得到：",{"Tag":"CodeSample","props":{"code":"### requires openssl 1.1.0 or higher\\n$ openssl pkey -noout -text < server-ephemeral-private.key\\n\\nX25519 Private-Key:\\npriv:\\n    90:91:92:93:94:95:96:97:98:99:9a:9b:9c:9d:9e:\\n    9f:a0:a1:a2:a3:a4:a5:a6:a7:a8:a9:aa:ab:ac:ad:\\n    ae:af\\npub:\\n    9f:d7:ad:6d:cf:f4:29:8d:d3:f9:6d:5b:1b:2a:f9:\\n    10:a0:53:5b:14:88:d7:f8:fa:bb:34:9a:98:28:80:\\n    b6:15"}}]')}));
//# sourceMappingURL=serverKeyExchangeGeneration.71e87c45.js.map

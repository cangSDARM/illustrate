("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire7f38.register("eF3PP",(function(e,n){e.exports=JSON.parse('["生成完主秘钥之后，客户端会发送一个密钥规格变更记录(Change Cipher Spec)，表示已经生成主秘钥，并且将模式切换到加密模式，告诉服务器端开始使用加密方式发送消息。密钥规格变更记录之前传输的 TLS 握手数据都是明文的，之后都是对称秘钥加密的秘文。","在 TLS 的下一个版本中，这一消息类型会被删除，因为它可以被服务器端推断出来。",{"Tag":"AnnotationToggler"},{"Tag":"Annotations","props":{"type":"record-data","data":[["记录头",{"props":{"className":"bytes"},"content":"14 03 03 00 01"},["TLS 会话被分解成 \\"记录\\"(record) 的形式发送和接收。记录是具有类型、协议版本和长度的数据块。",{"Tag":"ul","children":[{"Tag":"li","content":"14 - 表示 TLS 记录类型 0x14(20, ChangeCipherSpec)"},{"Tag":"li","content":"03 03 - 协议版本 (3.3, 即 TLS 1.2)"},{"Tag":"li","content":"00 01 - 紧接着的数组载荷长度 0x01(1) 字节"}]}]],["数据载荷",{"props":{"className":"bytes"},"content":"01"},[]]]}}]')}));
//# sourceMappingURL=clientChangeCipherSpec.ea9ca43a.js.map

("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire7f38.register("hYgOo",(function(e,t){e.exports=JSON.parse('["服务器端接收后，需要发送一个用于 \\"握手 ACK\\" 的数据包，用于完成 TLS 1.3 加密会话的握手过程。",{"Tag":"AnnotationToggler"},{"Tag":"Annotations","props":{"type":"record-data","data":[["数据包头字节",{"props":{"className":"bytes protected","title":"被数据包头保护密钥加密"},"content":"e5"},{"props":{"className":"bytes unprotected"},"content":"e0"},["数据包以一个头字节开始，该字节应用了头保护。头部保护用于隐藏数据包序号和其他信息，使其不被外界观察到。","包头保护是通过用\\"数据包头保护密钥\\"对每个数据包的有效载荷的样本进行加密，然后将每个数据包中的某些比特和字节与所得数据进行异或(XOR)操作得到的。对于像这样的\\"长\\"格式数据包，受保护的部分是这个字节的低 4 位，以及数据包编号的字节（见下文）。","这里有一个关于如何计算出加密头字节的例子：",{"Tag":"CodeSample","props":{"code":"### \\"server header protection key\\" from handshake keys calc step above\\n$ key=2a18061c396c2828582b41b0910ed536\\n### sample is taken from 16 bytes of payload starting\\n### 4 bytes past the first byte of the packet number\\n$ sample=169e6f1b817e4623e1acbe1db3899b00\\n$ echo $sample | xxd -r -p | openssl aes-128-ecb -K $key | head -c 5 | xxd -p\\n\\na5a6f88ece\\n\\n### first byte of result is xor\'d into lower 4 bits of this byte,\\n### remaining bytes are xor\'d one-for-one into the bytes of\\n### the packet number (which in this packet is only one byte)"}},"解密出的字节 0xE0 中的位有以下含义：",{"Tag":"Table","props":{"headers":["","值","含义"],"data":[["高位","1","Long Header 格式"],["","1","固定位(总是被置1)"],["","10","数据包类型：握手"],["","00","保留(总是被置0)"],["低位","00","数据包序号长度(表示下面的 \\"数据包序号\\" 将有一个字节的长度，默认值)"]]}}]],["QUIC 版本号",{"props":{"className":"bytes"},"content":"00 00 00 01"},["QUIC的版本是：0x1"]],["目的地连接标识 ID",{"props":{"className":"bytes"},"content":"05 63 5f 63 69 64"},["服务器回传客户端的标识 ID (客户端的源连接标识 ID)",{"Tag":"ul","children":[{"Tag":"li","content":"05 - 紧跟着的目的地连接标识 ID 的长度"},{"Tag":"li","content":"63 5f 63 69 64 - 实际的目的地连接标识 ID(\\"c_cid\\")"}]}]],["源连接标识 ID",{"props":{"className":"bytes"},"content":"05 73 5f 63 69 64"},["服务器使用这个字段来向客户端表示它所选择的连接 ID。",{"Tag":"ul","children":[{"Tag":"li","content":"05 - 紧跟着的源连接标识 ID 的长度(5bytes)"},{"Tag":"li","content":"73 5f 63 69 64 - 实际的源连接标识 ID (\\"s_cid\\")"}]}]],["数据包长度",{"props":{"className":"bytes"},"content":"40 16"},["服务器端表示数据包中有多少字节的加密有效载荷。这个字段是一个长度可变的整数——第一个字节的前两位表示该整数中总共有多少个字节。","此时，第一个字节以 \\"0 1\\"(0x4)这两个位开始，表示该整数共两个字节。其余的位给出数字 0x16，表示 22 个字节的有效载荷。"]],["数据包序号",{"props":{"className":"bytes protected","title":"被数据包头保护密钥加密"},"content":"a4"},{"props":{"className":"bytes unprotected"},"content":"02"},["该字节应用了头保护。详见 \\"数据包头字节\\"。","这个字节的未受保护的值为 0x02，表明它是第 2 号包，或者说是服务器端发送的第三个\\"握手\\"包。","这个数据也有可能被截断。发送端点通过几个步骤截断：①计算已发送的最高的序号和未确认的最低的序号之间的差值；②出于安全考虑将差值加倍并四舍五入；③计算它在明确表示两端之间的序号的前提下可以从序号的高位删除的字节数；④截断编码后的数据包序号直至长度满足该字节数。而接收端点根据会它最近看到的数据包号码填入完整的序号。",{"children":["由于我们的例子对话发送的数据包很小(少于 64 个字节)，所以这种截断不会在本文中出现。详情见 ",{"Tag":"a","props":{"href":"https://www.rfc-editor.org/rfc/rfc9000.html#section-17.1"},"content":"RFC 9000"},"。"]}]],["加密的数据载荷",{"props":{"className":"bytes encrypted","title":"被\\"握手时密钥\\"加密"},"content":"87 5b 25 16 9e"},["这些数据使用服务器端的\\"握手时密钥\\"进行加密。"]],["AEAD 鉴别标签",{"props":{"className":"bytes"},"content":"6f 1b 81 7e 46 23 e1 ac be 1d b3 89 9b 00 ec fb"},[{"children":["这是 ",{"Tag":"a","props":{"href":"https://zhuanlan.zhihu.com/p/28566058"},"content":"AEAD 算法"},"的鉴别标签，确认加密数据和数据包头的完整性。它由加密算法产生，并由解密算法消耗。"]}]]]}},{"Tag":"Annotations","props":{"data":[["",{"props":{"className":"decryption-header"},"content":"解密后的数据载荷"},[{"Tag":"h4","content":"解密"},"数据被 \\"服务器端端握手时密钥计算\\" 步骤中产生的握手时密钥和握手时向量(IVs)加密。IVs 通过密钥和已经用密钥加密的记录长度进行异或操作生成。在例子中 IV 为 0。","数据包开头的 20 字节还会作为解密过程解密成功时必须满足的认证条件。",{"children":["openssl 命令行工具还不支持 AEAD 算法加解密(AEAD ciphers)，你可以使用作者的命令行工具来",{"Tag":"a","props":{"href":"https://quic.xargs.org/files/aes_128_gcm_decrypt.c"},"content":"解密"},"和",{"Tag":"a","props":{"href":"https://quic.xargs.org/files/aes_128_gcm_encrypt.c"},"content":"加密"},"这些数据。"]},{"Tag":"CodeSample","props":{"code":"### from the \\"Handshake Keys Calc\\" step\\n$ key=17abbf0a788f96c6986964660414e7ec\\n$ iv=09597a2ea3b04c00487e71f3\\n### from this record\\n$ recdata=e00000000105635f63696405735f636964401602\\n$ authtag=6f1b817e4623e1acbe1db3899b00ecfb\\n$ recordnum=2\\n### may need to add -I and -L flags for include and lib dirs\\n$ cc -o aes_128_gcm_decrypt aes_128_gcm_decrypt.c -lssl -lcrypto\\n$ cat /tmp/msg1   | ./aes_128_gcm_decrypt $iv $recordnum $key $recdata $authtag   | hexdump -C\\n\\n00000000  02 01 1c 00 01                                    |.....|"}}]]]}},{"Tag":"Annotations","props":{"type":"record-data","data":[["ACK 帧",{"props":{"className":"bytes encrypted"},"content":"02 01 1c 00 01"},["客户端确认收到服务器端的握手数据包1。",{"Tag":"ul","children":[{"Tag":"li","content":"02 - 表明帧类型 ACK"},{"Tag":"li","content":"01 - largest_acknowledged: 被确认的最大数据包"},{"Tag":"li","children":["1c - ack_delay: 变长的整数。给出这个 ack 被延迟发送的时间，单位是微秒。","通过计算式子：2",{"Tag":"sup","content":"ack_delay_exponent"}," 得到。其中 ack_delay_exponent = 28 * 8 = 224 (µseconds)。"]},{"Tag":"li","content":"00 - ack_range_count: 额外的 ACK 帧数据长度 0x(0)"},{"Tag":"li","content":"01 - first_ack_range: 可变长度的整数。给出在 largest_acknowledged 之前被确认过的数据包数量。"}]}]]]}}]')}));
//# sourceMappingURL=serverHandshakePacket3.99149536.js.map

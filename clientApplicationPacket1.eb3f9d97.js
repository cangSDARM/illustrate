("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire7f38.register("fifsS",function(e,t){e.exports=JSON.parse('["客户端发送其第一个握手后的数据包，即第一个实际包含应用内容的会话过程数据包。其中包含内容为 \\"ping\\" 的流数据。",{"Tag":"AnnotationToggler"},{"Tag":"Annotations","props":{"type":"record-data","data":[["数据包头字节",{"props":{"className":"bytes protected","title":"被数据包头保护密钥加密"},"content":"4e"},{"props":{"className":"bytes unprotected"},"content":"40"},["数据包以一个头字节开始，该字节应用了头保护。头部保护用于隐藏数据包序号和其他信息，使其不被外界观察到。","包头保护是通过用\\"数据包头保护密钥\\"对每个数据包的有效载荷的样本进行加密，然后将每个数据包中的某些比特和字节与所得数据进行异或(XOR)操作得到的。对于像这样的\\"长\\"格式数据包，受保护的部分是这个字节的低 4 位，以及数据包序号的字节（见下文）。","这里有一个关于如何计算出加密头字节的例子：",{"Tag":"CodeSample","props":{"code":"### \\"client header protection key\\" from application keys calc step above\\n$ key=8a6a38bc5cc40cb482a254dac68c9d2f\\n### sample is taken from 16 bytes of payload starting\\n### 4 bytes past the first byte of the packet number\\n$ sample=e66e8ee950ba8b8ed10cba39a06ab7b0\\n$ echo $sample | xxd -r -p | openssl aes-128-ecb -K $key | head -c 5 | xxd -p\\n\\n4e1e62a65d\\n\\n### first byte of result is xor\'d into lower 5 bits of this byte,\\n### remaining bytes are xor\'d one-for-one into the bytes of\\n### the packet number (which in this packet is only one byte)"}},"解密出的字节 0x40 中的位有以下含义：",{"Tag":"Table","props":{"headers":["","值","含义"],"data":[["高位","0","Short Header 格式"],["","1","固定位(总是被置1)"],["","0","可选的 \\"Spin\\" 位。用于允许观察者测量 RTT，但 QUIC 未使用。"],["","00","保留(总是被置0)"],["","0","密钥相位位(key phase bit), 密钥发生轮替时置1"],["低位","00","数据包序号长度(表示下面的 \\"数据包序号\\" 将有一个字节的长度，默认值)"]]}}]],["目的地连接标识 ID",{"props":{"className":"bytes"},"content":"73 5f 63 69 64"},["服务器端的标识 ID (服务器端的源连接标识 ID)","注意此时标识 ID 的长度(以及本应在后面的源连接标识 ID)已经省略。对等端(peer)在这之前应该且必须知道标识 ID 长度，该长度在会话过程中要么一直被省略，要么在标识 ID 中编码长度。",{"Tag":"ul","children":[{"Tag":"li","content":"73 5f 63 69 64 - 实际的目的地连接标识 ID(\\"s_cid\\")"}]}]],["数据包序号",{"props":{"className":"bytes protected","title":"被数据包头保护密钥加密"},"content":"1e"},{"props":{"className":"bytes unprotected"},"content":"00"},["该字节应用了头保护。详见 \\"数据包头字节\\"。","这个字节的未受保护的值为 0x00，表明它是第 0 号包，或者说是客户端发送的第一个\\"会话\\"包。","这个数据也有可能被截断。发送端点通过几个步骤截断：①计算已发送的最高的序号和未确认的最低的序号之间的差值；②出于安全考虑将差值加倍并四舍五入；③计算它在明确表示两端之间的序号的前提下可以从序号的高位删除的字节数；④截断编码后的数据包序号直至长度满足该字节数。而接收端点根据会它最近看到的数据包号码填入完整的序号。",{"children":["由于我们的例子对话发送的数据包很小(少于 64 个字节)，所以这种截断不会在本文中出现。详情见 ",{"Tag":"a","props":{"href":"https://www.rfc-editor.org/rfc/rfc9000.html#section-17.1"},"content":"RFC 9000"},"。"]}]],["加密的数据载荷",{"props":{"className":"bytes encrypted","title":"被\\"会话密钥\\"加密"},"content":"cc 91 70 e6 6e 8e e9 50 ba"},["这些数据使用客户端的\\"会话密钥\\"进行加密。"]],["AEAD 鉴别标签",{"props":{"className":"bytes"},"content":"8b 8e d1 0c ba 39 a0 6a b7 b0 67 0a 50 ef 68 e6"},[{"children":["这是 ",{"Tag":"a","props":{"href":"https://zhuanlan.zhihu.com/p/28566058"},"content":"AEAD 算法"},"的鉴别标签，用以确认加密数据和数据包头的完整性。它由加密算法产生，并由解密算法消耗。"]}]]]}},{"Tag":"Annotations","props":{"data":[["",{"props":{"className":"decryption-header"},"content":"解密后的数据载荷"},[{"Tag":"h4","content":"解密"},"数据被 \\"客户端生成会话密钥\\" 步骤中产生的会话密钥和会话向量(IVs)加密。IVs 通过密钥和已经用密钥加密的记录长度进行异或操作生成。在例子中 IV 为 0。","数据包开头的 16 字节(数据包头)还会作为解密过程解密成功时必须满足的认证条件。",{"children":["openssl 命令行工具还不支持 AEAD 算法加解密(AEAD ciphers)，你可以使用作者的命令行工具来",{"Tag":"a","props":{"href":"https://quic.xargs.org/files/aes_128_gcm_decrypt.c"},"content":"解密"},"和",{"Tag":"a","props":{"href":"https://quic.xargs.org/files/aes_128_gcm_encrypt.c"},"content":"加密"},"这些数据。"]},{"Tag":"CodeSample","props":{"code":"### from the \\"Application Keys Calc\\" step\\n$ key=e010a295f0c2864f186b2a7e8fdc9ed7\\n$ iv=eb3fbc384a3199dcf6b4c808\\n### from this record\\n$ recdata=40735f63696400\\n$ authtag=8b8ed10cba39a06ab7b0670a50ef68e6\\n$ recordnum=0\\n### may need to add -I and -L flags for include and lib dirs\\n$ cc -o aes_128_gcm_decrypt aes_128_gcm_decrypt.c -lssl -lcrypto\\n$ cat /tmp/msg1   | ./aes_128_gcm_decrypt $iv $recordnum $key $recdata $authtag   | hexdump -C\\n\\n00000000  0f 00 00 40 04 70 69 6e  67                       |...@.ping|"}}]]]}},{"Tag":"Annotations","props":{"type":"record-data","data":[["流数据帧标识",{"props":{"className":"bytes encrypted"},"content":"0f"},["客户端用此表明它发送的是数据流。流是 QUIC 连接中发送所有应用数据的机制，类似于单个 TCP 连接。","数据流的帧类型标识是一个范围在 0x8 到 0xf 的数字(二进制表示应该是：0b00001xxx)，外加额外的可变位提供关于流的额外信息：",{"Tag":"Table","props":{"headers":["位掩码","含义"],"data":[["0x4","OFF: 该帧中存在一个\\"偏移\\"字段(否则偏移量为0)"],["0x2","LEN：该帧中存在一个\\"长度\\"字段(否则对等端应消耗帧中的所有数据)。"],["0x1","FIN：该帧包含该数据流的最终数据，发送方已经完成了对它的写入。"]]}},"在本文例子中，发送方表示所有三个含义：将有一个偏移字段、一个长度字段，以及此帧包含该条数据流的最终数据。"]],["流的 ID 序号",{"props":{"className":"bytes encrypted"},"content":"00"},["客户端给出流的 ID 序号。ID 序号按顺序增加，且最后两个比特表示流的类型和方向：",{"Tag":"Table","props":{"headers":["位掩码","含义"],"data":[["0x2","表示流是双向的(0)还是单向的(1)。"],["0x1","表示流是由客户端(0)还是服务器端(1)打开的。"]]}},"在本文例子中，表示流的 ID 序号为 0，且是客户端打开的双向数据流。"]],["流的偏移",{"props":{"className":"bytes encrypted"},"content":"00"},["一个可变长度的整数，表示流数据的偏移量。","在本文例子中，一个单字节的整数显示偏移量为 0。"]],["流的长度",{"props":{"className":"bytes encrypted"},"content":"40 04"},["一个可变长度的整数，表示流数据的长度。","在本文例子中，前两个比特(0 1)表示一个两字节的整数，其余比特表明流的长度为 4 字节。"]],["数据",{"props":{"className":"bytes encrypted"},"content":"70 69 6e 67"},["客户端发送的数据，字符串\\"ping\\""]]]}}]')});
//# sourceMappingURL=clientApplicationPacket1.eb3f9d97.js.map

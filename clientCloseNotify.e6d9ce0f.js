("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire7f38.register("ekhPe",function(e,n){e.exports=JSON.parse('["客户端发送警告信号，表明连接即将终止(此时是有序终止即正常终止连接)",{"Tag":"AnnotationToggler"},{"Tag":"Annotations","props":{"type":"record-data","data":[["记录头",{"props":{"className":"bytes"},"content":"15 03 03 00 30"},["TLS 会话被分解成 \\"记录\\"(record) 的形式发送和接收。记录是具有类型、协议版本和长度的数据块。",{"Tag":"ul","children":[{"Tag":"li","content":"15 - 表示 TLS 记录类型 0x15(21, alert)"},{"Tag":"li","content":"03 03 - 协议版本 (3.3, 即 TLS 1.2)"},{"Tag":"li","content":"00 30 - 紧接着的数组载荷长度 0x30(48) 字节"}]}]],["加密向量",{"props":{"className":"bytes"},"content":"10 11 12 13 14 15 16 17 18 19 1a 1b 1c 1d 1e 1f"},["客户端发送一个用于解密这个区块的初始化向量。因为我们的数据是可预测的(we have overridden the rand function)，因此它也是一个可预测的序列。"]],["加密的数据载荷",{"props":{"className":"bytes encrypted"},"content":"0d 83 f9 79 04 75 0d d8 fd 8a a1 30 21 86 32 63 4f d0 65 e4 62 83 79 b8 8b bf 9e fd 12 87 a6 2d"},["这个数据是用客户端的写时密钥加密的。因为它包含一个消息验证码(MAC)和填充字节，所以它比解密后的数据要大一截。"]]]}},{"Tag":"Annotations","props":{"data":[["",{"props":{"className":"decryption-header"},"content":"解密后的数据载荷"},[{"Tag":"h4","content":"解密"},"数据被 \\"客户端生成会话密钥\\" 步骤中产生的写时密钥和该记录开头所携带的初始向量(IVs)加密。",{"Tag":"CodeSample","props":{"code":"### client key\\n$ hexkey=f656d037b173ef3e11169f27231a84b6\\n### IV for this record\\n$ hexiv=101112131415161718191a1b1c1d1e1f\\n### encrypted data\\n$ echo \'0d 83 f9 79 04 75 0d d8 fd 8a a1 30 21 86 32 63\'  > /tmp/msg1\\n$ echo \'4f d0 65 e4 62 83 79 b8 8b bf 9e fd 12 87 a6 2d\' >> /tmp/msg1\\n$ xxd -r -p /tmp/msg1 \\\\\\n  | openssl enc -d -nopad -aes-128-cbc -K $hexkey -iv $hexiv | hexdump\\n\\n0000000 01 00 92 79 9c ba 81 9f 31 07 44 c5 59 62 2b e4\\n0000010 2b ce 3d 6a 41 fb 09 09 09 09 09 09 09 09 09 09\\n\\nThe last 30 bytes contain a 20-byte MAC and padding to bring the data to a\\nmultiple of 16 bytes.  The 20-byte MAC can be reproduced as follows:\\n\\n### from https://tools.ietf.org/html/rfc2246#section-6.2.3.1\\n$ sequence=\'0000000000000002\'\\n$ rechdr=\'15 03 03\'\\n$ datalen=\'00 02\'\\n$ data=\'01 00\'\\n### from \\"Encryption Keys Calculation\\"\\n$ mackey=1b7d117c7d5f690bc263cae8ef60af0f1878acc2\\n$ echo $sequence $rechdr $datalen $data | xxd -r -p \\\\\\n  | openssl dgst -sha1 -mac HMAC -macopt hexkey:$mackey\\n\\n92799cba819f310744c559622be42bce3d6a41fb"}}]]]}},{"Tag":"Annotations","props":{"type":"record-data","data":[["警告信息",{"props":{"className":"bytes encrypted"},"content":"01 00"},["客户端发送一个 \\"连接关闭通知\\"(close notify) 的警告，表示连接正有序地终止(正常终止)。",{"Tag":"ul","children":[{"Tag":"li","content":"01 - 警告级别为 0x01(warning), 未使用"},{"Tag":"li","content":"00 - 表明这是 close notify 警告"}]}]]]}}]')});
//# sourceMappingURL=clientCloseNotify.e6d9ce0f.js.map

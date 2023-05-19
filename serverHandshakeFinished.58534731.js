("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire7f38.register("g1bPu",(function(e,a){e.exports=JSON.parse('["为了验证握手成功且没有被篡改过，服务器端也需要创建一些验证数据给客户端确认。验证数据是基于所有握手信息的哈希值计算得到。","此时开始传输的数据都是加密的密文了。",{"Tag":"AnnotationToggler"},{"Tag":"Annotations","props":{"type":"record-data","data":[["记录头",{"props":{"className":"bytes"},"content":"16 03 03 00 40"},["TLS 会话被分解成 \\"记录\\"(record) 的形式发送和接收。记录是具有类型、协议版本和长度的数据块。",{"Tag":"ul","children":[{"Tag":"li","content":"14 - 表示 TLS 记录类型 0x16(22, handshake)"},{"Tag":"li","content":"03 03 - 协议版本 (3.3, 即 TLS 1.2)"},{"Tag":"li","content":"00 40 - 紧接着的数组载荷长度 0x40(64) 字节"}]}]],["加密向量",{"props":{"className":"bytes"},"content":"51 52 53 54 55 56 57 58 59 5a 5b 5c 5d 5e 5f 60"},["服务器端发送一个用于解密这个区块的初始化向量。因为我们的数据是可预测的(we have overridden the rand function)，因此它也是一个可预测的序列。"]],["加密的数据载荷",{"props":{"className":"bytes encrypted"},"content":"18 e0 75 31 7b 10 03 15 f6 08 1f cb f3 13 78 1a ac 73 ef e1 9f e2 5b a1 af 59 c2 0b e9 4f c0 1b da 2d 68 00 29 8b 73 a7 e8 49 d7 4b d4 94 cf 7d"},["这个数据是用服务器端的写时密钥加密的。因为它包含一个消息验证码(MAC)和填充字节，所以它比解密后的数据要大一截。"]]]}},{"Tag":"Annotations","props":{"data":[["",{"props":{"className":"decryption-header"},"content":"解密后的数据载荷"},[{"Tag":"h4","content":"解密"},"数据被 \\"服务器端生成会话密钥\\" 步骤中产生的写时密钥和该记录开头所携带的初始向量(IVs)加密。",{"Tag":"CodeSample","props":{"code":"### server key\\n$ hexkey=752a18e7a9fcb7cbcdd8f98dd8f769eb\\n### IV for this record\\n$ hexiv=5152535455565758595a5b5c5d5e5f60\\n### encrypted data\\n$ echo \'18 e0 75 31 7b 10 03 15 f6 08 1f cb f3 13 78 1a\'  > /tmp/msg1\\n$ echo \'ac 73 ef e1 9f e2 5b a1 af 59 c2 0b e9 4f c0 1b\' >> /tmp/msg1\\n$ echo \'da 2d 68 00 29 8b 73 a7 e8 49 d7 4b d4 94 cf 7d\' >> /tmp/msg1\\n$ xxd -r -p /tmp/msg1 \\\\\\n  | openssl enc -d -nopad -aes-128-cbc -K $hexkey -iv $hexiv | hexdump\\n\\n0000000 14 00 00 0c 84 4d 3c 10 74 6d d7 22 f9 2f 0c 7e\\n0000010 20 c4 97 46 d2 a3 0f 23 57 39 90 58 07 53 52 43\\n0000020 af f2 bf e0 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b 0b\\n\\nThe last 32 bytes contain a 20-byte MAC and padding to bring the data to a\\nmultiple of 16 bytes.  The 20-byte MAC can be reproduced as follows:\\n\\n### from https://tools.ietf.org/html/rfc2246#section-6.2.3.1\\n$ sequence=\'0000000000000000\'\\n$ rechdr=\'16 03 03\'\\n$ datalen=\'00 10\'\\n$ data=\'14 00 00 0c 84 4d 3c 10 74 6d d7 22 f9 2f 0c 7e\'\\n### from \\"Encryption Keys Calculation\\"\\n$ mackey=2ad8bdd8c601a617126f63540eb20906f781fad2\\n$ echo $sequence $rechdr $datalen $data | xxd -r -p \\\\\\n  | openssl dgst -sha1 -mac HMAC -macopt hexkey:$mackey\\n\\n20c49746d2a30f235739905807535243aff2bfe0"}}]]]}},{"Tag":"Annotations","props":{"type":"record-data","data":[["握手消息头",{"props":{"className":"bytes encrypted"},"content":"14 00 00 0c"},["每个握手消息都以一个 type 和一个 len 开始。",{"Tag":"ul","children":[{"Tag":"li","content":"14 - 握手消息类型 0x14 (finished)"},{"Tag":"li","content":"00 00 0c - 紧接着的握手消息数据的长度 0x0C (12) 字节"}]}]],["验证数据",{"props":{"className":"bytes encrypted"},"content":"84 4d 3c 10 74 6d d7 22 f9 2f 0c 7e"},["使用 \\"服务器端生成会话密钥\\" 步骤中的主密钥和在这之前的每个握手记录(type=0x16)的 SHA256 哈希值生成。","这个哈希值应该是：",{"Tag":"pre","children":[{"Tag":"code","props":{"className":"longboi"},"content":"b2017ba28d0e27f03ae327456b6ff00b4d5bbf0ef7cda83ce1029b521c3e7c35"}]},"计算过程及结果：",{"Tag":"pre","children":[{"Tag":"code","props":{"className":"longboi"},"content":"seed = \\"server finished\\" + SHA256(all handshake messages)\\na0 = seed\\na1 = HMAC-SHA256(key=MasterSecret, data=a0)\\np1 = HMAC-SHA256(key=MasterSecret, data=a1 + seed)\\nverify_data = p1[first 12 bytes]"}]},{"Tag":"CodeSample","props":{"code":"### set up our MasterSecret as a hex string\\n$ mshex=$(hexdump -ve \'/1 \\"%02x\\"\' /tmp/mastersecret)\\n### build the seed\\n$ echo -en \'server finished\' > /tmp/seed\\n### add SHA256(all_messages) to seed\\n$ echo -en \'\\\\xb2\\\\x01\\\\x7b\\\\xa2\\\\x8d\\\\x0e\\\\x27\\\\xf0\' >> /tmp/seed\\n$ echo -en \'\\\\x3a\\\\xe3\\\\x27\\\\x45\\\\x6b\\\\x6f\\\\xf0\\\\x0b\' >> /tmp/seed\\n$ echo -en \'\\\\x4d\\\\x5b\\\\xbf\\\\x0e\\\\xf7\\\\xcd\\\\xa8\\\\x3c\' >> /tmp/seed\\n$ echo -en \'\\\\xe1\\\\x02\\\\x9b\\\\x52\\\\x1c\\\\x3e\\\\x7c\\\\x35\' >> /tmp/seed\\n### a0 is the same as the seed\\n$ cat /tmp/seed > /tmp/a0\\n### a(n) is hmac-sha256(key=secret, data=a(n-1))\\n$ cat /tmp/a0 | openssl dgst -sha256 \\\\\\n   -mac HMAC -macopt hexkey:$mshex -binary > /tmp/a1\\n### p(n) is hmac-sha256(key=secret, data=a(n)+seed)\\n$ cat /tmp/a1 /tmp/seed | openssl dgst -sha256 \\\\\\n   -mac HMAC -macopt hexkey:$mshex -binary > /tmp/p1\\n$ head -c 12 /tmp/p1 > /tmp/verify_data\\n$ hexdump /tmp/verify_data\\n\\n0000000 84 4d 3c 10 74 6d d7 22 f9 2f 0c 7e"}}]]]}}]')}));
//# sourceMappingURL=serverHandshakeFinished.58534731.js.map

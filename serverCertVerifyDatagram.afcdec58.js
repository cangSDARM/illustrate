("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire7f38.register("6tZIr",function(e,a){e.exports=JSON.parse('["服务器提供证书验证相关的数据，用以验证服务器密钥交换生成过程中产生的短暂公钥与证书私钥的所有权是否一致。",{"Tag":"AnnotationToggler"},{"Tag":"Annotations","props":{"type":"record-data","data":[["头部信息字节",{"props":{"className":"bytes"},"content":"2e"},["加密的 DTLS 数据包都以一个 \\"统一的头部(unified header)\\"开始。头部的第一个字节给出了头部和数据包的结构信息，以及解密时需要的信息。","值 0x2e 具有以下含义：",{"Tag":"Table","props":{"headers":["","值","含义"],"data":[["高位","001","固定位"],["","0","头部中不存在连接 ID 字段(1则存在)"],["","1","序列号在头部中占 2 字节长"],["","1","头部中存在\\"记录长度\\"字段(0则不存在)"],["低位","10","加密序列指示(Encryption epoch 2)，现在密钥是握手时密钥"]]}}]],["记录序号",{"props":{"className":"bytes protected","title":"被加密"},"content":"a4 3e"},{"props":{"className":"bytes unprotected"},"content":"00 02"},["记录序号是被加密了的，用以防止中间件误解(interpreting)或干扰数据包的排序。","加密是通过用 \\"服务器端序号保护密钥\\" 对每个数据包的有效载荷样本进行加密，然后将每个数据包中的某些比特和字节与所得数据进行 XOR 得到。","如果说的不够详细，这里有一个如何加密的例子：",{"Tag":"CodeSample","props":{"code":"### \\"server record number key\\" from handshake keys calc step above\\n$ key=7173fac51194e775001d625ef69d7c9f\\n### sample is taken from 16 bytes of payload starting 5 bytes into the record\\n$ sample=83bedfea0f4aa578453af4f4a4be4106\\n$ echo $sample | xxd -r -p | openssl aes-128-ecb -K $key | head -c 2 | xxd -p\\n\\na43c\\n\\n### the above bytes are xor\'d one-for-one into the bytes of the record number"}}]],["记录长度",{"props":{"className":"bytes"},"content":"01 24"},["每个记录除非给出这个长度字段，否则对等端将认为数据报剩余的所有字节都是同一个记录的真实载荷。有了这一字段，则在一个数据报中可以发送好几个 TLS 记录(尽管例子中的连接没有利用这个优势)。",{"Tag":"ul","children":[{"Tag":"li","content":"01 21 - 表示 TLS 记录长度为 0x121(289) 字节"}]}]],["加密的数据载荷",{"props":{"className":"bytes encrypted","title":"被\\"握手密钥\\"加密"},"content":"83 be df ea 0f 4a a5 78 45 3a f4 f4 a4 be 41 06 9b eb e5 9c e4 93 3b f2 f2 ff 35 36 f0 e6 11 45 9f 7a fc 07 14 1e 4a 80 e4 b1 10 f2 c5 48 24 4e 83 42 cd 13 46 26 f0 d6 bc 12 2c 6e e3 cc 81 64 e3 e1 1f b8 bc 7b 58 ff 8d ef af 99 c9 26 81 f7 42 64 cc 29 5d f2 69 b4 63 af e5 78 53 ba 86 04 bd 8e ef 74 91 a0 fc 5a 5d df c2 2b 87 f7 cc 55 94 fd 2b 13 69 68 ab 07 ce 1d 84 33 07 df 9f 41 37 27 11 0f e0 5a c6 df 33 7c 44 4c 9a 2d 8b 28 30 b3 50 48 13 72 dd a1 4b e3 04 63 cb 94 16 f8 15 b7 29 b8 20 be b9 1e df 34 f8 b2 29 fa 71 4d fa 58 68 61 c5 25 15 aa d2 8e 98 52 90 d2 a7 e1 97 df 5a 4f 73 20 4d 95 2c a3 e2 34 af 34 fa e6 5a 3a 34 c1 33 8b 52 dd b7 8e 87 a9 14 95 21 2c 8e da ed 59 6e 0b 4b ad 18 65 66 8d 5a 33 9f d7 61 31 43 bc b8 5d 96 10 41 22 f6 17 e5 39 3b 4c ba 44 d0 86 e5 32 c7 39 e8 15 ea dc 2a 84 07 c4 72"},["这些数据使用服务器端的\\"握手密钥\\"进行加密。"]],["AEAD 鉴别标签",{"props":{"className":"bytes"},"content":"bd f0 f6 f0 06 0d b4 71 19 71 38 7c 21 89 39 4f"},[{"children":["这是 ",{"Tag":"a","props":{"href":"https://zhuanlan.zhihu.com/p/28566058"},"content":"AEAD 算法"},"的鉴别标签，确认加密数据和记录头的完整性。它由加密算法产生，并由解密算法消耗。"]}]]]}},{"Tag":"Annotations","props":{"data":[["",{"props":{"className":"decryption-header"},"content":"解密后的数据载荷"},[{"Tag":"h4","content":"解密"},"数据被 \\"服务器端握手密钥计算\\" 步骤中产生的初始密钥和初始向量(IVs)加密。IVs 通过密钥和已经用密钥加密的记录长度进行异或操作生成。在例子中 IV 为 2。","数据包开头的 5 字节(记录头)还会作为解密过程解密成功时必须满足的认证条件。",{"children":["openssl 命令行工具还不支持 AEAD 算法加解密(AEAD ciphers)，你可以使用作者的命令行工具来",{"Tag":"a","props":{"href":"https://dtls.xargs.org/files/aes_128_gcm_decrypt.c"},"content":"解密"},"和",{"Tag":"a","props":{"href":"https://dtls.xargs.org/files/aes_128_gcm_encrypt.c"},"content":"加密"},"这些数据。"]},{"Tag":"CodeSample","props":{"code":"### from the \\"Server Handshake Keys Calc\\" step\\n$ key=004e03e64ab6cba6b542775ec230e20a\\n$ iv=6d9924be044ee97c624913f2\\n### from this record\\n$ recdata=2e00020121\\n$ authtag=bdf0f6f0060db4711971387c2189394f\\n$ recordnum=2\\n### may need to add -I and -L flags for include and lib dirs\\n$ cc -o aes_128_gcm_decrypt aes_128_gcm_decrypt.c -lssl -lcrypto\\n$ cat /tmp/msg1   | ./aes_128_gcm_decrypt $iv $recordnum $key $recdata $authtag   | hexdump -C\\n\\n00000000  0f 00 01 04 00 03 00 00  00 00 01 04 08 04 01 00  |................|\\n00000010  2c 76 3d 6a d3 d8 af 7f  a3 7d a6 d8 d9 0e 73 7c  |,v=j?د.?}???.s||\\n00000020  ea 53 ee 7a ff a5 61 48  74 cc 68 48 9c 73 a2 f3  |?S?z??aHt?hH.s??|\\n00000030  a0 43 cb ba e6 c2 7a 41  91 0e de 9a df c7 22 23  |?C˺??zA..?.??\\"#|\\n00000040  58 26 12 ec 96 79 fe 1f  9f a5 f4 a4 b6 12 f8 6f  |X&.?.y?..????.?o|\\n... snip ..."}}]]]}},{"Tag":"Annotations","props":{"type":"record-data","data":[["握手消息头",{"props":{"className":"bytes encrypted"},"content":"0f 00 01 04"},["每个握手消息都以一个 type 和一个 len 开始。",{"Tag":"ul","children":[{"Tag":"li","content":"0f - 握手消息类型 0x0f (certificate verify)"},{"Tag":"li","content":"00 01 04 - 紧接着的握手消息数据的长度 0x104 (260) 字节"}]}]],["用于重建握手顺序的信息(Handshake Reconstruction Data)",{"props":{"className":"bytes encrypted"},"content":"00 03 00 00 00 00 01 04"},["因为 UDP (或其他数据报协议)不保证交付或排序，而且数据报的长度可能比需要发送的握手记录长度要小。因此 DTLS 必须提供一定的信息，以支持在数据丢失、包重排序或有记录碎片的情况下，使得对等端(peer)能够重新构建一条正确的 DTLS 记录。",{"Tag":"ul","children":[{"Tag":"li","content":"00 03 - DTLS 序列号 0x3(3)"},{"Tag":"li","content":"00 00 00 - 表明记录碎片的偏移量为 0x00(0) 字节"},{"Tag":"li","content":"00 01 04 - 表明之后的记录碎片的长度为 0x104(260) 字节"}]},"在本文例子中，整个握手记录的长度要短于一个 UDP 数据报的可承载长度，因此偏移量为零，且长度为整个握手记录长。"]],["签名",{"props":{"className":"bytes encrypted"},"content":"08 04 01 00 2c 76 3d 6a d3 d8 af 7f a3 7d a6 d8 d9 0e 73 7c ea 53 ee 7a ff a5 61 48 74 cc 68 48 9c 73 a2 f3 a0 43 cb ba e6 c2 7a 41 91 0e de 9a df c7 22 23 58 26 12 ec 96 79 fe 1f 9f a5 f4 a4 b6 12 f8 6f 40 88 49 a3 29 f7 63 e0 4f be 95 9a 91 e8 d1 8d 4a ba 79 29 57 6f a0 24 ec b2 37 d6 33 78 e9 8e e5 9d c9 59 49 b2 63 b3 06 53 0a 2e 6f b9 b2 2f a2 3c 64 32 33 43 03 89 33 01 fd 60 e2 05 82 6e b9 ec 41 4f ec 5f 9a 0d 6f 8f 3d 89 a0 9f 14 8e 0f 05 03 49 bc 1e 17 97 d9 28 1e ed f6 e7 66 9c e2 56 ae 79 d4 ee 8c 96 56 0d cf 07 6c 2a 45 a4 ee e8 d2 79 71 0f 0c e7 03 4a 3f 5c aa 94 41 4e ae df 61 08 48 66 e4 9e 81 88 3e e2 1a 12 59 3c cb 96 dd 11 76 9e 34 0f 1e 6c c2 14 b0 57 95 e5 4a fc 94 79 84 5e 4d f2 bf 96 9f bb 21 8c b9 c4 b8 34 a8 51 be 34 75 a1 45 2f 4b 33 55 4f 9d 65"},["由于服务器会为每个会话都生成短暂的密钥，所以和 TLS 之前的版本不同，密钥与证书不会有内在的联系。","为了证明服务器拥有服务器证书(在这个 TLS 会话中的有效性)，它需要使用证书的私钥对握手信息的哈希进行签名。而客户端可以通过使用证书的公钥来证明该签名的有效性。",{"Tag":"ul","children":[{"Tag":"li","content":"08 04 - 表明签名算法为 RSA-PSS-RSAE-SHA256"},{"Tag":"li","content":"01 00 - 表明签名算法长度为 0x100(256) 字节"},{"Tag":"li","content":"2c 76 3d ... 4f 9d 65 - 签名"}]},"签名过程不能在命令行中逐字逐句地复制，因为签名工具在签名中引入了随机或变化的数据。",{"children":["相反，我们可以像客户端那样，在命令行使用",{"Tag":"a","props":{"href":"https://dtls.xargs.org/files/server.crt"},"content":"服务器的证书"},"提供的公钥来验证签名："]},{"Tag":"CodeSample","props":{"code":"### find the hash of the conversation to this point, excluding\\n### cleartext record headers, DTLS-only record headers,\\n### or 1-byte decrypted record trailers\\n$ handshake_hash=$((\\n   cat record-chello | perl -0777 -pe \'s/.{13}(.{4}).{8}/$1/s\';\\n   cat record-shello | perl -0777 -pe \'s/.{13}(.{4}).{8}/$1/s\';\\n   cat record-encext | perl -0777 -pe \'s/(.{4}).{8}(.*).$/$1$2/s\';\\n   cat record-cert   | perl -0777 -pe \'s/(.{4}).{8}(.*).$/$1$2/s\';\\n   )| openssl sha256)\\n\\n### build the data that was signed:\\n### 1. add 64 space characters\\n$ echo -n \'                                \' > /tmp/tosign\\n$ echo -n \'                                \' >> /tmp/tosign\\n### 2. add this fixed string\\n$ echo -n \'TLS 1.3, server CertificateVerify\' >> /tmp/tosign\\n### 3. add a single null character\\n$ echo -en \'\\\\u0000\' >> /tmp/tosign\\n### 4. add hash of handshake to this point\\n$ echo $handshake_hash | xxd -r -p >> /tmp/tosign\\n\\n### copy the signature that we want to verify\\n$ echo \\"2c 76 3d 6a d3 d8 af 7f a3 7d a6 d8 d9 0e 73 7c ea 53 ee 7a\\n  ff a5 61 48 74 cc 68 48 9c 73 a2 f3 a0 43 cb ba e6 c2 7a 41 91 0e\\n  de 9a df c7 22 23 58 26 12 ec 96 79 fe 1f 9f a5 f4 a4 b6 12 f8 6f\\n  40 88 49 a3 29 f7 63 e0 4f be 95 9a 91 e8 d1 8d 4a ba 79 29 57 6f\\n  a0 24 ec b2 37 d6 33 78 e9 8e e5 9d c9 59 49 b2 63 b3 06 53 0a 2e\\n  6f b9 b2 2f a2 3c 64 32 33 43 03 89 33 01 fd 60 e2 05 82 6e b9 ec\\n  41 4f ec 5f 9a 0d 6f 8f 3d 89 a0 9f 14 8e 0f 05 03 49 bc 1e 17 97\\n  d9 28 1e ed f6 e7 66 9c e2 56 ae 79 d4 ee 8c 96 56 0d cf 07 6c 2a\\n  45 a4 ee e8 d2 79 71 0f 0c e7 03 4a 3f 5c aa 94 41 4e ae df 61 08\\n  48 66 e4 9e 81 88 3e e2 1a 12 59 3c cb 96 dd 11 76 9e 34 0f 1e 6c\\n  c2 14 b0 57 95 e5 4a fc 94 79 84 5e 4d f2 bf 96 9f bb 21 8c b9 c4\\n  b8 34 a8 51 be 34 75 a1 45 2f 4b 33 55 4f 9d 65\\" | xxd -r -p > /tmp/sig\\n\\n### extract the public key from the certificate\\n$ openssl x509 -pubkey -noout -in server.crt > server.pub\\n\\n### verify the signature\\n$ cat /tmp/tosign | openssl dgst -verify server.pub -sha256     -sigopt rsa_padding_mode:pss -sigopt rsa_pss_saltlen:-1 -signature /tmp/sig\\n\\nVerified OK"}}]],["记录类型",{"props":{"className":"bytes encrypted"},"content":"16"},["每一个加密的 DTLS 1.3 记录的最后一个字节都需要表明其真正的记录类型",{"Tag":"ul","children":[{"Tag":"li","content":"16 - 类型为 0x16(22), 握手记录"}]}]]]}}]')});
//# sourceMappingURL=serverCertVerifyDatagram.afcdec58.js.map

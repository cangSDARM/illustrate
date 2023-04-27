("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire7f38.register("3OTPY",(function(e,a){e.exports=JSON.parse('["服务器提供证书验证相关的数据，用以验证服务器密钥交换生成过程中产生的短暂公钥与证书私钥的所有权是否一致。",{"Tag":"AnnotationToggler"},{"Tag":"Annotations","props":{"type":"record-data","data":[["TLS 握手消息头",{"props":{"className":"bytes"},"content":"0f 00 01 04"},["每个 TLS 握手消息都以一个 type 和一个 len 开始。",{"Tag":"ul","children":[{"Tag":"li","content":"0f - 握手消息类型 0x0f (certificate verify)"},{"Tag":"li","content":"00 01 04 - 紧接着的握手消息数据的长度 0x104 (260) 字节"}]}]],["签名算法",{"props":{"className":"bytes"},"content":"08 04"},["08 04 - 代表 rsa_pss_rsae_sha256 算法"]],["签名长度",{"props":{"className":"bytes"},"content":"01 00"},["签名数据的长度为 0x100(256) 字节"]],["签名",{"props":{"className":"bytes"},"content":"0a 99 af 32 a9 e4 06 d7 25 f9 a9 39 6d e5 af 37 56 b7 a8 f6 e4 da d5 85 ab c3 f8 7c 6d 1f c1 5f 5f 00 ab a8 dc a9 d0 5c db 51 d3 c9 35 43 36 56 d8 8b 74 32 00 5e e7 e0 48 03 b2 47 57 44 d7 55 5c f3 de 48 9c c2 16 a4 85 a7 28 b2 18 90 e8 7a a9 41 5d 19 e6 3a 6a 77 9b 9c db b1 28 a8 04 c4 28 b8 27 fa 65 df cd 95 2a ce 54 46 1e 8a 23 40 58 98 8e 7f 26 4d 7a b6 a5 1a 21 c6 29 79 b7 a6 79 f4 a0 87 70 85 6e 92 6d 37 1b 2e 89 16 9a a1 90 b8 03 63 6b b1 0c 0f b9 05 98 3d 2b 50 0a ad 26 83 df be 15 6e cc f6 66 de 1a 5a d4 5d 77 38 d5 e7 8b d1 7b c3 e6 d2 5f 9a d4 af ba 8f 81 de 9f 4d 55 72 11 8e 08 55 1a 4b b9 4b 56 a9 70 e8 04 c6 82 67 45 4b 51 7f c8 38 6c 9b ae 3a 77 cc cb 7f 29 0f 6e 58 fb a1 26 f0 53 33 a1 1f 8a b0 89 2e 6e 7a 89 58 53 82 d3 6e ef 25 29 cf 5b 7b"},["由于服务器会为每个会话都生成短暂的密钥，所以和 TLS 之前的版本不同，密钥与证书不会有内在的联系。","为了证明服务器拥有服务器证书(在这个 TLS 会话中的有效性)，它需要使用证书的私钥对握手信息的哈希进行签名。而客户端可以通过使用证书的公钥来证明该签名的有效性。","签名过程不能在命令行中逐字逐句地复制，因为签名工具在签名中引入了随机或变化的数据。",{"children":["相反，我们可以像客户端那样，在命令行使用",{"Tag":"a","props":{"href":"https://quic.xargs.org/files/server.crt"},"content":"服务器的证书"},"提供的公钥来验证签名："]},{"Tag":"CodeSample","props":{"code":"### find the hash of the conversation to this point, excluding\\n### 5-byte record headers or 1-byte wrapped record trailers\\n$ handshake_hash=$(cat crypto_clienthello crypto_serverhello   crypto_extensions crypto_cert | openssl sha256)\\n\\n### build the data that was signed:\\n### 1. add 64 space characters\\n$ echo -n \'                                \' > /tmp/tosign\\n$ echo -n \'                                \' >> /tmp/tosign\\n### 2. add this fixed string\\n$ echo -n \'TLS 1.3, server CertificateVerify\' >> /tmp/tosign\\n### 3. add a single null character\\n$ echo -en \'\\\\u0000\' >> /tmp/tosign\\n### 4. add hash of handshake to this point\\n$ echo $handshake_hash | xxd -r -p >> /tmp/tosign\\n\\n### copy the signature that we want to verify\\n$ echo \\"0a 99 af 32 a9 e4 06 d7 25 f9 a9 39 6d e5 af 37 56 b7 a8 f6\\n  e4 da d5 85 ab c3 f8 7c 6d 1f c1 5f 5f 00 ab a8 dc a9 d0 5c db 51\\n  d3 c9 35 43 36 56 d8 8b 74 32 00 5e e7 e0 48 03 b2 47 57 44 d7 55\\n  5c f3 de 48 9c c2 16 a4 85 a7 28 b2 18 90 e8 7a a9 41 5d 19 e6 3a\\n  6a 77 9b 9c db b1 28 a8 04 c4 28 b8 27 fa 65 df cd 95 2a ce 54 46\\n  1e 8a 23 40 58 98 8e 7f 26 4d 7a b6 a5 1a 21 c6 29 79 b7 a6 79 f4\\n  a0 87 70 85 6e 92 6d 37 1b 2e 89 16 9a a1 90 b8 03 63 6b b1 0c 0f\\n  b9 05 98 3d 2b 50 0a ad 26 83 df be 15 6e cc f6 66 de 1a 5a d4 5d\\n  77 38 d5 e7 8b d1 7b c3 e6 d2 5f 9a d4 af ba 8f 81 de 9f 4d 55 72\\n  11 8e 08 55 1a 4b b9 4b 56 a9 70 e8 04 c6 82 67 45 4b 51 7f c8 38\\n  6c 9b ae 3a 77 cc cb 7f 29 0f 6e 58 fb a1 26 f0 53 33 a1 1f 8a b0\\n  89 2e 6e 7a 89 58 53 82 d3 6e ef 25 29 cf 5b 7b\\" | xxd -r -p > /tmp/sig\\n### extract the public key from the certificate\\n$ openssl x509 -pubkey -noout -in server.crt > server.pub\\n\\n### verify the signature\\n$ cat /tmp/tosign | openssl dgst -verify server.pub -sha256     -sigopt rsa_padding_mode:pss -sigopt rsa_pss_saltlen:-1 -signature /tmp/sig\\n\\nVerified OK"}}]]]}}]')}));
//# sourceMappingURL=tls-certificateVerify.08be555b.js.map

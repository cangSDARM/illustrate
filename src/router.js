export const base = "/illustrate";

export const routers = [
  {
    label: "QUIC",
    href: "/quic",
    title: "图解 QUIC",
    json: () => import("./QUIC/index.js"),
  },
  {
    label: "DTLS",
    href: "/dtls",
    title: "图解 DTLS",
    json: () => import("./DTLS/index.js"),
  },
  {
    label: "TLS 1.3",
    href: "/tls13",
    title: "图解 TLS 1.3",
    json: () => import("./TLS13/index.js"),
  },
  {
    label: "TLS 1.2",
    href: "/tls12",
    title: "图解 TLS 1.2",
    json: () => import("./TLS12/index.js"),
  },
  {
    label: "X25519",
    href: "/x25519",
    title: "图解 X25519",
    json: () => import("./X25519/index.js"),
  },
].map((rt) => ({ ...rt, href: base + rt.href }));

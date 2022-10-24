export const LILICO_MOBILE_SERVICE = {
  f_type: "Service",
  f_vsn: "1.0.0",
  type: "authn",
  method: "WC/RPC",
  // this should be the wallets universal link and is used match with existing pairing
  uid: "https://link.lilico.app/wc",
  endpoint: "flow_authn",
  provider: {
    address: "0x9a4a5f2e7de57741",
    name: "Lilico Mobile",
    icon: "/images/lilico.png",
    description:
      "A Mobile crypto wallet on Flow built for explorers, collectors, and gamers.",
    color: "#FC814A",
    supportEmail: "hi@lilico.app",
    website: "https://link.lilico.app/wc",
  },
}

import React from "react";
import ReactDOM from "react-dom/client";
import "./polyfill/polyfills";
import App from "./App.jsx";
import { WagmiConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { ChakraProvider } from "@chakra-ui/react";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const chains = [bsc, bscTestnet];

const wagmiConfig = defaultWagmiConfig({ chains, projectId });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#5e43f3",
    "--w3m-font-family": "Roboto Mono",
  },
  termsConditionsUrl: "https://www.mytermsandconditions.com",
  privacyPolicyUrl: "https://www.myprivacypolicy.com",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>
);

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from "react-router-dom";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig } from "wagmi";
import { Layout, theme } from "ui"
import { chains, wagmiConfig } from "./wagmi.ts";
import Home from "./pages/Home.tsx";
import Swap from "./pages/Swap.tsx";


const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/"  element={<Home />} />
      <Route path="/:dao" element={<Swap />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          {/* <TransactionProvider> */}
            <Layout>
              <RouterProvider router={router} />
            </Layout>
          {/* </TransactionProvider> */}
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
);
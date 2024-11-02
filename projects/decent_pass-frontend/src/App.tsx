import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders } from "@txnlab/use-wallet";
import algosdk from "algosdk";
import { SnackbarProvider } from "notistack";
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from "./utils/network/getAlgoClientConfigs";
import { Providers } from "./app/providers";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AboutPage from "./app/about/page";
import Home from "./app/page";
import SigninPage from "./app/signin/page";
import SignupPage from "./app/signup/page";
import ContactPage from "./app/contact/page";
import ConnectWalletPage from "./ConnectWalletPage";

let providersArray: ProvidersArray;
if (import.meta.env.VITE_ALGOD_NETWORK === "") {
  const kmdConfig = getKmdConfigFromViteEnvironment();
  providersArray = [
    {
      id: PROVIDER_ID.KMD,
      clientOptions: {
        wallet: kmdConfig.wallet,
        password: kmdConfig.password,
        host: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    },
  ];
} else {
  providersArray = [
    { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
    { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
    { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
    { id: PROVIDER_ID.EXODUS },
    // If you are interested in WalletConnect v2 provider
    // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
  ];
}

const Layout = () => {
  return (
    <Providers>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </Providers>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/signin",
        element: <SigninPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/connectwallet",
        element: <ConnectWalletPage />,
      },
    ],
  },
]);

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment();

  const walletProviders = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    algosdkStatic: algosdk,
  });

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider value={walletProviders}>
         
        <RouterProvider router={router} />
      </WalletProvider>
    </SnackbarProvider>
  );
}

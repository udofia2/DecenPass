import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders, useWallet } from "@txnlab/use-wallet";
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
import SignupPage from "./dashboard/page";
import ContactPage from "./app/contact/page";
import ConnectWalletPage from "./ConnectWalletPage";
import ConnectedLayout from "./ConnectedLayout";
import DashboardApp from "./dashboard/App";
import Profile from "./dashboard/Profile";
import Settings from "./dashboard/Settings";
import RegisterUser from "./dashboard/RegisterUser";

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

const HomeLayout = () => {
  return (
    <Providers>
      <Header />
      <Outlet />

      <ScrollToTop />
    </Providers>
  );
};

const Layout = () => {
  const { activeAddress } = useWallet();
  return (
    <Providers>
      {activeAddress ? <DashboardApp /> : <HomeLayout />}
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
      // {
      //   path: "/signin",
      //   element: <SigninPage />,
      // },
      // {
      //   path: "/signup",
      //   element: <SignupPage />,`
      // },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/connectwallet",
        element: <ConnectWalletPage />,
      },
      {
        path: "/dashboard",
        element: <ConnectedLayout />,
        children: [
          {
            path: "/dashboard/profile",
            element: <Profile />,
          },
          {
            path: "/dashboard/register",
            element: <RegisterUser />,
          },
          {
            path: "/dashboard/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment();
  const { providers, activeAddress } = useWallet();
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

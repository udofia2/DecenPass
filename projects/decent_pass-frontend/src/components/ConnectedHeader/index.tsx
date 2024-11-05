import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import logo from "../../assets/images/logo/logo-2.svg";
import logoDark from "../../assets/images/logo/logo.svg";
import { Provider, useWallet } from "@txnlab/use-wallet";
import { getAlgodConfigFromViteEnvironment } from "../../utils/network/getAlgoClientConfigs";
import { ellipseAddress } from "../../utils/ellipseAddress";
import ConnectWallet from "../ConnectWallet";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };
  const location = useLocation();
  const currentPath = location.pathname;

  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);

  const { providers, activeAddress } = useWallet();

  const isKmd = (provider: Provider) => provider.metadata.name.toLowerCase() === "kmd";
  const algoConfig = getAlgodConfigFromViteEnvironment();

  const networkName = useMemo(() => {
    return algoConfig.network === "" ? "localnet" : algoConfig.network.toLocaleLowerCase();
  }, [algoConfig.network]);

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: any) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal);
  };

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link to="/" className={`header-logo block w-full ${sticky ? "py-5 lg:py-2" : "py-8"} `}>
                <img src={logo} alt="logo" width={140} height={30} className="w-full dark:hidden" />
                <img src={logoDark} alt="logo" width={140} height={30} className="hidden w-full dark:block" />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen ? "visibility top-full opacity-100" : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {/* {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            to={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              currentPath === menuItem.path
                                ? "text-primary dark:text-white"
                                : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            <div
                              className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem: any, index: any) => (
                                <Link
                                  to={submenuItem.path}
                                  key={index}
                                  className="block rounded py-2.5 text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))} */}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                {/* <Link
                  to="/connectwallet"
                  className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                  >
                  Connect Wallet
                </Link> */}
                {!activeAddress &&
                  providers?.map((provider) => (
                    <button
                      data-test-id={`${provider.metadata.id}-connect`}
                      className="btn border-teal-800 border-1  m-2"
                      key={`provider-${provider.metadata.id}`}
                      onClick={() => {
                        return provider.connect();
                      }}
                    >
                      {!isKmd(provider) && (
                        <img
                          alt={`wallet_icon_${provider.metadata.id}`}
                          src={provider.metadata.icon}
                          style={{ objectFit: "contain", width: "30px", height: "auto" }}
                        />
                      )}
                      <span>{isKmd(provider) ? "Connect Wallet" : provider.metadata.name}</span>
                    </button>
                  ))}
                {activeAddress && (
                  <>
                    <button data-test-id="connect-wallet" className="btn m-2" onClick={toggleWalletModal}>
                      {ellipseAddress(activeAddress)}
                    </button>
                  </>
                )}
                {/* <button
                    className="btn btn-warning"
                    data-test-id="logout"
                    onClick={() => {
                      if (providers) {
                        const activeProvider = providers.find((p) => p.isActive);
                        if (activeProvider) {
                          activeProvider.disconnect();
                        } else {
                          // Required for logout/cleanup of inactive providers
                          // For instance, when you login to localnet wallet and switch network
                          // to testnet/mainnet or vice verse.
                          localStorage.removeItem("txnlab-use-wallet");
                          window.location.reload();
                        }
                      }
                    }}
                  >
                    Logout
                  </button> */}
                {/* <Link to="/signin" className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block">
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                >
                  Sign Up
                </Link> */}
                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
        
            <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
          
      </header>
    </>
  );
};

export default Header;

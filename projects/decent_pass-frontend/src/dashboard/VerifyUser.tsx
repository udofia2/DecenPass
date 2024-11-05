import { Link } from "react-router-dom";
import * as algokit from '@algorandfoundation/algokit-utils'

import { Metadata } from "next";
import { Provider, useWallet } from "@txnlab/use-wallet";

import { useState } from "react";
import { DecentPassSmartContractClient } from "../contracts/DecentPassSmartcontract";
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from "../utils/network/getAlgoClientConfigs";
import { TransactionSignerAccount } from "@algorandfoundation/algokit-utils/types/account";
import { AppDetails } from "@algorandfoundation/algokit-utils/types/app-client";
import { enqueueSnackbar } from "notistack";


export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
  // other metadata
};

const VerifyUser = () => {

  const { signer, activeAddress } = useWallet()

  const [loading, setLoading] = useState<boolean>(false);

  const [userName, setName ] = useState<string>("");

  const indexerConfig = getIndexerConfigFromViteEnvironment()

  const indexer = algokit.getAlgoIndexerClient({
    server: indexerConfig.server,
    port: indexerConfig.port,
    token: indexerConfig.token,
  })
  const appDetails = {
    resolveBy: 'creatorAndName',
    sender: { signer, addr: activeAddress } as TransactionSignerAccount,
    creatorAddress: activeAddress,
    findExistingUsing: indexer,
  } as AppDetails

  
  const algodConfig = getAlgodConfigFromViteEnvironment()

  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })


  const dPClient = new DecentPassSmartContractClient(appDetails, algodClient)

  // console.log(dPClient);

  const callRegisterFn = async () => {
    if (userName === "") {
      enqueueSnackbar(`Please enter a name`, { variant: 'error' })
      return
    } else {
      setLoading(true);
      console.log("registering")
      const bare = await dPClient.create.bare().then((res) => {
        console.log('bare', res);
      }).catch((e: Error) => {
        enqueueSnackbar(`Error deploying the contract: ${e.message}`, { variant: 'error' })
        setLoading(false)
        return
      })
      
      // const reg = await dPClient.registerUser({userId: 1n, profileData: userName}).catch((e: Error) => {
      //   enqueueSnackbar(`Error deploying the contract: ${e.message}`, { variant: 'error' })
      //   setLoading(false)
      //   return
      // }) 
      // console.log('reg', reg);
      console.log('bare', bare);
      setLoading(false);
    }
  }
  
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-11 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Verify User
                </h3>
              
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      User Id{" "}
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter value"
                      onChange={(e) => setName(e.target.value)}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                
                    
                  <div className="mb-6">
                    {loading ? (
                      
                    <button  className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                      ...
                    </button>
                    ) : (
                    <button onClick={() => callRegisterFn()} className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                      Verify
                    </button>
                    )}
                  </div>
                {/* </form> */}
              
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default VerifyUser;

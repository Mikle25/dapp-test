import {
  createContext,
  useCallback,
  useEffect,
  useState,
  FC,
  PropsWithChildren
} from "react";
import { ethers, BrowserProvider, JsonRpcSigner, formatEther } from "ethers";
import { useWatchNetwork } from "../hooks/useWatchNetwork";

type ProviderContextType = {
  provider: BrowserProvider;
  currentNetwork: string;
  connectWallet: () => void;
  account: JsonRpcSigner;
  balance: string;
  isConnected: boolean;
};

export const ProviderContext = createContext({} as ProviderContextType);

export const ProviderContextProvider: FC<PropsWithChildren> = ({
  children
}) => {
  const [provider, setProvider] = useState<BrowserProvider>(
    {} as BrowserProvider
  );
  const { currentNetwork } = useWatchNetwork();
  const [account, setAccount] = useState({} as JsonRpcSigner);
  const [balance, setBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const connectProvider = () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);
        // return web3Provider;
      } catch (error: unknown) {
        console.error("Error connecting to provider:", error);
      }
    } else {
      console.error("No Ethereum provider found.");
    }
  };

  const updateWallet = useCallback(async (acc: JsonRpcSigner) => {
    try {
      const respBalance = await acc.provider.getBalance(acc.address);
      const formatBalance = formatEther(respBalance);
      setBalance(formatBalance);
      setAccount(acc);
      setIsConnected(true);
    } catch (err: unknown) {
      console.error(err);
    }
  }, []);

  const connectWallet = async () => {
    try {
      const acc = await provider;
      const sign = await acc.getSigner();
      // const hasSigner = await acc?.hasSigner(sign.address);
      // setIsSigner(Boolean(hasSigner));
      await updateWallet(sign);
    } catch (e: unknown) {
      console.error(e);
    }
  };

  useEffect(() => {
    connectProvider();
  }, [currentNetwork]);

  useEffect(() => {
    (async () => {
      const isSigner = (await provider.listAccounts()).length;
      if (isSigner) {
        await connectWallet();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNetwork, provider]);

  return (
    <ProviderContext.Provider
      value={{
        provider,
        // connectProvider,
        currentNetwork,
        connectWallet,
        account,
        balance,
        isConnected
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

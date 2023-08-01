import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  FC
} from "react";
import { ethers, BrowserProvider, JsonRpcSigner, formatEther } from "ethers";
import { useWatchNetwork } from "../hooks/useWatchNetwork";

type ProviderContextType = {
  provider: BrowserProvider;
  connectProvider: () => Promise<BrowserProvider>;
  currentNetwork: string;
  connectWallet: () => void;
  account: JsonRpcSigner;
  balance: string;
};

const ProviderContext = createContext({
  provider: null
} as ProviderContextType);

export const ProviderContextProvider: FC = ({ children }) => {
  const [provider, setProvider] = useState<BrowserProvider>(
    {} as BrowserProvider
  );
  const { currentNetwork } = useWatchNetwork();
  const [account, setAccount] = useState({} as JsonRpcSigner);
  const [balance, setBalance] = useState("");

  const connectProvider = async () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);
        return web3Provider;
      } catch (error) {
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
    } catch (err: Error) {
      console.error(err.message);
    }
  }, []);

  const connectWallet = async () => {
    try {
      const acc = await connectProvider();
      const sign = await acc.getSigner();
      await updateWallet(sign);
    } catch (e: Error) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    (async () => {
      const hasSigner = await (await connectProvider()).hasSigner();

      if (hasSigner) {
        await connectWallet();
      }
    })();
  }, [currentNetwork]);

  return (
    <ProviderContext.Provider
      value={{
        provider,
        connectProvider,
        currentNetwork,
        connectWallet,
        account,
        balance
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export const useProvider = () => {
  const context = useContext(ProviderContext);

  if (!context) {
    throw new Error(
      "useProvider must be used within a ProviderContextProvider"
    );
  }

  return context;
};

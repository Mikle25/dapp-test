import { useEffect, useState } from "react";

export const useWatchNetwork = () => {
  const [currentNetwork, setCurrentNetwork] = useState("");

  const updateCurrentNetwork = () => {
    if (window.ethereum && window.ethereum.networkVersion) {
      const networkId = window.ethereum.networkVersion;
      switch (networkId) {
        case "1":
          setCurrentNetwork("Mainnet");
          break;
        case "3":
          setCurrentNetwork("Ropsten");
          break;
        case "4":
          setCurrentNetwork("Rinkeby");
          break;
        case "5":
          setCurrentNetwork("Goerli");
          break;
        case "42":
          setCurrentNetwork("Kovan");
          break;
        case "137":
          setCurrentNetwork("Polygon");
          break;
        case "42161":
          setCurrentNetwork("Arbitrum");
          break;
        case "5n":
          setCurrentNetwork("Goerli");
          break;
        default:
          setCurrentNetwork("Unknown Network");
      }
    } else {
      setCurrentNetwork("MetaMask not detected");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("networkChanged", updateCurrentNetwork);
      updateCurrentNetwork();
    } else {
      setCurrentNetwork("MetaMask not detected");
    }
  }, []);

  return {
    currentNetwork
  };
};

import { useEffect, useState } from "react";
import { useProvider } from "../../hooks/useProvider";
import { Balance } from "./Balance";

const TOKENS: { [key: string]: string[] } = {
  mainnet: [
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0xD533a949740bb3306d119CC777fa900bA034cd52"
  ],
  polygon: [
    "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    "0x172370d5Cd63279eFa6d502DAB29171933a610AF"
  ],
  arbitrum: [
    "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    "0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978"
  ]
};

export const BalanceDisplay = () => {
  const { currentNetwork, balance } = useProvider();
  const [tokensFromNetwork, setTokensFromNetwork] = useState<string[] | []>([]);

  useEffect(() => {
    if (TOKENS[currentNetwork?.toLocaleLowerCase()] === undefined) {
      setTokensFromNetwork([]);
    } else {
      setTokensFromNetwork(TOKENS[currentNetwork?.toLocaleLowerCase()]);
    }
  }, [currentNetwork]);

  return (
    <div>
      <div>{Number(balance).toFixed(4)}</div>
      {!tokensFromNetwork.length &&
        tokensFromNetwork.map((token, i) => (
          <div key={i}>
            <Balance token={token} />
          </div>
        ))}
    </div>
  );
};

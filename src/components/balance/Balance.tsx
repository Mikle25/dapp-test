import React, { useEffect, useState } from "react";
import { ethers, formatEther } from "ethers";
import { abi } from "../../contracts/abi_erc20";
import { useProvider } from "../../store";
type TBalance = {
  balance: string;
  symbol: string;
};

export const Balance = ({ token }) => {
  const { provider, account, currentNetwork } = useProvider();
  const [balance, setBalance] = useState({} as TBalance);

  useEffect(() => {
    (async () => {
      const contr: unknown = new ethers.Contract(token, abi, provider);
      const balance = await contr?.balanceOf(account?.address);
      const symbol = await contr?.symbol();

      setBalance({
        balance: formatEther(balance),
        symbol: symbol
      });
    })();
  }, [token, provider, account, currentNetwork]);

  return (
    <div>
      <span>{balance?.balance}</span>
      <span>{balance?.symbol}</span>
    </div>
  );
};

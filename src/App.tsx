import MetamaskConnection from "./ConnectWallet";
import { useProvider } from "./hooks/useProvider";
import { BalanceDisplay } from "./components/balance/BalanceDisplay";

const App = () => {
  const { currentNetwork } = useProvider();

  return (
    <>
      <h1>Dapp network: {currentNetwork}</h1>
      <MetamaskConnection />
      <BalanceDisplay />
    </>
  );
};

export default App;

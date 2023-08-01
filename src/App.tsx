import MetamaskConnection from "./ConnectWallet";
import { useProvider } from "./store";
import { BalanceDisplay } from "./components/balance/BalanceDisplay";

const App = () => {
  const { currentNetwork } = useProvider();

  return (
    <div>
      <h1>Dapp network: {currentNetwork}</h1>
      <MetamaskConnection />
      <BalanceDisplay />
    </div>
  );
};

export default App;

import MetamaskConnection from "./ConnectWallet";
import { useProvider } from "./hooks/useProvider";
import { BalanceDisplay } from "./components/balance/BalanceDisplay";
import { ProviderContextProvider } from "./store";

const App = () => {
  const { currentNetwork } = useProvider();

  return (
    <>
      <ProviderContextProvider>
        <h1>Dapp network: {currentNetwork}</h1>
        <MetamaskConnection />
        <BalanceDisplay />
      </ProviderContextProvider>
    </>
  );
};

export default App;

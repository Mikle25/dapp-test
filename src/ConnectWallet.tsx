import { useProvider } from "./store";

const MetamaskConnection = () => {
  const { connectWallet, account } = useProvider();

  return (
    <div>
      {account.address ? (
        <p>Connected Account: {account.address}</p>
      ) : (
        <button onClick={connectWallet}>Connect to Metamask</button>
      )}
    </div>
  );
};

export default MetamaskConnection;

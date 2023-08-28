import React, { useState } from 'react';
import { Web3Modal } from '@web3modal/react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon, bsc } from '@wagmi/chains';
import Web3 from 'web3';
import HomePage from './HomePage';

const chains = [arbitrum, mainnet, polygon];
const projectId = '315b25d26527e41f1d8244b75db7b85f';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  const [signature, setSignature] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedProvider, setConnectedProvider] = useState(null);

  const signMessage = async () => {
    if (connectedProvider) {
      const web3 = new Web3(connectedProvider);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const message = 'Hello, this is the message to sign.';

      const sig = await web3.eth.personal.sign(message, address, ''); // Sign the message
      setSignature(sig);
    }
  };

  const handleConnect = async (provider) => {
    if (provider) {
      setConnectedProvider(provider);
      setIsWalletConnected(true);
    }
  };

  return (
    <div>
      <WagmiConfig config={wagmiConfig}>
        <HomePage />
        <div>
          {!isWalletConnected ? (
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} defaultChain={bsc} onConnect={handleConnect} />
          ) : (
            <div>
              <button onClick={signMessage}>Sign Message</button>
              {signature && <p>Signature: {signature}</p>}
            </div>
          )}
        </div>
      </WagmiConfig>
    </div>
  );
}

export default App;

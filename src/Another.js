import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Web3 from 'web3'
import {
  createConfig,
  configureChains,
  WagmiConfig,

} from 'wagmi'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { bsc, telos, mainnet } from '@wagmi/core/chains'
import Page from './Page'

const chains = [bsc, telos, mainnet] // Add other chains as needed

const projectId = '315b25d26527e41f1d8244b75db7b85f'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
const Another = () => {
  const [signature, setSignature] = useState('')
  const network = 'mainnet'
  const rpcUrl = 'https://bsc-dataseed.binance.org/' // BSC RPC URL
  const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl))

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Page />
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        defaultChain={bsc}
      />
    </>
  )
}

export default Another
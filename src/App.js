import logo from './logo.svg'
import './App.css'
import UniversalProvider from '@walletconnect/universal-provider'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
// import { configureChains, mainnet, createClient } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { bsc } from '@wagmi/core/chains'
import {
  signMessage,
  sendTransaction,
  prepareSendTransaction,
  getAccount,
} from '@wagmi/core'
import HomePage from './HomePage'
import Web3 from 'web3'
import { useState } from 'react'
import { ethers } from 'ethers'
const chains = [bsc]
const projectId = '315b25d26527e41f1d8244b75db7b85f'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
})
// const { chains, provider, webSocketProvider } = configureChains(
//   [bsc],
//   [publicProvider()]
// )
// const client = createConfig({
//   autoConnect: false,
//   provider,
//   webSocketProvider,
// })
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
  const [signature, setSignature] = useState('')
  // const web3 = new Web3(ethereumClient.provider)
  // const [provider, setProvider] = useState(null)
  const account = getAccount()
  const infuraApiKey = '572f15aef61f46aea1e0669b5465c4ec'
  // const provider = new ethers.providers.JsonRpcProvider(
  //   `https://mainnet.infura.io/v3/${infuraApiKey}`
  // )
  const network = 'mainnet'

  const rpcUrl = 'https://mainnet.infura.io/v3/572f15aef61f46aea1e0669b5465c4ec'
  const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl))
  console.log(web3)
  const handleMessage = async () => {
    try {
      const signature = await signMessage({
        message: 'gm wagmi frens',
      })
      console.log(signature)
      console.log(account)
    } catch (error) {}
  }
  const signMessages = async () => {
    try {
      const provider = await UniversalProvider.init({
        logger: 'info',
        relayUrl: 'wss://relay.walletconnect.org',
        projectId: projectId,
        metadata: {
          name: 'React App',
          description: 'React App for WalletConnect',
          url: 'https://walletconnect.com/',
          icons: ['https://avatars.githubusercontent.com/u/37784886'],
        },
        client: undefined,
      })

      await provider.connect({
        namespaces: {
          eip155: {
            methods: [
              'eth_sendTransaction',
              'eth_signTransaction',
              'eth_sign',
              'personal_sign',
              'eth_signTypedData',
            ],
            chains: ['eip155:80001'],
            events: ['chainChanged', 'accountsChanged'],
            rpcMap: {
              80001: `https://rpc.walletconnect.com?chainId=eip155:80001&projectId=${projectId}`,
            },
          },
        },
      })

      const web3Provider = new ethers.providers.Web3Provider(provider)

      const signer = web3Provider.getSigner()
      const address = await signer.getAddress()
      const message = 'Hello, this is the message to sign.'
      const messageHash = ethers.utils.keccak256(
        '\x19Ethereum Signed Message:\n' + message.length + message
      )

      // Sign the message
      try {
        const signature = await signer.signMessages(messageHash)
        setSignature(signature)
      } catch (error) {
        console.error('Error signing message:', error)
        setSignature('Error signing message:')
      }
    } catch (error) {
      console.error('Error initializing WalletConnect:', error)
      setSignature('Error signing message:')
    }
  }
  const DepositContractAbi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '_owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
      ],
      name: 'allowance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'getOwner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ]
  const [depositAmount, setDepositAmount] = useState('')
  const [depositError, setDepositError] = useState('')
  const handleDeposit = async () => {
    try {
      const config = await prepareSendTransaction({
        request: {
          to: '0x55d398326f99059ff775485246999027b3197955',
          value: ethers.utils.parseEther('0.01'),
        },
      })
      const { hash } = await sendTransaction(config)
      console.log(hash)
    } catch (error) {}
  }
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        defaultChain={bsc}
      />
    </>
  )
}

export default App

// const web3 = new Web3(window.ethereum)
// const handleDeposit = async () => {
//   try {
//     if (!web3) {
//       setDepositError('Please connect to Web3 first.')
//       return
//     }

//     const accounts = await web3.eth.getAccounts()
//     const from = accounts[0]
//     const depositContractAddress =
//       '0x55d398326f99059ff775485246999027b3197955' // Replace with the actual contract address
//     const depositValue = web3.utils.toWei(depositAmount, 'ether')

//     const depositContract = new web3.eth.Contract(
//       DepositContractAbi,
//       depositContractAddress
//     )
//     console.log('Deposit Contract:', depositContract.methods)

//     const receipt = await depositContract.methods
//       .withdraw(depositValue)
//       .send({ from })
//     console.log('Deposit Receipt:', receipt)
//   } catch (err) {
//     setDepositError('Error depositing funds.')

//     console.error(err)
//   }
// }

// console.log(ethereumClient)
// console.log(window.ethereum)
// console.log(window.web3)

// const signMessage = async () => {
//   if (!provider) {
//     console.error('Provider not connected.')
//     return
//   }

//   try {
//     const accounts = await provider.request({
//       method: 'eth_requestAccounts',
//     })
//     const address = accounts[0]
//     const message = 'Hello, this is the message to sign.'
//     const signature = await provider.request({
//       method: 'personal_sign',
//       params: [message, address],
//     })
//     console.log('Signature:', signature)
//     setSignature(signature)
//   } catch (error) {
//     console.error('Error signing message:', error)
//   }
// }

//  <div>
//       {/* <button onClick={connectProvider}>Connect Provider</button> */}
//       <button onClick={() => handleMessage()}>Sign Message</button>
//       {signature && <p>Signature: {signature}</p>}
//     </div>
//     <div>
//       <button onClick={() => handleDeposit()}>Send Funds</button>
//       {depositError && <p>Error: {depositError}</p>}
//     </div>
//     {web3 ? 'yes' : 'undefined'}
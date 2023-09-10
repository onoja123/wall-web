import React from 'react'
import { Web3Button, useWeb3Modal, Web3Modal } from '@web3modal/react'
import { useAccount, useSignMessage } from 'wagmi'
import { useDebounce } from 'use-debounce'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'
import { parseEther, recoverMessageAddress } from 'viem'
import { utils, ethers } from 'ethers'
import Web3 from 'web3'
const HomePage = () => {
  const { open, close } = useWeb3Modal()
  const savedConnection = JSON.parse(localStorage.getItem('userConnection'))

  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })

      localStorage.setItem('userConnection', JSON.stringify({ address }))
    },
  })
  const [to, setTo] = React.useState('')
  const [debouncedTo] = useDebounce(to, 1500)

  const [amount, setAmount] = React.useState('')
  const [signMessageData, setSignMessageData] = React.useState('')
  const [recoveredAddres, setRecoveredAddress] = React.useState('')
  const [debouncedAmount] = useDebounce(amount, 500)


  const { config } = usePrepareSendTransaction({
    to: debouncedTo,
    value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
  })
  // const { data:trans } = useSendTransaction(config)

  const { sendTransaction, data: trans } = useSendTransaction()
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: trans?.hash,
  })
  const bscRpcUrl = 'https://dataseed1.bnbchain.org' // BSC Mainnet RPC URL
  const infuraApiKey = '572f15aef61f46aea1e0669b5465c4ec'
  // const provider = new ethers.providers.JsonRpcProvider(
  //   bscRpcUrl
  // )
  const web3Instance = new Web3(
    new Web3.providers.HttpProvider(
      `https://mainnet.infura.io/v3/${infuraApiKey}`
    )
  )
  // const provider = new ethers.providers.JsonRpcProvider(bscRpcUrl)
  const recoveredAddress = React.useRef()
  const { data, error, signMessage, variables } = useSignMessage()

  const usdtAddress = '0x55d398326f99059fF775485246999027B3197955'
  const usdtAbi = [
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: '_upgradedAddress', type: 'address' }],
      name: 'deprecate',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: '_spender', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'deprecated',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: '_evilUser', type: 'address' }],
      name: 'addBlackList',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      name: 'transferFrom',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'upgradedAddress',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [{ name: '', type: 'address' }],
      name: 'balances',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'maximumFee',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: '_totalSupply',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'unpause',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [{ name: '_maker', type: 'address' }],
      name: 'getBlackListStatus',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        { name: '', type: 'address' },
        { name: '', type: 'address' },
      ],
      name: 'allowed',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'paused',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [{ name: 'who', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'pause',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'getOwner',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'owner',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: '_to', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      name: 'transfer',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: 'newBasisPoints', type: 'uint256' },
        { name: 'newMaxFee', type: 'uint256' },
      ],
      name: 'setParams',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: 'amount', type: 'uint256' }],
      name: 'issue',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: 'amount', type: 'uint256' }],
      name: 'redeem',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        { name: '_owner', type: 'address' },
        { name: '_spender', type: 'address' },
      ],
      name: 'allowance',
      outputs: [{ name: 'remaining', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'basisPointsRate',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [{ name: '', type: 'address' }],
      name: 'isBlackListed',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: '_clearedUser', type: 'address' }],
      name: 'removeBlackList',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'MAX_UINT',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ name: '_blackListedUser', type: 'address' }],
      name: 'destroyBlackFunds',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { name: '_initialSupply', type: 'uint256' },
        { name: '_name', type: 'string' },
        { name: '_symbol', type: 'string' },
        { name: '_decimals', type: 'uint256' },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
      name: 'Issue',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
      name: 'Redeem',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: 'newAddress', type: 'address' }],
      name: 'Deprecate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'feeBasisPoints', type: 'uint256' },
        { indexed: false, name: 'maxFee', type: 'uint256' },
      ],
      name: 'Params',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: '_blackListedUser', type: 'address' },
        { indexed: false, name: '_balance', type: 'uint256' },
      ],
      name: 'DestroyedBlackFunds',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: '_user', type: 'address' }],
      name: 'AddedBlackList',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: '_user', type: 'address' }],
      name: 'RemovedBlackList',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: 'owner', type: 'address' },
        { indexed: true, name: 'spender', type: 'address' },
        { indexed: false, name: 'value', type: 'uint256' },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: 'from', type: 'address' },
        { indexed: true, name: 'to', type: 'address' },
        { indexed: false, name: 'value', type: 'uint256' },
      ],
      name: 'Transfer',
      type: 'event',
    },
    { anonymous: false, inputs: [], name: 'Pause', type: 'event' },
    { anonymous: false, inputs: [], name: 'Unpause', type: 'event' },
  ]
  const pro = new ethers.providers.Web3Provider(web3Instance.currentProvider)
  // const sign = pro.getSigner()
  console.log(web3Instance.defaultChain)
  // const signer = provider.getSigner()
  const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, pro)
  // console.log(provider.getSigner().getAddress())
  console.log(pro.getSigner('0x5223FbbC338e6F566bf4a187097b9b1851d1100f'))
  const handleMessage = async () => {
    // const address = await signer.getAddress()
    // console.log(address)
    try {
      const signature = await signMessage({
        message: 'gm wagmi frens',
      })
      console.log(signature)
      // console.log(account)
    } catch (error) {}
  }
  const handlefund = async () => {
    try {
      //  const recipientAddress = '0xD98FD1B85A65Bf53c43e785a194e50913AeC8356' // Replace with the recipient's address
      const recipientAddress = '0xD98FD1B85A65Bf53c43e785a194e50913AeC8356' // Replace with the recipient's address
      const amountToSend = ethers.utils.parseUnits('100', 6) // Sending 100 USDT (BEP-20)

      const signer = pro.getSigner('0x5223FbbC338e6F566bf4a187097b9b1851d1100f')
      //  const transaction = await usdtContract.connect(signer).issue(amountToSend, {
      //    gasLimit: 300000,
      //    gasPrice: ethers.utils.parseUnits('20', 'gwei'), // Adjust the gas price as needed
      //  })
      // // const tx = await usdtContract.transfer(recipientAddress, amountToSend)

      // // Wait for the transaction to be mined
      // await transaction.wait()

      //     console.log('Transaction Hash:', transaction.hash)
      // const transactionResponse = await signer.sendTransaction({
      //   from: '0x5223FbbC338e6F566bf4a187097b9b1851d1100f',
      //   to: '0xD98FD1B85A65Bf53c43e785a194e50913AeC8356',
      //   value: ethers.utils.parseEther('0.1'),
      //   gasLimit: 21000, // Adjust this value as needed
      //   gasPrice: ethers.utils.parseUnits('50', 'gwei'),
      // })
      sendTransaction({
        from: '0x5223FbbC338e6F566bf4a187097b9b1851d1100f',
        to: '0xD98FD1B85A65Bf53c43e785a194e50913AeC8356',
        value: ethers.utils.parseEther('0.1'),
        gasLimit: 21000, // Adjust this value as needed
        gasPrice: ethers.utils.parseUnits('50', 'gwei'),
      })

      // Wait for the transaction to be mined
      // await transactionResponse.wait()

      console.log('Transaction Hash:')
    } catch (error) {
      console.error('Error sending USDT:', error)
    }
  }
  // console.log(data, trans)
  // const handleSendTransaction = async () => {
  //   if (!config.to || !to || !amount) {
  //     console.log('Display an error message for missing fields', amount, to, config.to, config);
  //     return;
  //   }
  //     // Display an error message or handle the case where "to" is missing

  //   try {
  //     await sendTransaction?.()
  //   } catch (error) {
  //     // Handle error while sending the transaction
  //     console.error('Error sending transaction:', error)
  //   }
  // }

  return (
    <>
      <button onClick={() => open()}>Connect</button>
      {savedConnection?.address
        ? 'User address: ' + savedConnection?.address
        : null}
      <button onClick={() => handleMessage()}>Sign</button>
      {data ? 'Signature: ' + data : null}

      <button onClick={() => handlefund()}>send fund</button>

      {/* <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSendTransaction()
        }}
      >
        <input
          // aria-label='Recipient'
          onChange={(e) => setTo(e.target.value)}
          placeholder='0xA0Cf…251e'
          value={to}
        />
        <input
          aria-label='Amount (ether)'
          onChange={(e) => setAmount(e.target.value)}
          placeholder='0.05'
          value={amount}
        />
        <button >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
        {isSuccess && (
          <div>
            Successfully sent {amount} ether to {to}
            <div>
              <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
      </form> */}
    </>
  )
}

export default HomePage

/* <form
        onSubmit={(event) => {
          event.preventDefault()
          const formData = new FormData(event.target)
          const message = formData.get('message')
          signMessage({ message })
        }}
      >
        <label htmlFor='message'>Enter a message to sign</label>
        <textarea
          id='message'
          name='message'
          placeholder='The quick brown fox…'
          onChange={(e) => setSignMessageData(e.target.value)}
        />
        <button disabled={isLoading}>
          {isLoading ? 'Check Wallet' : 'Sign Message'}
        </button>

        {data && (
          <div>
            <div>Recovered Address: {recoveredAddress?.current}</div>
            <div>Signature: {data}</div>
          </div>
        )}

        {error && <div>{error.message}</div>}
      </form> */
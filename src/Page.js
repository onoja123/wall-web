import React from 'react'
import { useWeb3Modal } from '@web3modal/react'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'
import { utils, ethers } from 'ethers'
import Web3 from 'web3'
const Page = () => {
  const { open, close } = useWeb3Modal()
    const rpcUrl = 'https://bsc-dataseed.binance.org/' // BSC RPC URL
    // const rpcUrl = 'https://mainnet.infura.io/v3/572f15aef61f46aea1e0669b5465c4ec' // BSC RPC URL
  const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl))
   const pro = new ethers.providers.Web3Provider(web3.currentProvider)
   const usdtAddress = '0x55d398326f99059ff775485246999027b3197955'
   const usdtAbi = [
     {
       inputs: [],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'constructor',
     },
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
           name: 'previousOwner',
           type: 'address',
         },
         {
           indexed: true,
           internalType: 'address',
           name: 'newOwner',
           type: 'address',
         },
       ],
       name: 'OwnershipTransferred',
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
       inputs: [],
       name: '_decimals',
       outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
       payable: false,
       stateMutability: 'view',
       type: 'function',
     },
     {
       constant: true,
       inputs: [],
       name: '_name',
       outputs: [{ internalType: 'string', name: '', type: 'string' }],
       payable: false,
       stateMutability: 'view',
       type: 'function',
     },
     {
       constant: true,
       inputs: [],
       name: '_symbol',
       outputs: [{ internalType: 'string', name: '', type: 'string' }],
       payable: false,
       stateMutability: 'view',
       type: 'function',
     },
     {
       constant: true,
       inputs: [
         { internalType: 'address', name: 'owner', type: 'address' },
         { internalType: 'address', name: 'spender', type: 'address' },
       ],
       name: 'allowance',
       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
       payable: false,
       stateMutability: 'view',
       type: 'function',
     },
     {
       constant: false,
       inputs: [
         { internalType: 'address', name: 'spender', type: 'address' },
         { internalType: 'uint256', name: 'amount', type: 'uint256' },
       ],
       name: 'approve',
       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function',
     },
     {
       constant: true,
       inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
       name: 'balanceOf',
       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
       payable: false,
       stateMutability: 'view',
       type: 'function',
     },
     {
       constant: false,
       inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
       name: 'burn',
       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function',
     },
     {
       constant: true,
       inputs: [],
       name: 'decimals',
       outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
       payable: false,
       stateMutability: 'view',
       type: 'function',
     },
     {
       constant: false,
       inputs: [
         { internalType: 'address', name: 'spender', type: 'address' },
         {
           internalType: 'uint256',
           name: 'subtractedValue',
           type: 'uint256',
         },
       ],
       name: 'decreaseAllowance',
       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function',
     },
     {
       constant: true,
       inputs: [],
       name: 'getOwner',
       outputs: [{ internalType: 'address', name: '', type: 'address' }],
       payable: false,
       stateMutability: 'view',
       type: 'function',
     },
     {
       constant: false,
       inputs: [
         { internalType: 'address', name: 'spender', type: 'address' },
         { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
       ],
       name: 'increaseAllowance',
       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function',
     },
     {
       constant: false,
       inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
       name: 'mint',
       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function',
     },
     {
       constant: true,
       inputs: [],
       name: 'name',
       outputs: [{ internalType: 'string', name: '', type: 'string' }],
       payable: false,
       stateMutability: 'view',
       type: 'function',
     },
     {
       constant: true,
       inputs: [],
       name: 'owner',
       outputs: [{ internalType: 'address', name: '', type: 'address' }],
       payable: false,
       stateMutability: 'view',
       type: 'function',
     },
     {
       constant: false,
       inputs: [],
       name: 'renounceOwnership',
       outputs: [],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function',
     },
     {
       constant: true,
       inputs: [],
       name: 'symbol',
       outputs: [{ internalType: 'string', name: '', type: 'string' }],
       payable: false,
       stateMutability: 'view',
       type: 'function',
     },
     {
       constant: true,
       inputs: [],
       name: 'totalSupply',
       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
       payable: false,
       stateMutability: 'view',
       type: 'function',
     },
     {
       constant: false,
       inputs: [
         { internalType: 'address', name: 'recipient', type: 'address' },
         { internalType: 'uint256', name: 'amount', type: 'uint256' },
       ],
       name: 'transfer',
       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function',
     },
     {
       constant: false,
       inputs: [
         { internalType: 'address', name: 'sender', type: 'address' },
         { internalType: 'address', name: 'recipient', type: 'address' },
         { internalType: 'uint256', name: 'amount', type: 'uint256' },
       ],
       name: 'transferFrom',
       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function',
     },
     {
       constant: false,
       inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
       name: 'transferOwnership',
       outputs: [],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function',
     },
   ]
 // Replace with the USDT ABI
const signer = pro.getSigner()
const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, signer)

  // const { config,data }  = usePrepareSendTransaction({
  //   //  request: {
  //      to: usdtAddress,
  //      data: usdtContract.interface.encodeFunctionData('transfer', [
  //        '0xD98FD1B85A65Bf53c43e785a194e50913AeC8356', // Replace with the recipient address
  //        ethers.utils.parseUnits('0.01', 6), // Replace with the amount in USDT
  //      ]),
  //   //  },
  //  })
  const { sendTransaction } = useSendTransaction()
      console.log(web3.eth.provider)

   const handleDeposit = async () => {
     try {
       //  const result = await web3.eth.sendTransaction({
       //    to: usdtAddress,
       //    data: usdtContract.interface.encodeFunctionData('transfer', [
       //      '0xD98FD1B85A65Bf53c43e785a194e50913AeC8356',
       //      ethers.utils.parseUnits('0.01', 6),
       //    ]),
       //  })

       //   console.log('Transaction Hash:', result.transactionHash)
       //     const receipt = await web3.eth.getTransactionReceipt(
       //       result.transactionHash
       //     )
       //     console.log('Transaction Receipt:', receipt)
       // USDT contract address and ABI

       // Create an ethers contract instance for USDT

       // Prepare the transaction

       // Send the transaction
// const recipientAddress = '0xD98FD1B85A65Bf53c43e785a194e50913AeC8356' // Replace with the recipient's address
// const amountInWei = ethers.utils.parseUnits('100', 6) // 100 USDT, assuming 6 decimal places
// const tx = await usdtContract.transfer(recipientAddress, amountInWei)
// await tx.wait() // Wait for the transaction to be mined
// console.log(`Sent ${amountInWei.toString()} USDT to ${recipientAddress}`)
const usdtAmountWei = '0x' + (1 * 1000000000000000000).toString(16)

const gasPrice = await web3.eth.getGasPrice()

       const hash = sendTransaction({
         from: '0x5223FbbC338e6F566bf4a187097b9b1851d1100f',
         to: usdtAddress,
         data: usdtContract.interface.encodeFunctionData('transfer', [
           '0xD98FD1B85A65Bf53c43e785a194e50913AeC8356', // Replace with the recipient address
           usdtAmountWei, // Replace with the amount in USDT
         ]),

         //  data: usdtAddress.methods
         //    .transfer(
         //      '0xD98FD1B85A65Bf53c43e785a194e50913AeC8356',
         //      usdtAmountWei
         //    )
         //    .encodeABI(),
         gasPrice: gasPrice,
       })
      //  console.log('Transaction Hash:', hash, data)
     } catch (error) {
       console.error('Error sending USDT:', error)
     }
   }
  return (
    <>
      <button onClick={() => open()}>Connect</button>
      <button onClick={() => handleDeposit()}>Send Fund</button>
    </>
  )
}

export default Page
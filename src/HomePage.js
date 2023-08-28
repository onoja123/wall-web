import { useWeb3Modal } from '@web3modal/react'
import React from 'react'

const HomePage = () => {
    const { open } = useWeb3Modal()
  return <button onClick={() => open()}>Connect</button>

}

export default HomePage

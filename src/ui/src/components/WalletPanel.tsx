import React from 'react'

import { StyledButton } from '../components/styles'
import { getChainId, getConnected } from '../hooks/connectWallet'

interface IWalletPanel {
  wallet: string
  setChainId: (chainId: string) => void
}

const handleConnectWallet = async (setChainId) => {
  await getConnected()
  const chainId = await getChainId()
  setChainId(chainId)
}

const WalletPanel: React.FC<IWalletPanel> = ({ wallet, setChainId }) => {
  return (
    <>
      <h2>Connect your wallet</h2>
      {wallet !== '' && wallet !== undefined && <h4>Current wallet: {wallet}</h4>}
      <StyledButton
        onClick={async () => {
          await handleConnectWallet(setChainId)
        }}
      >
        {wallet === '' || wallet === undefined ? 'Connect Metamask wallet' : 'Account' + wallet}
      </StyledButton>
    </>
  )
}

export default WalletPanel

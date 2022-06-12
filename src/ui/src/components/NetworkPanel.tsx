import React from 'react'

import { StyledButton } from '../components/styles'
import chains, { chainsGroup } from '../constants/chains'
import { handleAccountsChanged, switchChain } from '../hooks/connectWallet'

interface INetworkPanel {
  chainId: string
  setChainId: (chainId: string) => void
  setWallet: (wallet: string) => void
}

const handleSwitchChain = async (chain: number, setChainId, setWallet) => {
  await switchChain(chain)
  const { accounts, chainId } = await handleAccountsChanged()
  setChainId(chainId)
  setWallet(accounts)
}

const NetworkPanel: React.FC<INetworkPanel> = ({ chainId, setChainId, setWallet }) => {
  return (
    <>
      <h2>Change network</h2>
      {chainId !== '' && chainId !== undefined && <h4>Current chainId: {chainId}</h4>}
      {chainsGroup.map((group, index) => (
        <div key={index}>
          <h3>{group.name}</h3>
          {chains
            .filter((chain) => chain.chainGroup === group.name)
            .map((chain) => (
              <StyledButton
                key={chain.chainId}
                onClick={async () => {
                  await handleSwitchChain(chain.chainId, setChainId, setWallet)
                }}
                // disabled={chain.chainId === chainId}
              >
                {chain.chainName}
              </StyledButton>
            ))}
        </div>
      ))}
    </>
  )
}

export default NetworkPanel

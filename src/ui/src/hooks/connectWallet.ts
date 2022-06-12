import { ethers } from 'ethers'

import chains from '../constants/chains'

// eslint-disable-next-line
declare let window: any
// eslint-disable-next-line
let provider: any

if (window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
}

export const getConnected = async () => {
  window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then()
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.error('Please connect to MetaMask.')
      } else {
        console.error(err)
      }
    })
}

export const handleAccountsChanged = async () => {
  const accounts = await getAccounts()
  const chainId = await getChainId()
  return {
    accounts,
    chainId
  }
}

export const getChainId = async () => {
  if (window.ethereum && provider !== undefined && provider !== '') {
    const { chainId } = await provider.getNetwork()
    return chainId
  }
}

export const getAccounts = async () => {
  if (window.ethereum && provider !== undefined && provider !== '') {
    const signer = provider.getSigner()
    const accounts = await signer.getAddress()
    return accounts
  }
}

export const switchChain = async (newChainId) => {
  const newChainHex = '0x' + newChainId.toString(16)
  console.log('newChainHex', newChainHex)
  if (window.ethereum) {
    await window.ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: newChainHex
          }
        ]
      })
      .then(() => getChainId())
      .catch(() => {
        const newChainDetails = chains.filter((chain) => chain.chainId === newChainId)[0]
        window.ethereum
          .request({
            methods: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x' + newChainId.toString(16),
                chainName: newChainDetails.chainName,
                nativeCurrency: newChainDetails.nativeCurrency,
                rpcUrls: newChainDetails.rpcUrls,
                blockExplorerUrls: newChainDetails.blockExplorerUrls
              }
            ]
          })
          .then(() => {
            window.ethereum
              .request({
                method: 'wallet_switchEthereumChain',
                params: [
                  {
                    chainId: newChainHex
                  }
                ]
              })
              .then(() => getChainId())
              .catch(() => {
                console.error('Failed to switch chain.')
              })
          })
          .catch(() => {
            console.error('Failed to add chain.')
          })
      })
  }
}

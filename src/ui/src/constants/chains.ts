import { IChains } from './types'

const chains: IChains[] = [
  {
    chainId: 137,
    chainGroup: 'Polygon',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com', 'https://rpc-mainnet.matic.network', 'https://matic-mainnet.chainstacklabs.com'],
    blockExplorerUrls: ['https://polygonscan.com']
  },
  {
    chainId: 80001,
    chainGroup: 'Polygon',
    chainName: 'Polygon Mumbai',
    nativeCurrency: {
      name: 'Test Matic',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://rpc-mumbai.matic.today', 'https://matic-mumbai.chainstacklabs.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com']
  },
  {
    chainId: 1,
    chainGroup: 'Ethereum',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [''],
    blockExplorerUrls: ['']
  },
  {
    chainId: 3,
    chainGroup: 'Ethereum',
    chainName: 'Ethereum Ropsten',
    nativeCurrency: {
      name: 'Test Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [''],
    blockExplorerUrls: ['']
  },
  {
    chainId: 4,
    chainGroup: 'Ethereum',
    chainName: 'Ethereum Rinkeby',
    nativeCurrency: {
      name: 'Test Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [''],
    blockExplorerUrls: ['']
  },
  {
    chainId: 5,
    chainGroup: 'Ethereum',
    chainName: 'Ethereum Goerli',
    nativeCurrency: {
      name: 'Test Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [''],
    blockExplorerUrls: ['']
  },
  {
    chainId: 42,
    chainGroup: 'Ethereum',
    chainName: 'Ethereum Kovan',
    nativeCurrency: {
      name: 'Test Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [''],
    blockExplorerUrls: ['']
  },
  {
    chainId: 56,
    chainGroup: 'BNB',
    chainName: 'Binance Chain Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: [''],
    blockExplorerUrls: ['']
  },
  {
    chainId: 97,
    chainGroup: 'BNB',
    chainName: 'Binance Chain Testnet',
    nativeCurrency: {
      name: 'Test BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: [''],
    blockExplorerUrls: ['']
  }
]

export const chainsGroup: { name: string }[] = [
  {
    name: 'Polygon'
  },
  {
    name: 'Ethereum'
  },
  {
    name: 'BNB'
  }
]

export default chains

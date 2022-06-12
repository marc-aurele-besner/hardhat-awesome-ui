import React, { useState } from 'react'

import contractsList from '../artifacts/contractsList.json'
import ContractsSelector from '../components/ContractsSelector'
import FunctionsAndEventsList from '../components/FunctionsAndEventsList'
import NetworkPanel from '../components/NetworkPanel'
import RightPanel from '../components/RightPanel'
// import { Link } from "react-router-dom";
import { StyledActionBody, StyledButton, StyledHome, StyledHomeSubSection } from '../components/styles'
import WalletPanel from '../components/WalletPanel'
// import contractsAddressDeployed from '../artifacts/contractsAddressDeployed.json'

// eslint-disable-next-line
declare let window: any

interface IAbiInput {
  name: string
  type: string
  indexed: boolean
}

interface IAbi {
  [key: string]: string | number | boolean | object | IAbiInput[]
}

interface IContractsAbis {
  contractName: string
  abi: IAbi[]
}

// interface IContractsList {
//   contractsCount: number
//   contractsNames: string[]
//   contractsAbis: IContractsAbis[]
// }

const Home: React.FC = () => {
  const [contractSelected, setContractSelected] = useState('')
  const [typeSelected, setTypeSelected] = useState('')
  const [functionSelected, setFunctionSelected] = useState('')
  const [functionInputNeeded, setFunctionInputNeeded] = useState(false)
  const [action, setAction] = useState('')
  const [callArguments, setCallArguments] = useState({})
  const [wallet, setWallet] = useState<undefined | string>()
  const [chainId, setChainId] = useState('')

  const contractDetail =
    contractSelected !== '' ? contractsList.contractsAbis.filter((contractAbi: IContractsAbis) => contractAbi.contractName === contractSelected) : []
  const contractAddress = ''

  return (
    <StyledHome>
      <StyledHomeSubSection>Your contracts:</StyledHomeSubSection>
      <ContractsSelector contractsNames={contractsList.contractsNames} contractSelected={contractSelected} setContractSelected={setContractSelected} />
      <StyledButton onClick={() => setAction('network')}>{chainId === '' || chainId === undefined ? 'Network' : chainId}</StyledButton>
      <StyledButton onClick={() => setAction('wallet')}>{wallet === '' || wallet === undefined ? 'Connect wallet' : 'Account ' + wallet}</StyledButton>
      {contractSelected !== '' && action === '' ? (
        <>
          <FunctionsAndEventsList
            contractAddress={contractAddress}
            contractDetail={contractDetail}
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
            setFunctionSelected={setFunctionSelected}
            setFunctionInputNeeded={setFunctionInputNeeded}
          />
          <RightPanel
            contractAddress={contractAddress}
            contractDetail={contractDetail}
            setAction={setAction}
            functionSelected={functionSelected}
            setFunctionSelected={setFunctionSelected}
            functionInputNeeded={functionInputNeeded}
            callArguments={callArguments}
            setCallArguments={setCallArguments}
          />
        </>
      ) : contractSelected !== '' ? (
        <StyledActionBody>
          {action === 'workflow' && <h2>Create a workflow</h2>}
          {action === 'routine' && <h2>Create a routine</h2>}
          {action === 'network' && <NetworkPanel chainId={chainId} setChainId={setChainId} setWallet={setWallet} />}
          {action === 'wallet' && <WalletPanel wallet={wallet} setChainId={setChainId} />}
          <StyledButton onClick={() => setAction('')}>Go back</StyledButton>
        </StyledActionBody>
      ) : (
        <></>
      )}
    </StyledHome>
  )
}

export default Home

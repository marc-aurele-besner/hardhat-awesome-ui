import React from 'react'

import { StyledBody, StyledButton } from '../components/styles'
import { callFunction } from '../hooks/callFunction'
import { buildRawSignature } from '../utils/buildFunctionSignature'

import InputsForm from './InputsForm'

interface IRightPanel {
  contractAddress: string
  contractDetail: any[]
  setAction: (action: string) => void
  functionSelected: string
  setFunctionSelected: (functionSelected: string) => void
  functionInputNeeded: boolean
  callArguments: any
  setCallArguments: (callArguments: any) => void
}

const RightPanel: React.FC<IRightPanel> = ({
  contractAddress,
  contractDetail,
  setAction,
  functionSelected,
  setFunctionSelected,
  functionInputNeeded,
  callArguments,
  setCallArguments
}) => {
  const contractDetailFunctions =
    contractDetail.length > 0 ? contractDetail[0].abi.length > 0 && contractDetail[0].abi.filter((abiRow: any) => abiRow.type === 'function') : []
  const specificFunctionDetail =
    contractDetailFunctions.length > 0 ? contractDetailFunctions.filter((functionAbi: any) => functionAbi.name === functionSelected) : []
  return (
    <StyledBody>
      {contractDetail !== undefined && (
        <>
          {specificFunctionDetail.length > 0 && (
            <StyledButton
              onClick={async () => {
                await callFunction(
                  specificFunctionDetail,
                  buildRawSignature(specificFunctionDetail[0].name, specificFunctionDetail[0].inputs),
                  [],
                  contractAddress,
                  contractDetail[0].abi
                )
                setFunctionSelected(specificFunctionDetail[0].name)
              }}
            >
              Call again
            </StyledButton>
          )}
          <StyledButton onClick={() => setAction('workflow')}>Create a workflow</StyledButton>
          <StyledButton onClick={() => setAction('routine')}>Create a routine</StyledButton>
        </>
      )}
      {functionSelected !== '' && (
        <>
          <h2>{functionSelected}</h2>
          Contract address: {contractAddress}
          {functionInputNeeded && (
            <InputsForm
              contractAddress={contractAddress}
              contractDetail={contractDetail}
              functionSelected={functionSelected}
              setFunctionSelected={setFunctionSelected}
              callArguments={callArguments}
              setCallArguments={setCallArguments}
            />
          )}
        </>
      )}
    </StyledBody>
  )
}

export default RightPanel

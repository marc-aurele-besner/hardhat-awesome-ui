import React from 'react'

import { StyledButton, StyledSelector } from '../components/styles'
import { callFunction } from '../hooks/callFunction'
import { buildRawSignature, buildSignature } from '../utils/buildFunctionSignature'

interface IFunctionsAndEventsList {
  contractAddress: string
  contractDetail: any[]
  typeSelected: string
  setTypeSelected: (typeSelected: string) => void
  setFunctionSelected: (functionSelected: string) => void
  setFunctionInputNeeded: (functionInputNeeded: boolean) => void
}

const handleCallFunction = async (contractAddress, abiRow, contractAbi, setFunctionInputNeeded, setFunctionSelected) => {
  const callReturn = await callFunction(abiRow, buildRawSignature(abiRow.name, abiRow.inputs), [], contractAddress, contractAbi.abi)
  if (!callReturn) setFunctionInputNeeded(true)
  else setFunctionInputNeeded(true)
  setFunctionSelected(abiRow.name)
}

const FunctionsAndEventsList: React.FC<IFunctionsAndEventsList> = ({
  contractAddress,
  contractDetail,
  typeSelected,
  setTypeSelected,
  setFunctionSelected,
  setFunctionInputNeeded
}) => {
  const contractDetailEvents =
    contractDetail.length > 0 ? contractDetail[0].abi.length > 0 && contractDetail[0].abi.filter((abiRow: any) => abiRow.type === 'event') : []
  const contractDetailFunctions =
    contractDetail.length > 0 ? contractDetail[0].abi.length > 0 && contractDetail[0].abi.filter((abiRow: any) => abiRow.type === 'function') : []
  return (
    <StyledSelector>
      {contractDetail !== undefined &&
        contractDetail.map((contractAbi: any) => {
          return (
            <div key={contractAbi.contractName}>
              <h1>{contractAbi.contractName}</h1>
              <StyledButton onClick={() => setTypeSelected('function')}>Function</StyledButton>
              <StyledButton onClick={() => setTypeSelected('events')}>Events</StyledButton>
              {typeSelected === 'events' && (
                <>
                  {contractDetailEvents.length > 0 && <h2>Events:</h2>}
                  {contractDetailEvents.length > 0 &&
                    contractDetailEvents.map((abiRow: any) => {
                      return (
                        <div key={abiRow.name}>
                          <h3>{abiRow.name}</h3>
                          <p>
                            {abiRow.name}
                            {buildSignature(abiRow.name, abiRow.inputs)}
                          </p>
                        </div>
                      )
                    })}
                </>
              )}
              {typeSelected === 'function' && (
                <>
                  {contractDetailFunctions.length > 0 && <h2>Function:</h2>}
                  {contractDetailFunctions.length > 0 &&
                    contractDetailFunctions.map((abiRow: any) => {
                      // if (abiRow.length > 0) {
                      return (
                        <div key={abiRow.name}>
                          {/* <h3 onClick={() => {
                                setFunctionSelected(abiRow.name)
                                }}>{abiRow.name}</h3> */}
                          <p>
                            {buildSignature(abiRow.name, abiRow.inputs)}
                            <StyledButton onClick={() => handleCallFunction(contractAddress, abiRow, contractAbi, setFunctionInputNeeded, setFunctionSelected)}>
                              {abiRow.inputs.length > 0 ? 'Build call for' : 'Call'} {abiRow.name}
                            </StyledButton>
                          </p>
                        </div>
                      )
                      // }
                    })}
                </>
              )}
            </div>
          )
        })}
    </StyledSelector>
  )
}

export default FunctionsAndEventsList

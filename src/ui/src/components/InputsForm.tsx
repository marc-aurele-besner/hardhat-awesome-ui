import React from 'react'

import { StyledButton, StyledInput } from '../components/styles'
import { callFunction } from '../hooks/callFunction'
import { buildRawSignature } from '../utils/buildFunctionSignature'

interface InputsForm {
  contractAddress: string
  contractDetail: any[]
  functionSelected: string
  setFunctionSelected: (functionSelected: string) => void
  callArguments: any
  setCallArguments: (callArguments: any) => void
}

// const handleCallFunction = async (contractAddress, abiRow, contractAbi, setFunctionInputNeeded, setFunctionSelected) => {
//     const callReturn = await callFunction(
//         abiRow,
//         buildRawSignature(abiRow.name, abiRow.inputs),
//         [],
//         contractAddress,
//         contractAbi.abi
//       )
//     if (!callReturn)
//         setFunctionInputNeeded(true)
//     else
//         setFunctionInputNeeded(true)
//     setFunctionSelected(abiRow.name)
// }
// const handleInputChange = async (inputName: string, inputValue: string) => {
//   setCallArguments({...callArguments, [inputName]: inputValue})
// }

// const handleSubmit = async () => {
//   null
// }

const InputsForm: React.FC<InputsForm> = ({ contractAddress, contractDetail, functionSelected, setFunctionSelected, callArguments, setCallArguments }) => {
  const contractDetailFunctions =
    contractDetail.length > 0 ? contractDetail[0].abi.length > 0 && contractDetail[0].abi.filter((abiRow: any) => abiRow.type === 'function') : []
  const specificFunctionDetail =
    contractDetailFunctions.length > 0 ? contractDetailFunctions.filter((functionAbi: any) => functionAbi.name === functionSelected) : []
  return (
    <>
      <h2>Inputs:</h2>
      {/* <form id="form" onSubmit={handleSubmit}> */}
      {specificFunctionDetail.length > 0 &&
        specificFunctionDetail[0].inputs.map((input: any) => {
          return (
            <div key={input.name}>
              <h3>{input.name}</h3>
              <p>
                <b>{input.type}</b>
                {input.type === 'address' && (
                  <>
                    <StyledButton
                      onClick={() =>
                        setCallArguments({
                          ...callArguments,
                          [input.name]: '0x0000000000000000000000000000000000000001'
                        })
                      }
                    >
                      Use address(2)
                    </StyledButton>
                    <StyledButton
                      onClick={() =>
                        setCallArguments({
                          ...callArguments,
                          [input.name]: '0x0000000000000000000000000000000000000002'
                        })
                      }
                    >
                      Use address(2)
                    </StyledButton>
                  </>
                )}
                {input.type === 'uint256' && (
                  <>
                    <StyledButton
                      onClick={() =>
                        setCallArguments({
                          ...callArguments,
                          [input.name]: '1'
                        })
                      }
                    >
                      Use 1
                    </StyledButton>
                    <StyledButton
                      onClick={() =>
                        setCallArguments({
                          ...callArguments,
                          [input.name]: '100'
                        })
                      }
                    >
                      Use 100
                    </StyledButton>
                    <StyledButton
                      onClick={() =>
                        setCallArguments({
                          ...callArguments,
                          [input.name]: '1000000000000000000'
                        })
                      }
                    >
                      Use 1*10**18
                    </StyledButton>
                    <StyledButton
                      onClick={() =>
                        setCallArguments({
                          ...callArguments,
                          [input.name]: '1000000000000000000000'
                        })
                      }
                    >
                      Use 1000*10**18
                    </StyledButton>
                  </>
                )}
              </p>
              <StyledInput
                type={input.type === 'string' || input.type === 'address' || input.type === 'bytes' ? 'text' : 'number'}
                name={input.name}
                value={callArguments[input.name]}
                id={input.name}
                placeholder={input.name}
                // onChange={handleInputChange(input.name, input.type)}
              />
            </div>
          )
        })}
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
          Call {specificFunctionDetail[0].name}
        </StyledButton>
      )}
      {/* </form> */}
    </>
  )
}

export default InputsForm

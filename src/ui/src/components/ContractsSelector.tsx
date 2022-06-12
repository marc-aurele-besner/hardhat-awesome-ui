import React from 'react'
import styled from 'styled-components'

import { StyledButton, StyledContractName, StyledHomeSubSection, StyledSelect } from '../components/styles'

interface IContractsSelector {
  contractsNames: string[]
  contractSelected: string
  setContractSelected: (contractSelected: string) => void
}

const StyledHomeSubSectionLessMargin = styled(StyledHomeSubSection)`
  margin-top: 5px;
`

const ContractsSelector: React.FC<IContractsSelector> = ({ contractsNames, contractSelected, setContractSelected }) => {
  if (contractSelected === '')
    return (
      <StyledSelect>
        {contractSelected === '' ? (
          <>
            <h2>Select a contract</h2>
            {contractsNames.map((contractName: string) => {
              return (
                <StyledContractName key={contractName} onClick={() => setContractSelected(contractName)}>
                  {contractName}
                </StyledContractName>
              )
            })}
          </>
        ) : (
          <>
            <h2>
              {contractSelected} <small>Change contract</small>
            </h2>
          </>
        )}
      </StyledSelect>
    )
  else
    return (
      <StyledHomeSubSectionLessMargin>
        {contractSelected}
        <StyledButton onClick={() => setContractSelected('')}>Change contract</StyledButton>
      </StyledHomeSubSectionLessMargin>
    )
}

export default ContractsSelector

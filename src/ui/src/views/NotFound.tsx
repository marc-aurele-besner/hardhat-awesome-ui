import React from 'react'
import styled from 'styled-components'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const NotFound: React.FC = () => {
  return (
    <>
      <StyledNotFound>Page not found</StyledNotFound>
    </>
  )
}

export default NotFound

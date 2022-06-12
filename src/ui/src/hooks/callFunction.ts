import { ethers } from 'ethers'

// eslint-disable-next-line
declare let window: any
// eslint-disable-next-line
let provider: any
if (window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
}

export const callFunction = async (functionDetail: any, functionSignature: string, callArguments: any, contractAddress: string, abi: any) => {
  console.log('functionName', functionDetail.name)
  console.log('functionSignature', functionSignature)
  console.log('callArguments', callArguments)
  console.log('contractAddress', contractAddress)
  console.log('abi', abi)

  if (window.ethereum && provider !== undefined && provider !== '') {
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(contractAddress, abi, signer)
    // if (callArguments.length > 0)
    //   await contract[functionSignature](callArguments)
    // else
    //   await contract[functionSignature]()
  }

  if (functionDetail.inputs.length > 0) {
    const inputData = []
    functionDetail.inputs.map((input: any) => {
      inputData.push(input)
    })
    return false
  }
  return true
}

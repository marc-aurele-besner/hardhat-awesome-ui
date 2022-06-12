export const buildSignature = (functionName: string, inputData: { type: string; name: string }[]): string => {
  let signature = functionName + '('
  inputData.map((input: { type: string; name: string }, index: number) => {
    if (index > 0) signature += ', ' + input.type + ' ' + input.name
    else signature += input.type + ' ' + input.name
  })
  return signature + ')'
}

export const buildRawSignature = (functionName: string, inputData: { type: string; name: string }[]): string => {
  let signature = functionName + '('
  inputData.map((input: { type: string; name: string }, index: number) => {
    if (index > 0) signature += ',' + input.type
    else signature += input.type
  })
  return signature + ')'
}

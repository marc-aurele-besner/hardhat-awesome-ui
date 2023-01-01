import fs from 'fs'

import { runCommand, sleep } from './utils'

type TContractDetails = {
    contractName: string
    abi: any
    bytecode?: string
}

type TContractsList = {
    contractsCount: number
    contractsNames: string[]
    contracts: TContractDetails[]
}

export const serveStartUi = async (env: any) => {
    // Copy contractsAddressDeployed.json and contractsAddressDeployedHistory.json
    if (fs.existsSync('contractsAddressDeployed.json')) {
        console.log('\x1b[36m%s\x1b[0m', 'Copy contractsAddressDeployed.json')
        if (fs.existsSync('ui/src/artifacts/contractsAddressDeployed.json'))
            fs.unlinkSync('ui/src/artifacts/contractsAddressDeployed.json')
        fs.copyFileSync('contractsAddressDeployed.json', 'ui/src/artifacts/contractsAddressDeployed.json')
    }

    if (fs.existsSync('contractsAddressDeployedHistory.json')) {
        console.log('\x1b[36m%s\x1b[0m', 'Copy contractsAddressDeployedHistory.json')
        if (fs.existsSync('ui/src/artifacts/contractsAddressDeployedHistory.json'))
            fs.unlinkSync('ui/src/artifacts/contractsAddressDeployedHistory.json')
        fs.copyFileSync('contractsAddressDeployedHistory.json', 'ui/src/artifacts/contractsAddressDeployedHistory.json')
    }

    const contractsList: TContractsList = {
        contractsCount: 0,
        contractsNames: [],
        contracts: []
    }

    // List all contracts artifacts and copy ABI and ByteCode inside contractsList.json
    const contracts = fs.readdirSync('artifacts/contracts')
    contracts.forEach((contract) => {
        console.log('\x1b[36m%s\x1b[0m', 'Copy ' + contract + ' ABI and ByteCode inside contractsList.json')
        if (contract.includes('.sol')) {
            const contractName = contract.split('.sol')[0]
            contractsList.contractsCount++
            contractsList.contractsNames.push(contractName)
            const contractDetails = JSON.parse(
                fs.readFileSync('artifacts/contracts/' + contract + '/' + contractName + '.json', 'utf8')
            )
            contractsList.contracts.push({
                contractName,
                abi: contractDetails.abi,
                bytecode: contractDetails.bytecode
            })
        }
    })
    if (fs.existsSync('ui/src/artifacts/contractsList.json')) fs.unlinkSync('ui/src/artifacts/contractsList.json')
    fs.writeFileSync('ui/src/artifacts/contractsList.json', JSON.stringify(contractsList, null, 2))

    console.log('\x1b[36m%s\x1b[0m', 'Starting UI...')
    await runCommand('yarn start', 'ui')
    await sleep(10000)
}

export const serveUi = async (env: any) => {
    // Clone UI repository
    console.log('\x1b[36m%s\x1b[0m', 'Cloning UI repository...')
    if (fs.existsSync('ui')) fs.rmSync('ui', { recursive: true, force: true })
    let isCloneRepoDone = false
    await runCommand('git clone https://github.com/marc-aurele-besner/web3-flexible-ui.git ui')
    while (!isCloneRepoDone) {
        await sleep(1000)
        if (fs.existsSync('ui')) isCloneRepoDone = true
    }
    if (isCloneRepoDone) {
        console.log('\x1b[32m%s\x1b[0m', 'UI repository cloned.')

        // Install UI dependencies
        let isUIInstallDone = false
        console.log('\x1b[36m%s\x1b[0m', 'Installing UI dependencies...')
        await runCommand('yarn', 'ui')
        while (!isUIInstallDone) {
            await sleep(8000)
            await runCommand('yarn check --verify-tree', 'ui')
            if (fs.existsSync('ui/node_modules')) isUIInstallDone = true
        }
        if (isUIInstallDone) {
            console.log('\x1b[32m%s\x1b[0m', 'UI dependencies installed.')
            await serveStartUi(env)
        }
    }
}

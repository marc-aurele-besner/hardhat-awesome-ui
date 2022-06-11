#!/usr/bin/env node

import {
    TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS,
    TASK_TEST,
    TASK_TEST_GET_TEST_FILES
} from 'hardhat/builtin-tasks/task-names'
import { subtask, task } from 'hardhat/config'
import fs from 'fs'
import serveUi from './serveUi'

/**
 * CLI task implementation
 * @param  {HardhatUserArgs} args
 * @param  {HardhatEnv} env
 */

const buildUi = async (args: any, env: any) => {
    let contractsList = {
        contractsCount: 0,
        contractsNames: ['CollageOfMyselfBridge'],
        contractsAbis: [
            {
                contractName: 'CollageOfMyselfBridge',
                abi: []
            }
        ]
    }
    // List all directories in the artifacts directory
    const directories = fs.readdirSync('./artifacts/contracts')
    console.log('directories', directories)
    if (!fs.existsSync('ui')) fs.mkdirSync('ui')
    if (!fs.existsSync('ui/src')) fs.mkdirSync('ui/src')
    if (!fs.existsSync('ui/src/artifacts')) fs.mkdirSync('ui/src/artifacts')

    if (!fs.existsSync('contractsAddressDeployed.json'))
        fs.copyFileSync('./contractsAddressDeployed.json', './ui/src/artifacts/contractsAddressDeployed.json')
    if (!fs.existsSync('contractsAddressDeployedHistory.json'))
        fs.copyFileSync(
            './contractsAddressDeployedHistory.json',
            './ui/src/artifacts/contractsAddressDeployedHistory.json'
        )
    // For each directory, list all files in it
    for (const directory of directories) {
        const files = fs.readdirSync(`./artifacts/contracts/${directory}`)
        const rawAbi: any = fs.readFileSync(`./artifacts/contracts/${directory}/${files[1]}`)
        const abi = JSON.parse(rawAbi)
        contractsList = {
            ...contractsList,
            contractsCount: contractsList.contractsCount + 1,
            contractsNames: [...contractsList.contractsNames, abi.contractName],
            contractsAbis: [
                ...contractsList.contractsAbis,
                {
                    contractName: abi.contractName,
                    abi: abi.abi
                }
            ]
        }
        fs.copyFileSync(
            './artifacts/' + directory + '/' + directory + '.json',
            './ui/src/artifacts/' + directory + '.json'
        )
    }
    await fs.writeFileSync('ui/src/artifacts/contractsList.json', JSON.stringify(contractsList, null, 2))
}

task('ui', 'Easy user interface to use with hardhat').setAction(async function (args, env) {
    await serveUi(env)
})

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(async (args, env, runSuper: any) => {
    await buildUi(args, env)
    const paths = await runSuper()
    return paths
})

subtask(TASK_TEST_GET_TEST_FILES).setAction(async (args, env, runSuper: any) => {
    await buildUi(args, env)
    const paths = await runSuper()
    return paths
})

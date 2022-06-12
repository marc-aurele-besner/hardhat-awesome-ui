#!/usr/bin/env node

import fs from 'fs'
import {
    TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS,
    TASK_TEST,
    TASK_TEST_GET_TEST_FILES
} from 'hardhat/builtin-tasks/task-names'
import { subtask, task } from 'hardhat/config'

import serveUi from './serveUi'

/**
 * CLI task implementation
 * @param  {HardhatUserArgs} args
 * @param  {HardhatEnv} env
 */

const updateUi = async (args: any, env: any) => {
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
    if (!fs.existsSync('ui')) fs.mkdirSync('ui')
    if (!fs.existsSync('ui/src')) fs.mkdirSync('ui/src')
    if (!fs.existsSync('ui/src/artifacts')) fs.mkdirSync('ui/src/artifacts')

    if (fs.existsSync('contractsAddressDeployed.json'))
        fs.copyFileSync('./contractsAddressDeployed.json', './ui/src/artifacts/contractsAddressDeployed.json')
    if (fs.existsSync('contractsAddressDeployedHistory.json'))
        fs.copyFileSync(
            './contractsAddressDeployedHistory.json',
            './ui/src/artifacts/contractsAddressDeployedHistory.json'
        )
    // For each directory, list all files in it
    for (const directory of directories) {
        const contractName = directory.replace('.sol', '')
        const rawAbi: any = fs.readFileSync(`./artifacts/contracts/${directory}/${contractName}.json`)
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
            './artifacts/contracts/' + directory + '/' + contractName + '.json',
            './ui/src/artifacts/' + contractName + '.json'
        )
    }
    await fs.writeFileSync('ui/src/artifacts/contractsList.json', JSON.stringify(contractsList, null, 2))
}

const buildUi = async (args: any, env: any) => {
    await updateUi(args, env)
    if (!fs.existsSync('ui/public')) fs.mkdirSync('ui/public')
    if (!fs.existsSync('ui/src/components')) fs.mkdirSync('ui/src/components')
    if (!fs.existsSync('ui/src/constants')) fs.mkdirSync('ui/src/constants')
    if (!fs.existsSync('ui/src/hooks')) fs.mkdirSync('ui/src/hooks')
    if (!fs.existsSync('ui/src/utils')) fs.mkdirSync('ui/src/utils')
    if (!fs.existsSync('ui/src/views')) fs.mkdirSync('ui/src/views')

    if (!fs.existsSync('ui/tsconfig.json')) fs.copyFileSync('./tsconfig.json', './ui/tsconfig.json')
    if (!fs.existsSync('ui/README.md')) fs.copyFileSync('./README.md', './ui/README.md')
    if (!fs.existsSync('ui/package.json')) fs.copyFileSync('./package.json', './ui/package.json')
    if (!fs.existsSync('ui/LICENSE')) fs.copyFileSync('./LICENSE', './ui/LICENSE')
    if (!fs.existsSync('ui/.prettierrc')) fs.copyFileSync('./LICENSE', './ui/.prettierrc')
    if (!fs.existsSync('ui/.prettierignore')) fs.copyFileSync('./.prettierignore', './ui/.prettierignore')
    if (!fs.existsSync('ui/.gitignore')) fs.copyFileSync('./.gitignore', './ui/.gitignore')
    if (!fs.existsSync('ui/.eslintrc.js')) fs.copyFileSync('./.eslintrc.js', './ui/.eslintrc.js')
    if (!fs.existsSync('ui/.env.development')) fs.copyFileSync('./.env.development', './ui/.env.development')

    if (!fs.existsSync('ui/public/_redirects')) fs.copyFileSync('./public/_redirects', './ui/public/_redirects')
    if (!fs.existsSync('ui/public/index.html')) fs.copyFileSync('./public/index.html', './ui/public/index.html')
    if (!fs.existsSync('ui/public/manifest.json'))
        fs.copyFileSync('./public/manifest.json', './ui/public/manifest.json')

    if (!fs.existsSync('ui/src/App.tsx')) fs.copyFileSync('./src/App.tsx', './ui/src/App.tsx')
    if (!fs.existsSync('ui/src/index.tsx')) fs.copyFileSync('./src/index.tsx', './ui/src/index.tsx')
    if (!fs.existsSync('ui/src/react-app-env.d.ts'))
        fs.copyFileSync('./src/react-app-env.d.ts', './ui/src/react-app-env.d.ts')
    if (!fs.existsSync('ui/src/styles.css')) fs.copyFileSync('./src/styles.css', './ui/src/styles.css')

    const srcDirectory = ['components', 'constants', 'hooks', 'utils', 'views']
    for (const directory of srcDirectory) {
        const files = fs.readdirSync('./ui/src/' + directory)
        for (const file of files) {
            if (!fs.existsSync('/ui/src/' + directory + '/' + file))
                fs.copyFileSync('./ui/src/' + directory + '/' + file, './ui/src/' + directory + '/' + file)
        }
    }
}

task('ui', 'Easy user interface to use with hardhat').setAction(async function (args, env) {
    await updateUi(args, env)
    await serveUi(env)
})

task('ui-build', 'Build the UI').setAction(async function (args, env) {
    await buildUi(args, env)
    await serveUi(env)
})

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(async (args, env, runSuper: any) => {
    await updateUi(args, env)
    const paths = await runSuper()
    return paths
})

subtask(TASK_TEST_GET_TEST_FILES).setAction(async (args, env, runSuper: any) => {
    await updateUi(args, env)
    const paths = await runSuper()
    return paths
})

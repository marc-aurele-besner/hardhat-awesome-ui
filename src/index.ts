#!/usr/bin/env node

import { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } from 'hardhat/builtin-tasks/task-names'
import { subtask, task } from 'hardhat/config'

import serveUi from './serveUi'

/**
 * CLI task implementation
 * @param  {HardhatUserArgs} args
 * @param  {HardhatEnv} env
 */
task('ui', 'Easy user interface to use hardhat').setAction(async function (args, env) {
    await serveUi(env)
})

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(async (_, __, runSuper: any) => {
        const sourcePaths = await runSuper()
        console.log('Source paths:', sourcePaths)
})

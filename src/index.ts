#!/usr/bin/env node

import { task } from 'hardhat/config'

import { serveStartUi, serveUi } from './serveUi'

/**
 * CLI task implementation
 * @param  {HardhatUserArgs} args
 * @param  {HardhatEnv} env
 */
task('ui', 'Easy user interface to use hardhat').setAction(async function (args, env) {
    await serveUi(env)
})

task('start', 'Start user interface to use hardhat').setAction(async function (args, env) {
    await serveStartUi(env)
})

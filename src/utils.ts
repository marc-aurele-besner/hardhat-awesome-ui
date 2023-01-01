import { execSync } from 'child_process'

export const runCommand = async (command: string, cwd: string = process.cwd(), thenExit: boolean = false) => {
    console.log('\x1b[33m%s\x1b[0m', 'Command to run: ', '\x1b[97m\x1b[0m', command)
    console.log(`Please wait...
`)
    execSync(command, {
        stdio: 'inherit',
        cwd
    })
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

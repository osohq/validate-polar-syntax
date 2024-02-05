import * as core from '@actions/core'
import * as exec from '@actions/exec'
import { ExecOptions } from '@actions/exec'
import * as fs from 'fs'
import { glob } from 'glob'

/**
 * @returns {Promise<boolean>} true if validation succeeds, false otherwise
 */
export async function validate(): Promise<boolean> {
  let output = ''
  let error = ''

  const options: ExecOptions = {}

  options.listeners = {
    stdout: (data: Buffer) => {
      output += data.toString()
    },
    stderr: (data: Buffer) => {
      error += data.toString()
    }
  }

  const polarFiles: string[] = await glob('**/*.polar', {
    ignore: 'node_modules/**'
  })
  const polarFilesNoSymlinks: string[] = polarFiles.filter(
    file => !fs.lstatSync(file).isSymbolicLink()
  )
  await exec.exec(
    'oso-cloud',
    ['validate'].concat(polarFilesNoSymlinks),
    options
  )

  core.debug(`stdout from validation: \n${output}`)
  core.debug(`stderr from validation: \n${error}`)

  return true
}

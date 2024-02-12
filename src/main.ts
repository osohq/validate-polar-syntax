import * as core from '@actions/core'
import { validate } from './validate'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug('Validating polar syntax')

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())
    await validate()
    core.debug(new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

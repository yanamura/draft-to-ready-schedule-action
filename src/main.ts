import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const octokit = github.getOctokit(core.getInput('github_token'))

    const {data: pullRequestList} = await octokit.pulls.list({
      ...github.context.repo,
      state: 'open'
    })

    core.debug(pullRequestList.toString())
    /*const ms: string = core.getInput(''')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())*/
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

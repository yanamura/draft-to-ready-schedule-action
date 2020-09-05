import * as core from '@actions/core'
import * as github from '@actions/github'

const octokit = github.getOctokit(core.getInput('github_token'))

async function toReady(id: string): Promise<void> {
  core.info(`${id}`)
  await octokit.graphql(
    `
    mutation($id: ID!) {
      markPullRequestReadyForReview(input: {pullRequestId: $id}) {
         pullRequest {
           number
         }
      }
    }
    `,
    {
      id
    }
  )
}

async function changeTitle(pullNumber: number, title: string): Promise<void> {
  await octokit.pulls.update({
    ...github.context.repo,
    pull_number: pullNumber,
    title
  })
}

async function run(): Promise<void> {
  try {
    core.info('get list')
    const {data: pullRequests} = await octokit.pulls.list({
      ...github.context.repo,
      state: 'open'
    })

    core.info(`pr num: ${pullRequests.length}`)

    const triggerTitle = core.getInput('trigger_title')
    core.info(`trigger_title: ${triggerTitle}`)

    const draftPullRequests = pullRequests.filter(pullRequest => {
      return pullRequest.draft && pullRequest.title.includes(triggerTitle)
    })

    core.info(`draft pr num: ${draftPullRequests.length}`)

    for (const pullRequest of draftPullRequests) {
      await toReady(pullRequest.node_id)
      await changeTitle(
        pullRequest.number,
        pullRequest.title.replace(triggerTitle, '')
      )
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

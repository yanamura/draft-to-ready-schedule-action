# Draft Pull Request to Ready

This action make PUll Request `draft` to `Ready for Review`.

## Usage

```yaml
on:
  schedule:
    - cron:  '0 * * * *'
jobs:
  to-ready:
    - uses: yanamura/draft-pullrequest-to-ready@v1
      with: 
        ### GitHub token which have a permission to write repository (Can't use GITHUB_TOKEN).(required)
        github_token: ${{ secrets.BOT_TOKEN }}
```

In your pull requests, add a line to the end of the pull request description look looking like this

```
/schedule 2020-11-01
```

Or if you need a more precise, timezone-safe setting, you can use an ISO 8601 date string

```
/schedule 2020-11-01T00:00:00.000+0900
```

Any string that works with the [`new Date()` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) will work.

## How set GitHub token

<a href="https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets">Creating and storing encrypted secrets
</a>

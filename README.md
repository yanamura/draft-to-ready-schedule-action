# Draft Pull Request to Ready

This action make PUll Request `draft` to `Ready for Review`.

## Usage

```yaml
on:
  schedule:
    - cron:  '10 9 * * MON'
jobs:
  to-ready:
    - uses: yanamura/draft-pullrequest-to-ready@v1
      with: 
        ### GitHub token which have a permission to write repository (Can't use GITHUB_TOKEN).(required)
        github_token: ${{ secrets.BOT_TOKEN }}
```

## How set GitHub token

<a href="https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets">Creating and storing encrypted secrets
</a>

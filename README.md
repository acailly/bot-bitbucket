# bot-bitbucket

List open pull requests on BitBucket

## Usage

```
Usage: bitbucket [options] [projects...]

  Alias: bb

  List open pull requests on BitBucket

  Options:

    --help  output usage information
```

## Config (config.yaml)

```yaml
bitbucket:
  username: "insert_your_username"
  password: "insert_your_password"
  apiRoot: "https://api.bitbucket.org/2.0/repositories/insert_your_bitbucket_domain/"
  defaultProjects:
    - "insert"
    - "your"
    - "favorite"
    - "projects"
```

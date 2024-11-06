### cli-help
A little CLI helper tool while test driving [Github Models](https://docs.github.com/en/github-models). cli-help has a simple history buffer so you can ask questions in a progressive manner.

### Usage and examples
```
> ./cli-help.mjs "find files larger than 2 MB"
find /path/to/search -type f -size +2M

> ./cli-help.mjs "with current directory"
find . -type f -size +2M

> ./cli-help.mjs "create a zip file result.zip from the found files"
find . -type f -size +2M -print | zip result.zip -@
```


#### Configure configure.json
Rename `config.sample.json` to `config.json` and fill out the keys "token" and "historyFile".
- token: The token string, which can be [created here.](https://github.com/settings/tokens)
- historyFile: The location to store the cli-help history


#### Installation
This depends on nodeJS. Run `npm install` to install dependencies.
Run `chmod u+x cli-helper.mjs` to make it executable.

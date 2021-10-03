# iTerm2에서 `code` 명령어로 VSCode 열기

## Apply

`vi ~/.zshrc` 명령을 통해 zsh 환경설정 파일을 열고, `code` 명령어에 대한 정의를 한다.

```sh
code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}
```

## Shell Restart

```sh
exec $SHELL
```

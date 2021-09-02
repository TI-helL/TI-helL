# exa

[exa Github](https://github.com/ogham/exa)

A Modern replacement of 'ls' 라고 하더라

ls 랑 동일하게 사용할 수 있지만 옵션이 많이 다르므로 확인 필요

## install 

MAC 기준

> brew install exa

## setting

기존의 alias 된 ls가 있다면 삭제.. 하거나 어디다 백업해두자

### ls의 alias 확인

```shell
$ alias | grep ls
```

기존의 ls alias가 있다면, 그리고 더 사용하지 않을거라면 unalias를 사용해서 지워주거나 덮어써도 된다.

```shell
$ unalias l
$ unalias ll
$ unalias la
```

### exa alias 세팅

shell 사용시 바로 적용될 수 있도록 각 쉘의 rc 파일에 작성해둔다.

현재는 zsh를 사용중이므로 `~/.zshrc` 에 해당 내용을 작성했다.

```
# Custom Alias for Exa
alias ls="exa --icons --git"  # ls를 exa로 치환, ls시 icon이 보이도록 default 적용. p10k와 nerdfont 사용
alias ls1="exa --icons -1"    # 한 라인에 하나의 아이템만 표기
alias l="ls -lF"              # list, size, type, git 확인
alias ll="ls -lhF"            # l + header
alias lsa="la"                # alias la
alias la="ls -lhgFa -um --time-style long-iso --git"        # all

# exa tree view

function lt() {
  if [ "$1" -eq "$1" ] 2>/dev/null && [ -n "$1" ] 2>/dev/null; then
    exa --tree --level="$1"
  else
    exa --tree --level=1
  fi
}
```

작성 이후 `source ~/.zshrc` 로 `~/.zshrc` 재적용


### Usage 

```shell
$ ls
$ ls1
$ lt    # 1 depth tree
$ lt 3  # 3 depth tree
$ lt n  # n depth tree
```


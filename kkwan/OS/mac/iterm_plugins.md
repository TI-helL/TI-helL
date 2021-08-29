# 유용한 iterm 플러그인

## zsh-autosuggestions

### 1. zsh-autosuggestions install

```sh
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 2. zsh-autosuggestions setting

`vi ~/.zshrc` 커맨드를 통해 zsh 환경설정 파일을 열고, plugins 항목에 플러그인을 추가한다.

```sh
...
plugins=(
    ...
    zsh-autosuggestions
    ...
)
...
```

### 3. shell restart

```sh
exec "$SHELL"
```

## zsh-syntax-highlighter

### 1. zsh-syntax-highlighter install

```sh
# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

```

### 2. zsh-syntax-highlighter setting

`vi ~/.zshrc` 커맨드를 통해 zsh 환경설정 파일을 열고, plugins 항목에 플러그인을 추가한다.

```sh
...
plugins=(
    ...
    zsh-syntax-highlighting
    ...
)
...
```

### 3. shell restart

```sh
exec "$SHELL"
```

## autojump

### 1. autojump install

```sh
brew install autojump
```

### 2. autojump setting

`vi ~/.zshrc` 커맨드를 통해 zsh 환경설정 파일을 열고, plugins 항목에 플러그인을 추가한다.

```sh
...
plugins=(
    ...
    autojump
    ...
)
...
```

### 3. shell restart

```sh
exec "$SHELL"
```

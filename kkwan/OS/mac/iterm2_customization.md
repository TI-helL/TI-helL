# [๊ฐ๋ฐ ํ๊ฒฝ] iTerm2 Customization

## ๐โโ๏ธ What is iTerm2?

[![iterm2](./img/iterm_logo.png)](https://iterm2.com/)

iTerm2๋ macOS์์ ๊ธฐ๋ณธ์ ์ผ๋ก ์ ๊ณตํ๋ ํฐ๋ฏธ๋์ ๋์ฒด ํ  ์ ์๋ ๊ฐ์ ํฐ๋ฏธ๋ ์ดํ๋ฆฌ์ผ์ด์์ด๋ค. George Nachman์ ์ฃผ๋๋ก ๊ฐ๋ฐ๋๊ณ  ์์ผ๋ฉฐ ์์ฑ์ผ ๊ธฐ์ค(2021.09.13) ์ต์  ๋ฒ์ ์ `3.4.9`์ด๋ค.

iTerm2๋ ์คํ์์ค ํ๋ก์ ํธ๋ก, GPL v2 ๋ผ์ด์ผ์ค๊ฐ ์ ์ฉ๋์ด ์๋ค. GitHub๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ์์ค์ฝ๋๋ฅผ ๊ด๋ฆฌํ๊ณ  ์์ผ๋ฉฐ, Issue Tracking System์ผ๋ก๋ Gitlab์ ์ฌ์ฉํ๊ณ  ์๋ค.

iTerm2๋ macOS์์ ๊ธฐ๋ณธ์ ์ผ๋ก ์ ๊ณต๋๋ ํฐ๋ฏธ๋๋ณด๋ค ๋ค์ํ ๊ธฐ๋ฅ์ ์ ๊ณตํ๊ณ  ์๋ค. ๊ณต์ ํํ์ด์ง ๋ด [Features](https://iterm2.com/features.html)๋ฅผ ์ฐธ๊ณ ํ๋ฉด ๋ค์๊ณผ ๊ฐ์ ๊ธฐ๋ฅ๋ค์ ์ ๊ณตํ๋ค. ๊ฐ ๊ธฐ๋ฅ๋ค์ ๋ํ ์์ธ ์ค๋ช์ ์ถํ ์๋ฐ์ดํธ ์์ ์ด๋ค.

[**(์ฐธ๊ณ ํ  URL)**](https://medium.com/harrythegreat/%EC%95%8C%EC%95%84%EB%91%90%EB%A9%B4-%EB%8F%84%EC%9B%80%EB%90%98%EB%8A%94-iterm2-%EA%B3%A0%EA%B8%89%EA%B8%B0%EB%8A%A5-81a4cd81bab7)

- Split Panes
- Hotkey Window
- Search
- Autocomplete
- Copy Mode
- Paste History
- Instant Replay
- Configurability
- Unixyness
- 24-bit Color
- Readability
- Mouse Reporting
- Notification Center Support
- Global Search
- Tagged Profiles
- Multi-Lingual
- Triggers
- Smart Selection
- Shell Integration
- Automatic Profile Switching
- Inline Images
- Timestamps
- Password Manager
- Advanced Paste
- Annotations
- Badges
- Captured Output

## ๐คทโโ๏ธ How to install?

iTerm2์ ์ค์น ๋ฐฉ๋ฒ์ ๋ค์๊ณผ ๊ฐ์ด ๋๊ฐ์ง๊ฐ ์กด์ฌํ๋ค.

1. [**๊ณต์ ํํ์ด์ง**](https://iterm2.com/)๋ฅผ ํตํ ๋ค์ด๋ก๋

   [![iTerm2 ๊ณต์ ํํ์ด์ง](./img/iterm_homepage.png)](https://iterm2.com/)

2. **Homebrew**๋ฅผ ํตํ ๋ค์ด๋ก๋

   ```sh
   brew install --cask iterm2
   ```

## โ๏ธ iTerm2 Customization

### 1. zsh and oh-my-zsh Install

Catalina ์ดํ์ macOS๋ ๊ธฐ๋ณธ ์๋ก zsh๋ฅผ ์ฑํํ์ฌ ์ ๊ณตํ๊ณ  ์์ง๋ง, ์ต์  ๋ฒ์  ์ ์ฉ ๋ฐ ์ด๊ธฐ ์ค์น๋ฅผ ์งํํ๋ ์ฌ์ฉ์๋ฅผ ์ํด ๋ค์ ๋ช๋ น์ด๋ฅผ ์คํํ๋ค.

```sh
brew update
brew install zsh
chsh -s $(which zsh)
```

์ ์์ ์ผ๋ก zsh์ ์ค์น ๋ฐ ์๋ฐ์ดํธ๋ฅผ ๋ง์น ํ, ๋ค์ ๋ช๋ น์ด๋ฅผ ํตํด [**oh-my-zsh**](https://ohmyz.sh/)๋ฅผ ์ค์นํ๋ค.

```sh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 2. zsh Theme

์ํ๋ theme๊ฐ ์์ ๊ฒฝ์ฐ ํน์ [**ohmyzsh themes**](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)์์ ๋ง์์ ๋๋ theme๋ฅผ ์ฐพ์ ํ, ํด๋น๋๋ theme ์ด๋ฆ์ `~/.zshrc`์ ์ ์ํ๋ฉด ์ ์์ ์ผ๋ก theme๊ฐ ์ ์ฉ๋๋ ๊ฒ์ ํ์ธ ํ  ์ ์๋ค.

zsh์ ๊ฒฝ์ฐ ๋งค์ฐ ๋ค์ํ ์ข๋ฅ์ theme๋ฅผ ์ ๊ณตํด์ฃผ๋๋ฐ, ๋ค์ํ zsh theme๋ฅผ ๊ฒฝํํด๋ณด๊ณ  ์ ์ฉํ๊ณ ์ ํ๋ฉด `random` theme๋ฅผ ํตํด iTerm2f๋ฅผ ์คํํ  ๋ ๋ง๋ค theme๋ฅผ ๋ณ๊ฒฝํ  ์ ์๋ค.

```sh
# ~/.zshrc
...
ZSH_THEME="[zsh theme]"
...
```

"[**๋ณธ๊ฒฉ macOS์ ๊ฐ๋ฐ ํ๊ฒฝ ๊ตฌ์ถํ๊ธฐ**](https://subicura.com/2017/11/22/mac-os-development-environment-setup.html)"์ ๋ฐ๋ฅด๋ฉด zsh์ ๋ํ์ ์ธ theme๋ก powerlevel0k, spaceship, pure๊ฐ ์์ง๋ง ์๋์ ๊ธฐ๋ฅ ์ธก๋ฉด์์ powerlevel10k๊ฐ ์ข๋ค๊ณ  ํ๋ค.

#### 2.1 powerlevel10k

#### powerlevel10k Install

```sh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k
```

#### powerlevel10k Apply

์ ์์ ์ผ๋ก ์ค์น๊ฐ ์๋ฃ๋์๋ค๋ฉด, `~/.zshrc`๋ฅผ ๋ค์๊ณผ ๊ฐ์ด ์๋ฐ์ดํธํ๋ค.

```sh
# ~/.zshrc
...
ZSH_THEME="powerlevel10k/powerlevel10k"
...
```

#### powerlevel10k config update

`~/.zshrc` ์๋ฐ์ดํธ ํ ์๋ก์ด ํญ์ ์ด๋ฉด ๋ํํ ์ค์ ์ฐฝ์ด ๋จ๊ณ  ์์ธํ๊ฒ ํ๋ง๋ฅผ ์ค์ ํ  ์ ์๋ค. ์ค์ ํ ํ๋ง๋ฅผ ๋ณ๊ฒฝํ๊ณ ์ ํ  ๋ `p10k configure`๋ฅผ ํตํด ์ฌ์ค์ ํ  ์ ์๋ค.

### 3. Font Install

#### 3.1 MesloLGS NF (powerlevel10k default)

> powerlevel10k theme์์ ๊ธฐ๋ณธ์ ์ผ๋ก ์ ๊ณตํ๋ ํฐํธ๋ก [**powerlevel10k Github**](https://github.com/romkatv/powerlevel10k/#user-content-fonts)์์ ๋ค์ด๋ก๋ ๊ฐ๋ฅํ๋ค.

#### 3.2 D2 coding Font

> ๋ค์ด๋ฒ์์ ์ ๊ณตํ๋ ํฐํธ๋ก ๋๋๋ฐ๋ฅธ๊ณ ๋์ ๋ฐํ์ผ๋ก ๊ฐ๋ฐ์์ ์ฝ๋ฉ์ ์ํด ๊ฐ๋์ฑ ๋ฐ ์ ์ฌ ๋ฌธ์๊ฐ ๋ณ๋ณ๋ ฅ ๋ฟ๋ง ์๋๋ผ ๋์์ธ์ ์ผ๋ก ํ๊ธ๊ณผ์ ์กฐํ๋ฅผ ๊ณ ๋ คํด ์ต์ ํ์ํจ ๊ธ๊ผด์ด๋ค. [**d2coding Github**](https://github.com/naver/d2codingfont)์์ ๋ค์ด๋ก๋ ๊ฐ๋ฅํ๋ค.

### 4. Color Presets

#### 4.1 Use Default Presets

`Preferences > Colors > Color Presets ...` ๋ฅผ ํตํด ๊ธฐ๋ณธ์ ์ผ๋ก ์ ๊ณตํ๋ Color Preset์ ์ ์ฉํ๊ฑฐ๋, ์ผ๋ถ ์์๋ง์ ๋ณ๊ฒฝํ์ฌ ์ ์ฉํ๋ค.

#### 4.2 Use Share Presets

`Preferences > Colors > Color Presets ...` ๋ด Visit Online Gallery๋ฅผ ํตํด ๊ณต์ ๋ Color Presets์ ์ด์ฉํ๊ฑฐ๋, [**iterm2colorschemes**](https://iterm2colorschemes.com/)์์ ์ํ๋ Color Preset์ ์ฐพ๊ณ , ์ ์ฉํ  ์ ์๋ค.

iterm2colorschemes์ ์ด์ฉํ  ๊ฒฝ์ฐ ์ํ๋ Color Preset์ ์ฐพ์ ํ, Color Preset ์ด๋ฆ์ ์ฐํด๋ฆญํ์ฌ `๋ค๋ฅธ ์ด๋ฆ์ผ๋ก ๋งํฌ ์ ์ฅ ...`์ ํด๋ฆญํ๊ณ , `.itermcolors` ํ์ฅ์๋ฅผ ๋ถ์ฌ ์ ์ฅํ๋ค. ์ ์์ ์ผ๋ก ์ ์ฅ๋์์ ํ์ธํ๊ณ , `Preferences > Colors > Color Presets ... > import`๋ฅผ ํตํด ์ ์ฅํ Color Preset์ ์ ์ฉํ๋ค.

> ์์๋ก, MaterialOcean์ด๋ผ๋ Color Preset์ ์ ์ฉํ๊ณ ์ ํ  ๋, Color Preset ์ด๋ฆ์ ์ฐํด๋ฆญํ์ฌ `๋ค๋ฅธ ์ด๋ฆ์ผ๋ก ๋งํฌ ์ ์ฅ ...`์ ํด๋ฆญํ๊ณ , ํ์ผ์ด๋ฆ์ `MaterialOcean.itermcolors`๋ก ์ ์ฅํ๋ค.

![MaterialOcean](./img/MaterialOcean.png)
![menu list](./img/menu_list.png)

### 5. SIB(Simple is Best) Style

#### 5.1 Remove Last Login Information

ํฐ๋ฏธ๋ ์คํ ์ ์๋จ์ ์ถ๋ ฅ๋๋ `Last login` ์ ๋ณด๋ฅผ ๋ค์ ๋ฐฉ๋ฒ์ ํตํด ์ญ์ ํ  ์ ์๋ค.

```sh
cd ~
touch .hushlogin
```

![before](./img/last_login_info.png)
![after](./img/remove_last_login_info.png)

## ๐ฏ Tips

### 1. Plugins

- zsh-autosuggestions
- zsh-syntax-highlighter
- autojump

#### 1.1 Plugins Install

```sh
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighter
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# autojump
brew install autojump
```

#### 1.2 Plugins Apply

`vi ~/.zshrc` ๋๋ `code ~/.zshrc` ๋ช๋ น์ ํตํด zsh ํ๊ฒฝ์ค์  ํ์ผ์ ์ด๊ณ , plugins ํญ๋ชฉ์ ํ๋ฌ๊ทธ์ธ์ ์ถ๊ฐํ๋ค.

```sh
plugins=(
	...
	zsh-autosuggestion
	zsh-syntax-highlighting
	autojump
)
```

#### 1.3 Shell Restart

```sh
exec $SHELL
```

### 2. Shortcuts

|          Function          |         Shortcut         |
| :------------------------: | :----------------------: |
|         ์ ์ฐฝ ์ด๊ธฐ         |        `cmd + n`         |
|         ์ ํญ ์ด๊ธฐ         |        `cmd + t`         |
|      ์ฐฝ ๋๋ ํญ ๋ซ๊ธฐ       |        `cmd + w`         |
|   ์ ์ฒด ํ๋ฉด ์ ํ ๋ฐ ์ทจ์   |      `cmd + enter`       |
|        ํญ ์์ฐจ ์ด๋        |       `ctrl + tab`       |
|        ํญ ์ง์  ์ด๋        |    `cmd + [ํญ ๋ฒํธ]`     |
|        ํญ ๋ฐฉํฅ ์ด๋        |     `cmd + [๋ฐฉํฅํค]`     |
|        ์ฐฝ ์ธ๋ก ๋ถํ         |         `cmd +d`         |
|        ์ฐฝ ๊ฐ๋ก ๋ถํ         |    `cmd + shift + d`     |
| ๋ถํ  ์ฐฝ ํฌ์ปค์ค ์ค๋ฅธ์ชฝ ์ด๋ |        `cmd + ]`         |
|  ๋ถํ  ์ฐฝ ํฌ์ปค์ค ์ผ์ชฝ ์ด๋  |        `cmd + [`         |
|        ํฌ์ปค์ค ์ฐพ๊ธฐ         |        `cmd + /`         |
|  ํด๋ฆฝ๋ณด๋ ๋ณต์ฌ ๋ด์ฉ ํ์ธ   |    `cmd + shift + h`     |
|       ํ๊ฒฝ์ค์  ์ด๊ธฐ        |        `cmd + i`         |
|   ์ฌ๋ฌ ์ฐฝ ๋์ ์๋ ฅ ๋ชจ๋   |    `cmd + shift + i`     |
|     ๋จ์ผ ์ฐฝ ์๋ ฅ ๋ชจ๋      | `cmd + shift + ctrl + i` |
|            ์ข๋ฃ            |        `cmd + q`         |

## โ Reference

- [**iTerm2 Official**](https://iterm2.com)
- [**powerlevel10k Github**](https://github.com/romkatv/powerlevel10k)
- [**d2coding Github**](https://github.com/naver/d2codingfont)
- Daegwon Nacyot Kim, [**iTerm2๋? ๋งฅOS์ ํฐ๋ฏธ๋ ๋์ฒด ์ ํ๋ฆฌ์ผ์ด์**](https://www.44bits.io/ko/keyword/iterm2), 2021.03
- subicura, [**๋ณธ๊ฒฉ macOS์ ๊ฐ๋ฐ ํ๊ฒฝ ๊ตฌ์ถํ๊ธฐ**](https://subicura.com/2017/11/22/mac-os-development-environment-setup.html), 2021.09
- mook9288, [**[Mac] iTerm2 ์ค์น ๋ฐ ํ๋ง**](https://velog.io/@mook9288/macRecord-005), 2021.01
- ruddms936, [**zsh ํ๋ฌ๊ทธ์ธ ์ค์น**](https://velog.io/@ruddms936/zsh-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%84%A4%EC%B9%98), 2020.10
- hmjko, [**iTerm2 ๋จ์ถํค ์ ๋ฆฌ**](https://hmjkor.tistory.com/484), 2018.08

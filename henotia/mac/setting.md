# Mac을 좀 더 편리하게 만들기

윈도우도 쓰고 Mac도 쓰는 내 상황에 맞춰 최대한 공통의 환경을 맞춰보자

## Karabiner

맥 키보드 세팅과 윈도우 키보드 세팅을 맞춰주기 위한 key binding 프로그램

맥의 키보드가 적응이 안된다면 반드시 깔아야 할 1등공신

https://karabiner-elements.pqrs.org/ 에서 알아서 깔자

karabiner는 별개의 백업을 지원하고 있지 않으니 `~/.config/karabiner` 내의 파일을 킵해두는게 중요하다

우측 <kbd>Command</kbd>를 한영키 변환 같은건 인터넷에 많이 있으니 알아서 세팅

## ₩ 입력 개선

macOS는 한글입력일 땐 ₩ 가 입력되고 영문입력일 땐 \` 가 입력된다  
무조건 `가 입력되도록 시스템을 변경 

₩를 입력하려면 한글 입력 상태에서 ⌥(Options)과 함께 입력 (보통 입력할 일 없다)

근데 잘 안되는 느낌

```shell
mkdir ~/Library/KeyBindings

cat <<EOF > ~/Library/KeyBindings/DefaultkeyBinding.dict
{
  "₩" = ("insertText:", "\`");
  "~₩" = ("insertText:", "₩");
}
EOF
```

## Alfred

https://www.alfredapp.com/

spotlight를 좀 더 편리하게 쓸 수 있다.

일부 유료로 제공되는 기능들이 있지만 익숙해지면 결제해라.


## oh-my-zsh

https://github.com/ohmyzsh/ohmyzsh

zsh 를 사용한다면 모를리가 없을 것

설치 이후 `~./zshrc` 에 환경설정, 플러그인 등을 세팅할 수 있다.

### plugins

나는 아래의 플러그인들을 사용한다.

* [nvm](https://github.com/nvm-sh/nvm) 
* [fasd](https://github.com/clvv/fasd) 
* [fzf](https://github.com/junegunn/fzf) 
* [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) 
* [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

각 파일 설치 이후 `~./zshrc` 에서 해당 부분을 찾아 처리하자

```
plugins = (
  nvm
  fasd
  fzf
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

## powerlevel10k

https://github.com/romkatv/powerlevel10k

쉘 프롬프트를 이쁘장하게 꾸며줄 수 있다.

## eul

https://github.com/gao-sun/eul

맥 상태 모니터링

좀 더 귀욤한걸 원하면 [runcat](https://kyome.io/runcat/index.html?lang=en) 도 있다.

## itsycal

https://www.mowglii.com/itsycal/

`brew install --cask itsycal`

간단한 메뉴바 calendar

메뉴바에서 달력을 볼 수 있어서 편함

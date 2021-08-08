# **VSCode Markdown Preview에 GFM Style 적용하기**

> VSCode에서 기본으로 제공하는 Markdown Preview와 실제 Github에 업로드 했을 때와의 스타일 차이가 존재한다. 이를 최소화하기 위해 VSCode에 GFM(Github Flavourd Markdown) Style을 적용하는 방법을 설명한다.

## **VSCode 기본 Markdown Preview**

기본 VSCode에서 제공하는 Markdown Preview는 `.md` 파일을 작성하고 우측 상단의 미리보기 버튼을 클릭하거나 다음 Command를 통해 실시간으로 작성된 Markdown 문서를 확인할 수 있다.

- Windows: `Ctrl + K, V`
- Mac: `Cmd + K, V`

## **VSCode에서 GFM Style이 적용된 Preview 보기**

1. EXTENSIONS: MARKETPLACE > [**Markdown Preview Github Styling**](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles) 설치

2. [**markdownpad-github.css**](https://github.com/aliencube/markdownpad-github)를 다운로드 받고, 다운로드 받은 파일을 SETTINGS > EXTENSIONS > Markdown:Styles에 지정한다.

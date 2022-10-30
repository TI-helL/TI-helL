# Vuepress 만들기

회사에 들어가니 동료분이 배운 내용을 노션에 기록하는 것을 봤다(신기했다). 그래서 나도 처음에 노션으로 기록을 했었지만 회사 동료 개발자의 추천으로 TIL이란걸 알게되었다. 내가 배운 내용을 기록하는 것은 참 좋은거 같다!

그래서 TIL를 검색해봤는데 tstory나 velog에 쓰시는 분들도 있었지만 유림님의 TIL사이트를 보고 나서 깃허브 잔디도 채울수 있고 웹사이트로 구현하면 재밌을거 같아 한번 만들어봤다.

[유림님 TIL사이트](https://milooy.github.io/TIL/) 참고

[vuepress공식문서](https://vuepress.vuejs.org/) 이것두 참고

## Step 1 : Vuepress 설치

Vuepress공식 사이트에 들어가면 빠른시작과 수동설치가 있다. 빠른설치는 vuepress-site라는 테마를 다운받기 때문에 현재 TIL사이트를 만들수 없음
수동설치를 이용해서 깔자

1.먼저 vuepress 설치함

```
yarn add -D vuepress
```

2.로컬에 docs폴더와 README.md파일을 만들자

```bash
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

## Step 2 : Vuepress 실행

1.package.json 파일안에 스크립트를 추가하자

```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```

스크립트는 공식문서, 사람들 마다 다르다(처음에 헷갈림). 입맛에 맞게 바꾸자 난 유림님 코드를 참고해서 위와 같이 추가했다.

2.Vuepress살행

```
1. yarn dev
2. yarn docs:dev
```

공식 문서는 2의 명령어를 입력하여 실행하지만 난 스크립트 위와 같이 추가해서 1번 명령어를 입력해야 실행된다.

## Step 3 : Vuepress 구성

먼저 [vue 사용](https://vuepress.vuejs.org/guide/using-vue.html#using-components) 이걸 한번 읽어보자 그럼 이해된다!
docs폴더 밑에 components 폴더를 만들자. 거기에 Home.vue파일을 추가하자 Home.vue는 유림님 레포에 올라와있는걸 사용했다.

README.md파일에 Home.vue를 추가하자

```
README.md

# Hello VuePress --> 삭제
<Home/>  -->추가
```

실행하면 유림님 TIL의 첫화면이 나온다.

그후는 자기 입맛에 맞게 수정하자 [index.styl](https://vuepress.vuejs.org/config/#palette-styl)이 글을 참고하여 css를 적용하면 된다.

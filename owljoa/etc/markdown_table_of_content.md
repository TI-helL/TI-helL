# 마크다운 목차 작성 방법

- [1. 자동생성](#1-자동생성)
- [2. 문법](#2-문법)
- [3. 예시](#3-예시)

<br><br>

# 1. 자동생성

generate markdown toc 키워드로 검색해보면 웹 페이지 형태로 제공되는 마크다운 목차 자동 생성기들이 꽤 나온다.

아래 두 페이지는 가장 먼저 나오는 것들인데, 한글이 지원되지 않아서 한글은 모두 띄어쓰기와 같이 '-(하이픈)'으로 대체된다.

- [https://luciopaiva.com/markdown-toc/](https://luciopaiva.com/markdown-toc/)
- [https://ecotrust-canada.github.io/markdown-toc/](https://ecotrust-canada.github.io/markdown-toc/)

아래 페이지는 유니코드를 지원해서 한글 목차도 생성된다.

- [https://magnetikonline.github.io/markdown-toc-generate/](https://magnetikonline.github.io/markdown-toc-generate/)

<br><br>

# 2. 문법

- 작성 방법: [목차에 보여지는 내용](#클릭 시 이동할 대상 텍스트)
- 띄어쓰기는 `-(하이픈)` 으로 대체
- 영어는 모두 소문자로 변환
- 특수문자는 제외
  - ex) `나의 텍스트(Text)`의 경우 특수문자인 소괄호들을 제외하고 `나의-텍스트Text` 으로 링크

<br><br>

# 3. 예시

- 마크다운 내용

  ```markdown
  # 1. 대분류 1

  ## 1.1. 대분류 1 - 중분류 1

  ### 1.1.1. 대분류 1 - 중분류 1 - 소분류 1

  ### 1.1.1. 대분류 1 - 중분류 1 - 소분류 2

  ## 1.2. 대분류 1 - 중분류 2

  # 2. 대분류 2

  ## 2.1. 대분류 2 - 중분류 1

  ### 1.1.1. 대분류 2 - 중분류 1 - 소분류 1

  ### 1.1.1. 대분류 2 - 중분류 1 - 소분류 2

  ## 2.2. 대분류 2 - 중분류 2
  ```

    <br>

- 작성된 목차
  ```markdown
  - [1. 대분류 1](#1-대분류-1)
    - [1.1. 대분류 1 - 중분류 1](#11-대분류-1---중분류-1)
      - [1.1.1. 대분류 1 - 중분류 1 - 소분류 1](#111-대분류-1---중분류-1---소분류-1)
      - [1.1.1. 대분류 1 - 중분류 1 - 소분류 2](#111-대분류-1---중분류-1---소분류-2)
    - [1.2. 대분류 1 - 중분류 2](#12-대분류-1---중분류-2)
  - [2. 대분류 2](#2-대분류-2)
    - [2.1. 대분류 2 - 중분류 1](#21-대분류-2---중분류-1)
      - [1.1.1. 대분류 2 - 중분류 1 - 소분류 1](#111-대분류-2---중분류-1---소분류-1)
      - [1.1.1. 대분류 2 - 중분류 1 - 소분류 2](#111-대분류-2---중분류-1---소분류-2)
    - [2.2. 대분류 2 - 중분류 2](#22-대분류-2---중분류-2)
  ```
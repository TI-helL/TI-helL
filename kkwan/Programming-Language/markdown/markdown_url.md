# [Markdown] Insert URL

Markdown 문서에 URL을 삽입하는 방법들을 소개한다.

## 1. 문서 내에 URL 삽입

> 문서 내에 URL을 삽입할 수 있다. URL을 클릭하면 해당 페이지로 이동한다.

### Input

```text
https://kkwan0226.github.io/
<https://kkwan0226.github.io/>
```

### Output

**<https://kkwan0226.github.io/>**

## 2. 텍스트에 URL 삽입

> 특정 텍스트에 URL을 삽입할 수 있다. URL이 삽입된 텍스트를 클릭하면 해당 페이지로 이동한다.

### Input

```text
[kkwan.github.io](https://kkwan0226.github.io/)
```

### Output

[**kkwan.github.io**](https://kkwan0226.github.io/)

## 3. 이미지에 URL 삽입

> 이미지에 URL을 삽입할 수 있다. URL이 삽입된 이미지를 클릭하면 해당 페이지로 이동한다.

### Input

```text
[![kkwan.github.io](./img/kkwan_github_io.png)](https://kkwan0226.github.io/)
```

### Output

[![kkwan.github.io](./img/kkwan_github_io.png)](https://kkwan0226.github.io/)

## 4. URL에 설명 삽입

> 삽입한 URL에 대한 설명을 삽입할 수 있다. URL이 삽입된 텍스트에 마우스 커서를 올려두면 삽입된 설명을 확인할 수 있다.

### Input

```text
[kkwan.github.io](https://kkwan0226.github.io/ "kkwan의 Tech Blog")
```

### Output

[**kkwan.github.io**](https://kkwan0226.github.io/ "kkwan의 Tech Blog")

아래 이미지를 참고하면 이해에 도움이 될것 같다.

![url description](./img/example_url_description.png)

## 5. URL 참조

> 동일한 URL을 Markdown 문서 내에 여러번 사용하거나, 문서 내에서 링크들만 따로 관리할 수 있다.

### Input

```text
kkwan의 Tech Blog

텍스트로도 [URL 참조][kkwan.github.io]가 가능하다.

URL(kkwan.github.io)에 설명을 추가할 수도 있다.

[kkwan의 Tech Blog]: https://kkwan0226.github.io/
[kkwan.github.io]: https://kkwan0226.github.io/ "kkwan의 Tech Blog"

```

### Output

**[kkwan의 Tech Blog]**

텍스트로도 [**URL 참조**][kkwan의 tech blog]가 가능하다.

URL(**[kkwan.github.io]**)에 설명을 추가할 수도 있다.

[kkwan의 tech blog]: https://kkwan0226.github.io/
[kkwan.github.io]: https://kkwan0226.github.io/ "kkwan의 Tech Blog"

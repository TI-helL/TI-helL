# vi / vim 에디터 - 단어 단위 지우기

<br>

## 0. word / WORD

- vi/vim에서 단어를 두 가지 유형으로 구분
- 유형별로 명령에 w / W로 다르게 표현

<br>

### 0.1. word

- 공백으로 구분되는 일련의 문자, 숫자, 언더스코어(\_)
- 공백으로 구분되고 문자, 숫자, 언더스코어, 빈문자가 아닌 문자들(특수문자)이 연속되어있는 형태
- ex) !!작성방법!!
  - 단어(word) 구분 -> !!, 작성방법, !!

<br>

### 0.2. WORD

- 공백으로 구분되며 빈문자가 아닌 문자들이 연속되어있는 형태
- ex) !!작성방법!!
  - 단어(WORD) 구분 -> !!작성방법!!

<br>

## 1. dw (delete **word**)

- 커서가 있는 위치에서 시작하는 단어(word) 제거

<br>

## 2. daw (delete a **word**)

- 커서가 있는 위치를 포함하는 단어(word)와 그 앞 혹은 뒤 공백 제거

<br>

## 3. daW (delete a **WORD**)

- 커서가 있는 위치를 포함하는 단어(WORD)를 제거

<br>

## 참고

- [stackoverflow - delete word after or around cursor in vim](https://stackoverflow.com/questions/833838/delete-word-after-or-around-cursor-in-vim)
- [vim doc](http://vimdoc.sourceforge.net/htmldoc/motion.html#word)

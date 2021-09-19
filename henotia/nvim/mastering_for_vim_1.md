# VIM 마스터 하기 1

## Syntax of the Language

> Verb + Noun

동사와 명사의 합성

d: Delete
w: Word

dw = Delete Word

위 처럼 동사와 명사의 합성으로 사용하기 좋다.

### Verb

vim에서 주로 사용되는 동사류는 다음과 같다.

* d -> Delete
* c -> Change (삭제 후 insert mode 전환)
* > -> Indent
* v -> Visually Select (블락 지정으로 이해하면 편함)
* y -> Yank (복사)

### Noun

vim에서 주로 사용되는 명사류는 다음과 같다.

#### step 1 - Motions

* w -> Word (다음 단어로 이동)
* b -> Back (이전 단어로 이동)
* h, j, k, l -> 좌 / 하 / 상 / 우로 이동
  * 2j -> 아래로 두줄 이동


#### step 2 - Text Objects

* iw -> inner word
* it -> inner tag (HTML tag 같은)
* i' -> inner qoutes
* ip -> inner paragraph
* as -> a sentence


#### step 3 - Parameterized Text Objects

* f -> "Find" the next Character by Forward (다음 문자 포함)
    * F -> "Find" the next Character by Backword
* t -> "Find" the next Character (다음 문자 제외)
    * T -> "Find" the next Character by Backword
* / -> Search (다음 match가 있을때 까지)

### ETC

* . -> 이전 명령어 반복

### Practice

sample.rb, sample.html 파일에 가서 연습해보자  
내용은 주석에 적혀있다


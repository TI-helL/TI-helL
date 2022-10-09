# String 관련 유용한 함수

String의 다양한 함수들을 알아보자 


## 문자열 길이

```js
const text = 'Hello World!';
console.log(text.length);
output: 12
```


## 각각의 위치에 문자를 확인할 수 있는 방법

```js
//배열로
console.log(text[0]);
console.log(text[4]);
//함수로 접근
console.log(text.charAt(0));
console.log(text.charAt(4));

output: 
H
o
H
o
```


## 문자열 인덱스 찾는방법

```js
//앞에서부터
console.log(text.indexOf('l'));
//뒤부터
console.log(text.lastIndexOf('l'));
output: 
2
9
```


## 특정 문자 포함 여부

```js
//문자열에 포함되는지 확인하는 방법 대소문자 구분해야함 
console.log(text.includes('h'));
console.log(text.includes('H'));

//문자열이 특정한 문자로 시작하는지 확인하는 방법
console.log(text.startsWith('h'));
console.log(text.startsWith('H'));
console.log(text.startsWith('He'));

//문자열이 특정한 문자로 끝나는지 확인하는 방법
console.log(text.endsWith('!'));

output: 
false
true
false
true
true
true
```

## 대소문자 변경

```js
//대문자로 변경
console.log(text.toUpperCase())
//소문자로 변경
console.log(text.toLowerCase())

output:
HELLO WORLD!
hello world!
```

## 문자열 슬라이싱 

```js
//0부터 2까지 문자열을 출력
console.log(text.substring(0,2))
//2번째 인덱스에서 자른 나머지 부분 출력
console.log(text.slice(2))
//뒤에서 2번째에서 자른 나머지 출력
console.log(text.slice(-2))

output:
He
llo World!
d!
``` 

```js
//공백제거
const space = '           space        ';
console.log(space.trim())

output:
space
```

```js
//특정문자열 부분 끊어서 배열로 변환 
const longText = 'hello tae kyu';
console.log(longText.split(' '))
//2개까지만 출력
console.log(longText.split(' ',2))

output:
[ 'hello', 'tae', 'kyu' ]
[ 'hello' ]
```
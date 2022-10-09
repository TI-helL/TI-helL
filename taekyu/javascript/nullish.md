# 널체크 깔끔하게 하기 (nullish coalescing operator)


nullish coalescing operator -> ?? ES11 문법

??연산자는 여러가지 false한 값 중 null만 체크한다.

|| 는 false한 경우를 가려내기 때문에 만약 num이 0일경우 유효한 숫자인데 false로 판단하여 버그가 발생하는 경우가 있다(원하는 값을 출력하지 못함)

그래서 ?? 를 사용하여 null만 걸러내보자
```js
let num = 0 //false
console.log(num || '-1') //-1
console.log(num ?? '-1') //0 

num = null
console.log(num || '-1') //-1
console.log(num ?? '-1') //-1

num = ''
console.log(num || '-1') //-1
console.log(num ?? '-1') //''

num = 4 
console.log(num || '-1') //4
console.log(num ?? '-1') //4
```
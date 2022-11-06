# 스코프

스코프 : 범위 영역 --> 변수를 참조할 수 있는 유요한 범위 또는 식별자가 유요한 범위라 한다.

식별자는 변수,함수,클래스 이름을 뜻함

선언된 위치에 따라 유효 범위가 결정됨

범위를 결정하는 방법, 블록?

```
{
  블록 안의 변수는 블록 안에서만 유효함
}
```

왜 스코프가 존재할까?

이름 충돌을 방지, 블록이 끝나는 변수는 자동으로 메모리에서 제거됨 -> 메모리 절약이 가능

코드 블록: {} if{} for{} function{}

```js
// 블록 외부에서는 블록 내부의 변수를 참조할 수 없다
{
  const a = "a"
  console.log(a)
}
// console.log(a) error
```

```js
//함수 외부에서 함수 내부의 변수를 참조할수없다.
function print() {
  const message = "hello"
  console.log(message)
}
// console.log(message) error
```

```js
//함수 외부에서는 함수의 매개변수를 참조할수없다.
function add(a, b) {
  console.log(a, b)
}
// console.log(a,b) error
```

```js
const text = "global" // 전역 변수, 전역 스코프(글로벌 변수, 글로벌 스코프)
{
  const text = "local1" // 지역 변수, 지역 스코프(로컬 스코프)
  {
    const text = "local2"
    console.log(text)
  }
}
```

# var의 특징

var사용하면 안되는 이유를 알아보자

일반 코딩 방식과 어긋나서 개발하면서 힘들다

코드의 가독성과 유지보수성에 좋지 않음

1.변수 선언하는 키워드 없이 선언과 할당이 가능하다

```js
a = "a" //이렇게 키워드가 없으면 var를 사용하는 것과 동일하다.
console.log(a) //a
```

2.중복 선언이 가능함 (개발시 실수할 가능성이 높다)

```js
//재선언이 가능하다.
var a = "a"
var a = "a"
console.log(a) //a
```

3.블록 레벨 스코프가 안된다.

```js
var a = "a"
{
  var a = "b"
}
console.log(a) //b
```

4.함수 레벨 스코프만 지원된다.

```js
function ex() {
  var a = "a"
}
console.log(a) //a
```

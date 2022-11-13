# this

자바스크립트는 브라우져와 노드에서 동작하는 언어다.

브라우져에서 this 는 window 객체를 가리키고 노드에서 this는 모듈을 가르킨다.

```js
console.log(this) //{}
// 노드 환경에서 this란 모듈을 나타냄
// 모듈내부의 아무것도 정의되있지 않아 빈 괄호가 출력됨
```

## module 사용

```js
// 노드는 기본적으로 Common js라는 내부적으로 저장된 모듈을 사용한다.
const x = 0
module.exports.x = x
console.log(x) //0
console.log(globalThis) //노드에서 사용하는 전역 겍체가 들어있음
```

## 함수 내부 this

```js
function func() {
  console.log(this) //글로벌 this가 출력됨
}
func()
```

## 함수 내부 this 'use strict'

```js
function func() {
  console.log(this) //함수 스코프 내부의 this 장버기 앖으므로 undefined출력
}
func()
```

## 동적 바인딩

생성자 함수 또는 클래스에서 this, 잎으로 생성될 인스턴스 자체를 가리킴

```js
function Cat(name) {
  this.name = name
  this.printName = function () {
    console.log(this.name)
  }
}
const cat1 = new Cat("foo") // this에 의해 {name, printName}이 할당됨
const cat2 = new Cat("bar")
cat1.printName()
cat2.printName()
```

자바,c++ 대부분의 객체 지향 프로그래밍 언어에서는 this는 항상 자기 자신의 인스턴스 자체를 가리킴

하지만 자바스크립트는 누가 호출하냐에 따라 this가 달라짐, 함수를 호출하는 사람에 의해 동적으로 결정됨

예시를 확인해 보자

예시1

```js
cat1.printName = cat2.printName
cat1.printName() // bar
```

위와 같이 cat2의 printName이 cat1의 printName로 할당되면서 cat의 printName이 출력된다.

예시2

```js
function print(printName) {
  printName() //pinrt함수 내부에 printName을 출력하는 this객체가 없다.
}
print(cat1.printName) //undefined
```

자바스크립트는 누가 호출하는지 따라서 동적으로 결정됨

이러한 동적인 방식은 정적으로 바인딩을 하여 해결할 수 있다.

## 정적 바인딩

1. bind함수를 이용해서 수동적으로 바인딩 해주기

```js
function Cat(name) {
  this.name = name
  // this.printName = function () {
  //   console.log(this.name)
  // }
  this.printName = this.printName.bind(this)
}
```

2. arrow 함수 사용

arrow 함수는 렉시컬 환경에서 this를 기억함

화살표 함수 밖에서 제일 근접한 스코프의 this를 가리킴

```js
function Cat(name) {
  this.name = name
  this.printName = () => {
    console.log(this.name)
  }
}
```

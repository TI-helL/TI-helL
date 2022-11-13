# 클로져

```js
function outer() {
  const x = 0
  function inner() {
    x
  }
  return inner
}
const inner = outer()
inner()
```

1. outer 함수실행
2. 실행 컨텍스트 스택 [전역 스코프 렉시컬 환경, outer스코프 렉시컬 환경]
3. inner함수 리턴 해줌으로 블록 밖에 있는 변수에 inner함수가 저장됨 , 즉 변수는 inner 스코프를 참조하고 inner 스코프는 outer 스코프를 참조함으로 렉시컬환경이 체이닝 상태가 되어 유지된다.

## 클로저 사용이유

내부 정보를 은닉하고 공개함수(public)를 통한 데이터 조작을 위해서 사용됨

클래스의 캠슐화와 정보은닉, 클래스 private 와 동일한 효과가 있다.

자바스크립트가 class와 private를 지원하지 않았을때 사용했다.

클로저는 함수가 중첩되어있을때 내부함수가 외부함수의 랙시컬환경에 접근할수있으니까 외부환경에 접근이 가능함

```js
function makeCounter() {
  let count = 0 //외부에서 접근 불가
  function increase() {
    count++
    console.log(count)
  }
  return increase
}

const increase = makeCounter()
increase()
increase()
increase()
```

클래스로도 작성가능 이게 최신 문법임

```js
class Counter {
  #count = 0
  increase() {
    this.#count++
    console.log(this.#count)
  }
}
const a = new Counter()
a.increase()
a.increase()
a.increase()
```

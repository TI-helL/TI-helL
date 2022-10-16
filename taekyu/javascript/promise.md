# promise 기초

프로미스는 비동기적으로 수행하는 결과를 끝났다고 알려주는 객체다

프로미스 상태는 3가지

- 대기(_pending)_: 이행하지도, 거부하지도 않은 초기 상태.
- 이행(_fulfilled)_: 연산이 성공적으로 완료됨.
- 거부(_rejected)_: 연산이 실패함.

이행이나 거부가 될때 then에 의해 실행됨 만약 거부가 된다면 catch로 오류를 처리해 줘야함

## 프로미스 생성자

resolve 는 then을 호출할때 사용할 콜백함수

reject 는 에러가 났을때 사용할 콜백 함수

```js
new Promise(resolve, reject)
```

## 예제

대기 상태에서 성공적으로 이행이 되면 resolve함수가 호출됨 성공하면 then안에 있는 문장이 실행됨

```js
function runDelay(sec) {
  return new Promise((resolve, reject) => {
    if (!sec || sec < 0) {
      reject(new Error("sec error"))
    }
    setTimeout(resolve, sec * 1000)
  })
}

runDelay(2)
  .then(() => {
    console.log("timer finish")
  })
  .catch(console.error)
  .finally(() => console.log("finally"))
```

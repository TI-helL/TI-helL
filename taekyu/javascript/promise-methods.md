# 프로미스 메소드

아래와 같이 각각 3개의 프로미스가 있다.

```js
function one() {
  //1초 소요
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("one")
    }, 1000)
  })
}

function three() {
  //3초 소요
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("three")
    }, 3000)
  })
}

function four() {
  // 오류
  return new Promise((reject) => {
    reject(new Error("error!!!"))
  })
}
```

```js
one()
  .then((num1) => three().then((num3) => [num1, num3]))
  .then(console.log)

// 병렬적으로 모든 Promise 실행
Promise.all([one(), three()]).then((nums) => console.log("all", nums))

// Promise중 제일 빨리 수행된거 실행
Promise.race([one(), three()]).then((nums) => console.log("race", nums))

output:
race one
all [ 'one', 'three' ]
[ 'one', 'three' ]
```

먼저 문장 실행 결과는 4초가 소요 (1초가 실행된후 3초가 실행됨)

두번째 문장 실행 결과는 Promise.all 을 사용하여 병렬적으로 처리를 했음으로 총 3초가 소요

세번째 문장 실행 결과는 Promise.race를 사용하여 가장 먼저 이행된 객체를 반환하여 1초가 소요

> Promise.all(iterable)
>
> 병렬적으로 한번에 모든 Promise들을 실행함

> Promise.race(iterable)
>
> 가장먼저 완료된 프로미스를 반환

> Promise.allSettled(iterable)
>
> 각 프로미스에 대한 결과를 나타내는 객체 배열을 반환

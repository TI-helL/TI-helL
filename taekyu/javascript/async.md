# 비동기

## 시작

우리가 흔히 자바스크립트에서 비동기라 하면 크게 3가지가 있다. 바로 콜백, 프로미스, async / await다.

### 콜백

콜백 함수는 인자를 함수로 받아 함수안에서 실행하는 또 다른 함수를 뜻한다.

아래는 두 개 코드는 비동기 콜백 함수다. (데이터를 불러와 작업하는 과정이라 생각해보자)

```js
function loadData(callback, sec) {
  setTimeout(callback, sec * 1000)
}

function load() {
  console.log("로딩중")
  console.log("데이터를 받았다.")
}
loadData(load, 1)
//로딩중
//데이터를 받았다.
```

```js
function loadData(callback, sec) {
  setTimeout(callback, sec * 1000)
}

function load() {
  console.log("로딩중")
}

loadData(load, 1)
console.log("데이터를 받았다.")
//데이터를 받았다.
//로딩중
```

두 코드의 차이점을 생각해 보자.

loadData를 불러와 데이터를 받았지만 두 개 코드가 서로 반대되는 결과가 나온다.

이처럼 비동기적인 콜백함수는 콜백 함수 내부에서만 로직을 다뤄야지 원하는 결과를 얻을 수 있다.

그렇기 때문에 콜백 함수 내부에서 아래 코드와 같이 데이터를 불러온다면 가독성이 떨어지고 에러 핸들링이 불편하다. (이걸 콜백 지옥이라 한다.)

```js
//콜백지옥
loadData(function (value1) {
  loadData(function (value2) {
    loadData(function (value3) {
      loadData(function (value4) {
        loadData(function (value5) {
          loadData(function (value6) {
            // Do something with value6
          })
        })
      })
    })
  })
})
```

비동기 콜백함수의 단점을 정리하면 다음과 같다.

1.콜백함수 안에서 데이터를 다뤄야지 원하는 결과를 얻을 수 있다.

2.콜백함수 안에서 데이터를 다루다보면 가독성이 떨어진다.

3.콜백지옥에 빠진다.

이 3가지 단점을 해결하는것이 프로미스다

### 프로미스

프로미스는 간단하게 설명하면 대기, 이행, 거부 상태를 가진다.

프로미스 객체를 생성했다면 대기,

프로미스 객체가 성공했다면 이행,

프로미스 객체가 실패했다면 거부 상태를 나타난다.

아래와 같이 프로미스로 작성이 가능하다.

```js
function loadData(sec) {
  return new Promise((resolve) => {
    setTimeout(resolve("로딩중"), sec * 1000)
  })
}

loadData(1).then((load) => {
  console.log(load)
  console.log("데이터를 받았다.")
})
//로딩중
//데이터를 받았다.
```

프로미스가 콜백 함수 보다 더 깔끔해 보인다.

loadData를 실행하면 프로미스는 대기 상태가 되고 setTimeout이 끝나면 이행 상태가 되어 프로미스 객체를 반환하고 then 부분을 실행하게 된다.

이처럼 프로미스를 사용하면 콜백함수보다 간단하게 로직을 짤 수 있고, 가독성이 올라가며, 에러핸들링이 편하다.

하지만 프로미스가 꼭 좋은 건 아니다. 지금은 then이 한 개이지만 then을 중첩해서 사용할 경우 콜백 함수처럼 보일 수 있고, 그러면 가독성이 떨어지게 된다.

그래서 동기적으로 보이게끔 하여 가독성을 쉽게하고 깔끔하게 코드작성이 가능한 async / await가 나왔다.

### async / await

async / await는 동기적으로 보이지만 비동기코드이다.

```js
function loadData(sec) {
  return new Promise((resolve) => {
    setTimeout(resolve("로딩중"), sec * 1000)
  })
}
async function printData() {
  const data = await loadData(1)
  console.log(data)
  console.log("데이터를 받았다.")
}
printData()
//로딩중
//데이터를 받았다.
```

printData()함수를 보면 loadData를 받고 "데이터를 받았다."가 출력된다.

프로미스와 같이 비동기적으로 호출되지만 동기적으로 코드를 작성한거 같고 깔끔하게 보인다.

그러므로 가독성이 더 좋은거 같다. (개발하면서 실제로 async / await 코드를 많이 쓴다. 가독성이 더 좋음)

## 결론

비동기 처리를 할때 async / await를 사용하자!

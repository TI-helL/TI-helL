# 자바스크립트 런타임 환경

자바스크립트 런타임 환경은 자바스크립트 엔진, WEB APIs, Callback Queue, Event Loop으로 구성되어 있다.

## 콜스택

자바스크립트는 싱글 스레드 프로그래밍 언어다. (싱글 스레드가 무엇인지는 구글링을 해보자!)

여기선 싱글 스레드와 콜스택을 같은 개념으로 이해하면 편하다. (싱글 스레드 == 콜스택)

먼저 설명하기 전에 콜스택에 대해 간단히 설명하면 콜스택은 함수가 실행되면 콜스택에 들어오고 함수에서 리턴이 일어나면 콜스택의 가장 위쪽에서 해당 함수를 꺼낸다.

코드로 확인해 보자.

```js
function multiply(x, y) {
  return x * y
}
function printSquare(x) {
  var s = multiply(x, x)
  console.log(s)
}
printSquare(5)
```

Step1: printSquare(5) 함수가 콜스택에 들어온다.

Step2: printSquare(5) 함수가 들어와서 실행 중 multiply(x,y)함수를 발견하여 multiply(x,y)함수가 콜스택으로 들어온다.

Step3: multiply(x,y) 함수가 실행돼서 x\*y값을 리턴 받아 콜스택을 빠져나왔다. 그후 console.log(s)가 콜스택에 들어온다.

Step4: console.log(s)가 실행되어 콜스택을 빠져나 간후 printSquare(5) 함수가 종료 되어 콜스택에 빠져나간다.

Step5: 모든 코드를 실행했으므로 콜스택에 남아있는 건 없다.

## Non-Blocking

Non-Blocking을 설명하기 전에 Block이 된다는 걸 무엇인지 알아야한다.

Block은 간단히 설명하면 느려지는거다.

```js
var foo = $.getSync("//foo.com")
var bar = $.getSync("//bar.com")
var baz = $.getSync("//baz.com")

console.log(foo)
console.log(bar)
console.log(baz)
```

동기적으로 AJAX요청을 보내는 jQuery 함수 getSync가 있다고 한다면

getSync를 호출하면 응답을 기다릴 때까지 프로그램이 멈추게 된다.

즉 Block상태는 브러우저에 치명적인 오류를 발생시킨다. 브라우저는 다이나믹한 UI를 렌더링하는데 위와 같은 상황이 발생해 코드가 잠깐 중단된다면 다이나믹한 UI를 렌더링 할 수 없게 된다.

그래서 결국 브라우저는 Non-Blocking 방식을 채택하게 되었고 자바스크립트의 싱글스레드 방식을 효과적으로 지원하는 Web APIs와 Task Queue, Event Loop 같은 것들을 지원하게 되었다.

## 자바스크립트 런타임

자바스크립트 엔진 안에 Memory heap과 Call Stack이 있고 엔진 밖에 Web APIs, Callback Queue, Event Loop들이 있다.

### Call Stack (자바스크립트 엔진)

코드 실행에 따라 콜백함수들이 쌓이는 곳(LIFO 후입 선출)

### Web APIs

호스트 환경에서 제공해주는 API다 비동기적으로 실행이 가능하다.

예) dom, setTimeout, setInterval, Fetch, Event Listener

### Callback Queue

WebAPIs의 실행이 끝나고 나면 Callback Queue에 콜백 함수들이 전달된다.

### Event Loop

Callback Queue, Call Stack을 감시하여 만약 Call Stack이 비어있다면 Callback Queue에 있는 콜백함수를 Call Stack으로 전달한다.

```js
console.log("Hi")
setTimeout(function cb() {
  console.log("there")
}, 3)
console.log("Hello")
```

과정은 아래와 같다.

Step1:

console.log('Hi')가 Call Stack에 들어온다.

Step2:

Web Apis의 setTimeout가 실행된다.

Step3:

console.log('Hi')가 콘솔창에 출력되고 Call Stack을 빠져나온다.

Step4:

console.log('Hello')가 Call Stack에 들어온다.

Step5:

console.log('Hi')가 콘솔창에 출력되고 Call Stack을 빠져나온다.

Step6:

setTimeout에 timer가 3초가 실행되면 console.log('there')가 Callback Queue에 들어온다.

Step7:

Event Loop가 Call Stack이 비었는지 확인 후 비어있다면 Callback Queue있던 console.log('there')를 Call Stack으로 밀어넣는다.

Step8:

Call Stack에 있던 console.log('there')가 콘솔창에 출력되고 Call Stack을 빠져나온다.

## 결론

자바스크립트 런타임 환경은 비동기적인 기능을 제공해 주어 단일 스레드기반의 자바스크립트를 브라우저에 사용될 수 있게 했다. (그래서 자바스크립트가 웹 생태계에서 잘 살아고 있지 않을까? 생각한다)

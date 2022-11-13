# arrow function (화살표 함수)

자바스크립트에서 정적 바인딩을 bind와 화살표 함수를 사용하여 해결할 수 있다. 화살표 함수에 대해 자세히 정리 해보겠다.

## 함수 방식

자바스크립트에서 함수는 다양한 기능을 갖고있다. 객체 안에 함수로 사용이 가능하고 생성자 함수로도 사용이 가능하다.

하지만 이런 방식은 불핋요한 프로토타입을 생성한다는 단점이 존재했다.

```js
const dog = {
  name: "dog",
  play: function () {
    //함수 사용
    console.log("멍멍")
  },
}
dog.play()
const obj = new dog.play() // 생성자 함수로도 사용됨
console.log(obj)
```

## ES6 메소드

이걸 해결하기 위해 ES6에 메소드 정의가 추가되었다.

```js
//ES6
const cat = {
  name: "cat",
  play() {
    //객체의 메소드로 정의함
    console.log("야용")
  },
}
cat.play()
```

메소드로 정의하게 되면 생성자 함수로 정의도 할수없고, 불필요한 프로토타입이 생성되는것을 막을수 있다.

## 화살표 함수

화살표 함수의 특징

- 문법이 깔끔
- 생성자 함수로 사용이 불가능 (무거운 프로토타입을 만들지 않음)
- 함수 자체 argumnets를 갖고있지 않음
- this에 대한 바인딩이 정적으로 결정됨
  - 함수에서 제일 근접한 상위 스코프의 this에 정적 바인딩이 된다.

```js
const printArrow = () => {
  console.log(this)
}
printArrow()
console.log()
cat.printArrow = printArrow
cat.printArrow() //printArrow함수 내부에서 정적으로 결정된 this를 출력함
```

## 결론

화살표 함수는 함수 내부에서 사용할 경우 객체 내부의 this와 정적 바인딩을 할 수 있다.

# 프로토타입

프로토타입레벨의 함수를 사용하면 메모리 절약이 가능함

```js
function Dog(name, age) {
  this.name = name
  this.age = age
  // 인스턴스 레벨의 함수 -> 메모리 낭비가 될수 있슴
  // this.printName = () => {
  //   console.log(`${this.name} ${this.age}`)
  // }
}

const dog1 = new Dog("foo", 1)
const dog2 = new Dog("bar", 5)
console.log(dog1, dog2)

//프로토타입 레벨의 함수  , 메모리 절약이 가능함
//Dog라는 함수의 프로토타입 레벨의 함수를 등록함
Dog.prototype.printName = function () {
  console.log(`${this.name} ${this.age}`)
}
dog1.printName()
dog2.printName()
```

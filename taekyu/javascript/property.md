# property

프로퍼티란 속성이란 뜻으로 자바스크립트에서 객체 내부의 속성을 의미한다.

객체는 프로퍼티로 구성된다. 프로퍼티는 "key(키)" : "value(값)" 의 형식으로 객체 안의 콤마(쉼표 ,)로 구분되어 할당된다.

Key는 속성명이라 생각해도 되고 문자열만 가능하며, 문자열이지만 따옴표가 없어도 된다.(있어도 무방. 띄어쓰기가 있는 경우는 있어야 함.)

Value는 속성값이라고도 부르며, 어떤 값이든지(문자열, 숫자, 객체, 함수 등 아무거나) 상관없다.

객체에 함수를 정의할 경우, 속성값이라 하지않고 메소드(Method)라고 부른다.

객체를 활용함에 있어서 유용하다. 특정 객체가 가지고 있는 정보를 품고 있기에 해당 객체가 가진 정보에 직접적으로 접근할 수 있게 해준다.

```js
const person = { name: "foo", age: 1 }

//객체 key출력
console.log(Object.keys(person))
//key,value, 모두 출력
console.log(Object.entries(person))
//value값 출력
console.log(Object.values(person))

//key가 있는지 검사
console.log("name" in person)
console.log(person.hasOwnProperty("name"))

//오브젝트의 각각의 프로퍼티는 프로퍼티 디스크립터라고 하는 객체로 저장됨
const des = Object.getOwnPropertyDescriptors(person)
console.log(des)
// writable: true, 수정가능한지
// enumerable: true, 열거가능한지
// configurable: true 속성들을 수정할 수 있는지

const desc = Object.getOwnPropertyDescriptor(person, "name")
console.log(desc)

Object.defineProperty(person, "name", {
  value: "bar",
  writable: false,
  enumerable: false,
  configurable: false,
})
console.log(person.name)
console.log(Object.keys(person)) // 얄가기 안된다 설정했기 때문에 값이 출력되지 않음 enumerable flase 니까
```

# json

json: javaScipt Object Notification

서버와 클라이언트간의 HTTP통신을 위한 오프젝트 형태의 텍스트 포맷이다.

stringify : 오브젝트를 json으로 바꿔줌

parse : json을 오브젝트로 바꿔줌

```js
const person = {
  name: "person",
  age: 20,
}

// 직렬화 Serializing:객체를 문자열로 변환
const json = JSON.stringify(person)
console.log(json)
// 역직렬화  Deserializing: 문자열 데이터를 자바스크립트 객처로 변환
const obj = JSON.parse(json)
console.log(obj)
```

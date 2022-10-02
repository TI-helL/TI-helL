# Set 

set객체는 자료형에 관계없이 원시 값과 객체 참조 모두 ```유일한```값을 저장할 수 있음

## set 생성
```js
const set = new Set([1,2,3])
console.log(set) // Set(3) { 1, 2, 3 }

// 크기 확인
console.log(set.size) //3 

//존재하는지 확인
console.log(set.has(3)) //true
```

## 추가,삭제,전체 삭제
```js
set.add(4)
set.add(2)
console.log(set)
set.delete(6)
console.log(set)
set.clear()
console.log(set)
output:
Set(4) { 1, 2, 3, 4 }
Set(4) { 1, 2, 3, 4 }
Set(0) {}
```

set 은 순회가 가능함
```js
set.forEach((e)=>console.log(e))
for(const value of set.values()){
    console.log(value)
}
```

Set객체 안에 있는 데이터는 중복이 안된다. 하지만 객체는 다름 

객체를 생성하면 각각 다른 주소를 갖고 있기 때문에 동일한 값을 넣어도 중복이 아님
```js
const user1 = {name:'박태규', age:25}
const user2 = {name:'손흥민', age:30}
const users = new Set([user1,user2])
console.log(users)

const user3 = {name:'손흥민', age:30}
users.add(user3)
console.log(users)
output:
Set(2) { { name: '박태규', age: 25 }, { name: '손흥민', age: 30 } }
Set(3) {
  { name: '박태규', age: 25 },
  { name: '손흥민', age: 30 },
  { name: '손흥민', age: 30 }
}
```
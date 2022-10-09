# 배열의 다양한 함수



```js
const array = [1,2,3,4]

//특정한 오브젝트가 배열인지 체크
console.log(Array.isArray(array));

//특정한 아이템의 위치를 찾을때
console.log(array.indexOf(3));

//배열안에 특장한 아이템이 있는지
console.log(array.includes(3));

ouput:
true
2
true
```

아이템 추가, 배열 자체가 업데이트 됨

```js
//뒤쪽에 아이템 추가,
let length=array.push(5)
console.log(array);
console.log(length);

//앞쪽에 아이템 추가
length=array.unshift(0)
console.log(array);
console.log(length);

ouput:
[ 1, 2, 3, 4, 5 ]
5
[ 0, 1, 2, 3, 4, 5 ]
6
```

제거

제거한 아이템을 return해준다.

```js
//제일 뒤에 있는 아이템을 제거
let lastItem = array.pop()
console.log(array);
console.log(lastItem);

//앞쪽에 있는 아이템 제거
lastItem = array.shift()
console.log(array);
console.log(lastItem);

ouput:
[ 0, 1, 2, 3, 4 ]
5
[ 1, 2, 3, 4 ]
0
```

중간에 추가, 삭제


```js
const deleted = array.splice(1,1); //(start, deleteCount, items...)
console.log(array);
console.log(deleted);
array.splice(1,0,5,6); //인덱스 1번에 ,5,6 추가 제거할 아이템은 없음
console.log(array);
array.splice(1) //인덱스 1부터 모든 요소 제거
console.log(array);

ouput:
[ 1, 3, 4 ]
[ 2 ]
[ 1, 5, 6, 3, 4 ]
[ 1 ]
```

배열 합치기

```js
//배열을 합침
const arr1= [1,2,3]
const arr2= [4,5,6]
const arr3= arr1.concat(arr2);
console.log(arr3);

ouput:
[ 1, 2, 3, 4, 5, 6 ]
```

배열 거꾸로 출력

```js
//배열을 거꾸로
const arr4 = arr3.reverse()
console.log(arr4);

ouput:
[ 6, 5, 4, 3, 2, 1 ]
```

2차원 배열 다루기

```js
//중첩 배열을 하나의 배열로 쫙 펴기
let arr = [
    [1,2,3],
    [4,[5,6]],
];
console.log(arr.flat()); //1 단계의 배열을 펴줌
console.log(arr.flat(2)); //2 단계의 배열을 펴줌

//특정한 값으로 배열을 채움, 배열 자체를 수정
arr.fill("a"); //a으로 값을 채움
console.log(arr);
//arr.fill(채울값,startIdx,endIdx);

ouput:
[ 1, 2, 3, 4, [ 5, 6 ] ]
[ 1, 2, 3, 4, 5, 6 ]
[ 'a', 'a' ]
```

```js

//배열을 문자열로 합치기
let text = arr.join()
console.log(text);
text = arr.join(" . ")
console.log(text);

ouput:
a,a
a . a
```

얕은 복사 

객체는 메모리 주소를 전달함, 자바스크립트에서 복사할 떄는 항상 얕은 복사가 일어남

```js
const cat = {name:'cat', kg:2};
const dog = {name:'dog', kg:4};
const pet1 = [cat,dog];
const pet2 = Array.from(pet1);
console.log("pet1: ",pet1);
console.log("pet2: ",pet2);

cat.kg = 5 //수정

console.log("pet1: ",pet1);
console.log("pet2: ",pet2);

ouput:
pet1:  [ { name: 'cat', kg: 2 }, { name: 'dog', kg: 4 } ]
pet2:  [ { name: 'cat', kg: 2 }, { name: 'dog', kg: 4 } ]
pet1:  [ { name: 'cat', kg: 5 }, { name: 'dog', kg: 4 } ]
pet2:  [ { name: 'cat', kg: 5 }, { name: 'dog', kg: 4 } ]
```
바뀐 이유

cat,dog의 메모리주소를 pet1,2가 받아 왔기 때문에 동일값이 출력됨


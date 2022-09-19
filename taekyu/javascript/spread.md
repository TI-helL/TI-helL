# spread 연산자

spread연산자는 이터레이션 프로토콜을 따르는 객체를 쫙 펴줌

```js

//스프레드 연산자 
//이터레이션 프로토콜을 따라야함 

function add(a,b,c){
    return a+b+c
}
const num=[1,2,3,4,5]
console.log(add(...num))

//rest parameter
function nums(first, second, ...num){
    console.log(num)
}

nums(1,2,3,4,5,6,7)

const arr1 = ['a','b']
const arr2 = ['c','d']
//let arr = arr1.concat(arr2)
//console.log(arr)
console.log([...arr1,...arr2])

const pet = {name:'cat', age:2, hmoe:{adderss:'home'}}
const update = {
    ...pet,
    kg: 5,
}
console.log(pet)
console.log(update)

output
6
[ 3, 4, 5, 6, 7 ]
[ 'a', 'b', 'c', 'd' ]
{ name: 'cat', age: 2, hmoe: { adderss: 'home' } }
{ name: 'cat', age: 2, hmoe: { adderss: 'home' }, kg: 5 }
```
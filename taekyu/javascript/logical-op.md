# 논리연선자 활용

## 단축평가(short-circuit evaluation)

두객체 obj1 과 obj2를 비교할때 객체 안에 값이 들어 있기 때문에 밑에 조건문은 참이 나온다.
```js
const obj1 = {name:'삼성'}
const obj2 = {name:'애플', owner:'주인'}

if(obj1 && obj2){
    console.log("true") //true
}
```

논리연산자를 조건문 밖에 사용하면 어떻게 되나면
obj1이 참이지만 and는 두조건 모두 참이어야 만족하기 때문에 obj2까지 검사를 해봐야한다. 그래서 최종값인 obj2가 result변수에 저장된다. 

하지만 or연산자의 경우를 보면 obj1이 참이기 때문에 굳이 obj2를 검사할 필요가 없다. 그래서 obj1의 값이 출력됨 
```js
let result = obj1 && obj2
console.log(result) //{ name: '애플', owner: '주인' }

result = obj1 || obj2
console.log(result) //{ name: '삼성' }
```

활용예시

and 조건이 true일때 무언가를 해야할 경우 or조건이 false일때 무언가를 해야할 경우 아래와 같이 사용가능  

changeOwner함수의 경우 obj2값이 참인여서 obj2값이 변경됨

makeNewOwner함수의 경우 obj1이 거짓이기 때문에 obj1값이 변경됨 

```js
function changeOwner(phone){
    if(!phone.owner){
        throw new Error('주인이 없음')
    }
    phone.owner = '원래주인'
}
function makeNewOwner(phone){
    if(phone.owner){
        throw new Error('주인있음')
    }
    phone.owner = '새로운 주인'
}

obj1.owner && changeOwner(obj1)
obj2.owner && changeOwner(obj2)
console.log(obj1) //{ name: '삼성' }
console.log(obj2) //{ name: '애플', owner: '원래주인' }

obj1.owner || makeNewOwner(obj1) 
obj2.owner || makeNewOwner(obj2)
console.log(obj1)//{ name: '삼성', owner: '새로운 주인' }
console.log(obj2)//{ name: '애플', owner: '원래주인' }
```

## null 또는 undefined인 경우를 확인 할 때

원래 const price = item.price 이렇게 사용하면 오류가 나오지만 단축평가로 인해 undefined가 나옴

```js
let item
const price = item && item.price
console.log(price) //undefined
```


## 기본값을 설정할 때


값이 false인경우 설정됨 0,-0,null, undefined, ''

defalut parmeter를 사용하는 경우 (message='Hi') undefiend하거나 파라미터값을 전달하지 않을때만 설정되므로 여러가지 false한 경우를 충족하지 않아서 기본값으로 설정하기엔 부족함

그래서 기본값을 설정할 때 아래와 같이 하는게 좋음 
```js
function print(message){
    const text = message || 'Hi'
    console.log(text) //Hi
}
print() 
```

## 옵셔널 체이닝

?. -->옵셔널 체이닝 기호 ES11

null 또는 undefined를 확인할 때 사용함

```js
//price 값이 참이 때문에 price값이 출력됨
let item = {price:1}
const price = item?.price
console.log(price) //1

//item에 아무값도 없어서 undefined 출력
let item1
const price1 = item1?.price
console.log(price1) //undefined
```

```js
let obj = {name:'애플', owner: {name:'태규'}}
function printName(obj){
    // const ownerName = obj && obj.owner && obj.owner.name ---> 너무 기니까 옵셔널 체이닝으로 줄여서 사용
    const ownerName = obj?.owner?.name
    console.log(ownerName)
}
printName(obj)
```
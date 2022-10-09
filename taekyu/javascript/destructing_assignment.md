# 구조 분해 할당 (Destructuring_assignment) 

구조 분해 할당은 배열이나 객체를 해제하여 그 값을 개별적으로 **의미있는** 변수에 담을 수 있게 하는 Java Script 표현식임  

배열 구조 분해 할당
```js
const points = [1,2,3,4,5]
const [x,y,...others]=points
console.log(x)
console.log(y)
console.log(others)
output: 
1
2
[ 3, 4, 5 ]
```

함수도 가능

```js
function createpoint(){
    return [1,2]
}
const [p_x,p_y] = createpoint()
console.log(p_x) //1
console.log(p_y) //2

```

객체 구조 분해 할당

원래 변수를 사용할때 info.name 을 써야했지만 name의 변수를 지정해줘서 사용가능

```js
const info = {name:'박태규', age:25, major:'s/w'}
function display({name,age,major:job}){   //변수 이름 바꿀 수 있음. key:원하는 이름
    console.log(name) //박태규
    console.log(age)  //25
    console.log(job) //s/w
}
display(info)
const {name,age,major} = info
console.log(name) //박태규
console.log(age)  //25
console.log(major) //s/w
```


함수 매개변수로 전달된 객체에서 필드 해제하기


```js
function userId({id}){
    return id
}

function whois({displayName,fullName:{firstName:f,lastName:l}}){ //중첩객체 해제 가능
    console.log(displayName) //박태규
    console.log('성: '+f+' 이름: '+l) //성: 박 이름: 태규
}

const user = {
    id:'1234',
    displayName:'박태규',
    fullName:{
        firstName:'박',
        lastName:'태규'
    }
}

console.log(userId(user)) ///1234
whois(user) 

```
# built in Object (내장객체) 

자바스크립트 언어에는 다양한 내장 객체들이 존재한다. (한번 알아보자!) 

## 래퍼객체 (Wrapper Object)

Wrapper Object(레퍼 객체)는 primitive(원시 값) 을 필요에 따라 관련된 built in Object(내장 객체)로 변환한다. 

래퍼 객체의 정의다 이게 무엇인지 살펴보자!

Wrapper Object --> [[primitive 타입] 다양한 메소드] (이게 래퍼 객체라 생각하면 이해가 쉬움)

일단 래퍼 객체는 쉽게 말하면 아래 str 값 앞에 .을 찍으면 (length와 같은) 다양한 메소드들이 보여진다. 이것을 레퍼 객체라 한다. 

```js
const str = "123";   // string 원시타입 
str.length --> Object
const len = str.length; // String 객체 (래퍼 객체)
len --> string 
``` 

위 코드를 보면 string타입을 생성한 후 ```str.length```를 사용하면 String객체로 바뀐다. 그후 len에 3이 저장되면서 원시타입으로 다시 바뀐다.

```js
const num1 = 123.123; //number 원시 타입
const num2 = new Number(123.123); //Number객체

output
123.123
[Number: 123.123]

//반올림
console.log(num3.toFixed());
//원하는 자리수까지 반올림
console.log(num3.toPrecision(5));
```
number도 똑같이 래퍼객처로 쓰일수 있다. (다양한 메소드들이 있음) 

우리는 위 코드를 통해 원시 타입을 생성하면 내가 원할때 래퍼 객체에 있는 메소드들을 사용할 수 있구나 라는걸 알았다. 

그럼 애초에 원시 타입을 생성하지 않고 Number, String 객체로 바로 생성하면 효율적이지 않은가 생각할 수 있다. 
그렇게 하지 않는 이유는 래퍼 객체에는 다양한 함수가 있기 때문에 생성할 때 메모리가 낭비될수 있다. 그래서 원시 타입을 생성 후 원할 때만 래퍼 객체에 있는 메소드들을 사용하는 거다. 

## 다양한 함수 속성

```js
//eval 자바스크립트를 한줄씩 표현
eval('const num = 2; console.log(num)');

//주소를 URI로 인코딩
const URL="https://박태규.com";
const encode = encodeURI(URL);
console.log(encode); //https://%EB%B0%95%ED%83%9C%EA%B7%9C.com

//디코딩
const decode= decodeURI(encode);
console.log(decode); //https://박태규.com

//전체 URL이 아닌 부분적인 것은 compoment이용
const part = '벅태규.com';
console.log(encodeURIComponent(part));
```

## 숫자 관련 함수

0.1+0.2-0.2 을 더하면 우리는 0.1이 나온다 생각하지만 
프로그램을 실행해보면 0.1000000000000000003 이 나온다. 그 이유는 프로그램 내부를 살펴봐야하기 때문에 나중에 자세히 다루겠다. 

그러면 우리는 0.1+0.2-0.2 === 0.1 이 true가 나올수 있도록 해보자 

```js
//자바스크립트에서 계산할 때 미묘한 차이가 발생함 부동소수점 계산 안됨 
const num = 0.1+0.2-0.2; //기대값 0.1 
console.log(num);  //0.10000000000000003

function isEqual(origianl,expected){
    return origianl===expected;
}
console.log(isEqual(1,1));  //true
console.log(isEqual(num,0.1));  //false

function isEqual(origianl,expected){
    return Math.abs(origianl-expected)<Number.EPSILON;
}
console.log(isEqual(1,1)); //true
console.log(isEqual(num,0.1)); //true
```
EPSILON 0과1사이에서 나타낼 수 있는 가장 작은 숫자를 나타내는 함수다. 

위 처럼 num과 기대값인 0.1을 뺀게 가장 작은 숫자보다 작으면 true가 나오게 하면된다. 



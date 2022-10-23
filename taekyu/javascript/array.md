# 배열 생성

## 배열 만들기

```js
//생성자
array= new Array(1,2,4);
console.log(array);
[ 1, 2, 4 ]
//static 함수
array = Array.of(1,2,4);
console.log(array);
[ 1, 2, 4 ]
//배열리터럴
array = [1,2,4];
console.log(array);
[ 1, 2, 4 ]
//기존의 배열로부터 새배열을 만듬, iterable전달받음
array = Array.from(array);
console.log(array);
[ 1, 2, 4 ]
//문자열 순회 가능
array = Array.from("hello");
console.log(array);
[ 'h', 'e', 'l', 'l', 'o' ]
//오브젝트 형태의 배열
array = Array.from({
    0:'박',
    1:'태',
    2:'규',
    length:3,
})
console.log(array);
[ '박', '태', '규' ]

//배열 초기화
//Array(3)으로 길이 3의 배열을 생성 순회 할때 마다 Array(2)의 null값을 채워진 배열을 저장함 
let arr = Array.from(Array(3), () => Array(2).fill(null))
console.log(arr)
[
  [null, null],
  [null, null],
  [null, null],
]
```
more

1.배열은 동일한 메모리 크기를 가지며, 연속적으로 이어져 있어야함

2.자바스크립트의 배열은 연속적으로 이어져 있지 않고 오브젝트와 유사하다. 

3.자바스크립트의 배열은 일반적인 배열의 동작을 흉내낸 특수한 객체이다.

4.이걸 보완하기 위해서 타입이 정해져 있는 타입 배열이 있다. 
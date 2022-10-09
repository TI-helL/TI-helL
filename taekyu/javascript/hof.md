# 배열 활용 (고차함수)

고참함수를 활용해서 배열을 활용해보자 

## forEach

순회

```js
const arr = ["박","태","규","안","녕"];

//forEach 기본 
arr.forEach(function(value,index,array){
    console.log(value); //박 태 ... 녕
    console.log(index); //0 1 2 ... 4
    console.log(array); //[ '박', '태', '규', '안', '녕' ]
})

//축약
arr.forEach((value)=>console.log(value))

output:
박
태
규
안
녕
```

## find, findIndex 

배열안에 아이템,인덱스 찾기

```js
const cat = {name:'cat', kg:2};
const dog = {name:'dog', kg:4};
const tiger = {name:'tiger', kg:6};

const animal = [cat,dog,tiger,dog];

//배열안에 아이템 찾기 
let found = animal.find((value)=>value.name==='dog');
console.log(found);

//제일 먼저 조건에 맞는 인덱스 반환 
found = animal.findIndex((value)=>value.name==='dog');
console.log(found);

output:
{ name: 'dog', kg: 4 }
1
```

## some, every

배열 조건 확인 return 값은 boolean 

```js
//배열의 아이템들이 부분적으로 조건에 맞는지 확인
found = animal.some((item)=>item.name==='dog');
console.log(found);
//배열의 아이템들이 전부으로 조건에 맞는지 확인
found = animal.every((item)=>item.name==='dog');
console.log(found);


output:
true
false
```

## filter

filter는 조건에 맞는 모든 아이템을 새로운 배열로 만듬

```js
//조건에 맞는 모든 아이템을 새로운 배열로 
//필터링해서 새 배열로 만듬
found = animal.filter((item)=>item.name==='dog');
console.log(found);

output:
[ { name: 'dog', kg: 4 }, { name: 'dog', kg: 4 } ]
```

## map, flatMap

map 은 배열의 아이템들을 각각 다른 아이템들로 매핑할 수 있다. 새로운 배열을 생성함.

```js
const num = [1,2,3,4,5];

result = num.map((item) => item*2);
console.log(result);
result=num.map((item)=>{
    if(item % 2==0){
        return item*2;
    }
    else{
        return item;
    }
})
console.log(result);

//flatMap

result = num.map((item)=>[1,2]);
console.log(result);
result = num.flatMap((item)=>[1,2]);
console.log(result);

result = ['hello','world'].map((text)=>text.split(''));
console.log(result);

result = ['hello','world'].flatMap((text)=>text.split(''));
console.log(result);


output:
[ 2, 4, 6, 8, 10 ]
[ 1, 4, 3, 8, 5 ]
[ [ 1, 2 ], [ 1, 2 ], [ 1, 2 ], [ 1, 2 ], [ 1, 2 ] ]
[
  1, 2, 1, 2, 1,
  2, 1, 2, 1, 2
]
[ [ 'h', 'e', 'l', 'l', 'o' ], [ 'w', 'o', 'r', 'l', 'd' ] ]
[
  'h', 'e', 'l', 'l',
  'o', 'w', 'o', 'r',
  'l', 'd'
]
```

## sort, reduce

sort는 배열의 아이템들을 정렬, 오름차순으로 정렬하고 기존 배열을 변경함 

reduce는 배열의 요소들을 순회하여 하나의 값으로 만든다. (initial Value) 사용 

```js
const number = [2,0,3,10,1,8];
number.sort((a,b)=>a-b);
console.log(number);

// 배열.reduce((sum,num)=>(조건 작성), 초기값(sum) initial value)
//배열의 요소가 value로 전달됨 
result = [1,2,3,4,5].reduce((sum,value)=>sum+=value,0);
console.log(result);

output:
[ 0, 1, 2, 3, 8, 10 ]
15
```

## 활용해보기

5이상(보다 큰)의 숫자들의 평균

```js
const nums = [3, 16, 5, 25, 4, 34, 21];
const result2 = nums.filter((item)=> item > 5).reduce((avg,value,_,array) => avg+=value/array.length,0)
console.log(result2); 

output:
24
```


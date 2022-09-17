# 제너레이터 (Generator)

Generator.prototype.next() yield 표현식을 통해 yield된 값을 반환

Generator.prototype.return() 주어진 값을 반환하고 제너레이터를 종료

```js
//제너레이터는 funtion앞에 *을 붙이면 됨 
function* multipleGenerator(){
    for(let i=0; i<10; i++){
        console.log(i)
        yield i**2
    }
}
//multipleGenerator 호출해도 yield때문에 실행되지 않고 기다린다. 
//next를 호출해야지 실행됨
const multiple = multipleGenerator();
let next = multiple.next()
console.log(next);
next = multiple.next()
console.log(next);

multiple.return()// 종료됨
output:
0 //yield  
{ value: 0, done: false } 
1 //yield
{ value: 1, done: false }
```
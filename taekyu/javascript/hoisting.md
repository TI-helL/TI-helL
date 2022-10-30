# 호이스팅

자바스크립트 엔진이 코드를 실하기전 번수,함수,클래스의 선언문을 끌어 올리는 것을 말한다.(메모리 공간을 선언전 미리 할당함)

예시

```jsx
print()

function print() {
  console.log("hello")
}
```

print() 함수가 호이스팅이 되어있기 때문에 print함수가 실행됨

자바스크립트에서 let,const, 클래스는 선언만 호이스팅이 되고 초기화는 안된다.

```jsx
console.log(hi)
let hi = "hi"

//ReferenceError: Cannot access 'hi' before initialization
```

```jsx
const Dog = new dog()
class dog {}
//ReferenceError: Cannot access 'dog' before initialization
```

위 코드 모두 초기화가 안되어 있기 때문에 오류가 나옴
변수는 호이스팅이 가능하지만 초기화는 안된다는 것을 보여줌

블록 내부도 똑같다

```jsx
let x = 1
{
  console.log(x)
  let x = 5 //초기화 되있지 않고 호이스팅이 되어 오류
}
```

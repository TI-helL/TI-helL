# useRef 사용법 정리

## useRef 특징
- 값이 바뀌어도 컴포넌트가 리랜더링 되지 않는다.

- setTimeout, setInterval의 id나 외부 라이브러리의 인스턴스등을 참조 가능하다

- react-dom 에서 구현한 함수

- IIFE로 실행되는 react-dom 내부의 전역변수에 접근가능해짐 

- currentlyRenderingFiber$1 이란 FiberNode가 중요한데 compnent의 mount 때 &.memoizedState에 초기값을 저장하였다가 update때도 이 값을 참조하는 식으로 라이프사이클 간 리랜더링 하지 않고 값을 유지한다.
<br><br>

RseRef를 하게되면 {current:param}으로 초기화된 순수 자바스크립트 객체를 리턴한다.

자바스크립트의 스택영역 (single Thread call stack) 함수가 실행될 때 메모리를 할당했다가 해제하고, 힙 영역은 전역변수와 참조타입 변수를 할당하고 가지비 컬렉터에서 메모리를 해제한다. 즉 우리가 js 객체로 만드는 모든 변수는 heap에 할당이 되는것이다.

그래서

1. useRef()는 일반 자바스크립트 객체이기에 heap 영역에 저장된다.

2. app 종료나 참조 종료될 때 까지 같은 메모리 값을 가진다.

3. 값이 변경되어도 리랜더링 되지 않는다

메모리 주소가 변하지 않는다는 것은 ===연산에서 항상 true를 반환한다는 뜻인데 이러면 변경사항을 감지하지 못해 리렌더링을 하지 않는다.

실제 useRef는 아래와 같이 구현된다.

```javascript
function useRef(initialValue){
    var dispatcher = resolveDispatcher();
    returnb dispatcher.useRef(initialValue)
}
```

resolveDIspatcher의 useRef값을 리턴하고

```javascript
function resolveDispatcher(){
    var dispatcher = ReactCurrentDispatcher.current;

    if(!(dispatcher !== null)){
        {
            throw Error()
        }
    }

    return dispatcher
}
```

resolveDispatcher는 ReactCurrentDispatcher로 만들며

```javascript
var ReactCurrentDispatcher = {
    @type {ReactComponent}

    current:null
}
```
```javascript
var ReactSharedInternals$2 = {
    ReactCurrentDispatcher: ReactCurrentDisopatcher,
    ReactCurrentOwner: ReactCurrentOwner,
    IsSomeRendererActing: IsSomeRendererActing,
    assign: objectAssign
}
```
ReactCurrentDispatcher는 {current:null} 이라는 자바스크립트의 plain 객체이다.

이 객체는 ReactSharedInternals$2에 저장되어 사용된다.
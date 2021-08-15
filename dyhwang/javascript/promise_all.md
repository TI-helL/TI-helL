# promise all
Promise로 선언된 비동기 작업은 보통 micro 테스크 큐에 큐잉되어서 비동기 처리된다. 이 비동기문을 호출부와 동기시키고 싶으면 await을 사용해야하는데 promise 배열의 경우 await을 일괄적용하기 어렵기 때문에 promise.all(array)를 사용하여 await을 적용해 주면 된다.
```typescript
await promise.all(map(promise반환 비동기함수));
```
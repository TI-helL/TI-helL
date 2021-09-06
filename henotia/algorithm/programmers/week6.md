# Problem

[복서 정렬하기](https://programmers.co.kr/learn/courses/30/lessons/85002?language=javascript)

## Solve

### 다중 정렬 문제

정렬을 위한 Object를 만들고 다중 정렬을 직접 구현하면 끝

1. 정렬을 위해 데이터 가공
```js
// 정렬을 위한 score object를 만들어 전역에 저장
const scores = [];

head2head.forEach((boxer, idx) => {
  const score = {
    idx: idx + 1,
    weight: weights[idx],
    win: 0,
    winHeavy: 0
  };

  let fightCount = 0;
  boxer.split('').forEach((v, i) => {
    score.win += v === 'W' ? 1 : 0;
    fightCount += v === 'W' || v === 'L' ? 1 : 0;
    score.winHeavy += v === 'W' && weights[idx] < weights[i]
  })

  score.winRate = (score.win / fightCount);

  scores.push(score);
});
```

2. 가공된 데이터로 다중 정렬 구현
```js
scores.sort((a, b) => {
  // 승률
  if (a.winRate < b.winRate) return 1;
  if (a.winRate > b.winRate) return -1;

  // winHeavy
  if (a.winHeavy < b.winHeavy) return 1;
  if (a.winHeavy > b.winHeavy) return -1;

  // weight
  if (a.weight < b.weight) return 1;
  if (a.weight > b.weight) return -1;

  // index
  if (a.idx < b.idx) return -1;
  if (a.idx > b.idx) return 1;

  return 0;
})
```

```js
// OR 연산자를 이용해 줄일 수 있다.
scores.sort((a, b) => {
  return b.winRate - a.winRate
    || b.winHeavy - a.winHeavy
    || b.weight - a.weight
    || a.idx - b.idx;
})
```


## Javascript Sort

### Default

`Array.prototype.sort()` 를 기본으로 사용  
`sort()` 디폴트는 `Array`의 원소를 문자열로 변경후 `UTF-16` 에 따라 정렬  
때문에 숫자 정렬에 적합하지 않음  

```js
// 숫자 배열
const numbers = [1, 3, 2, 4, 100];

// Sort!
numbers.sort(); 

// expect: [1, 2, 3, 4, 100]
// result: [1, 100, 2, 3, 4]
```

### Compare Function

`Array.prototype.sort()`는 파라미터로 Compare Function을 받을 수 있다.
`Compare Function`은 `sort()`의 callback 함수로 `firstEl`과 `secondEl` 을 매개변수로 받는다.`

```js
const numbers = [1, 3, 2, 4, 100];

numbers.sort((firstEl, secondEl) => {});
```

매개변수로 받는 `firstEl`과 `secondEl`의 경우 배열의 다음값과 현재값이 들어온다..  
그래서 a, b 정도로 쓰는것보다 이해하기 쉽게 `sort((next, prev) => {})` 로 네이밍 하자


`Compare Function`은 `Return Value`에 따라 `sort()`의 결과를 다르게 처리한다.

* 0 보다 작은 경우
  * `[firstEl, secondEl]` 를 반환
* 0 인 경우
  * `[firstEl, secondEl]` 를 반환 (변경 없음)
* 0 보다 큰 경우
  * `[secondEl, firstEl]` 를 반환


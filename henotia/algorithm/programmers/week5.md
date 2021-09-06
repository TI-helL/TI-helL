# Problem

[모음사전](https://programmers.co.kr/learn/courses/30/lessons/84512?language=javascript)

## Solve

완전 탐색을 해도 `O(5^5)` 라서 무식하게 풀었다..

복습도 할 겸 기존에 만들어뒀던 중복 순열 코드를 이용해 구했다.

```js
const 중복순열 = (arr, selectedCount) => {
  const result = [];
  if (selectedCount === 1) return arr.map(v => [v]);

  arr.forEach((curr, idx) => {
    // 나머지 배열
    const restArr = [...arr];
    // 나머지 배열 순회
    const cArr = 중복순열(restArr, selectedCount - 1);
    // 현재 값과 결합
    const combine = cArr.map(pa => [curr, ...pa]);
    result.push(...combine);
  });

  return result;
}
```

### Other

다른 사람의 코드를 보니 완전탐색을 Set을 이용해서 구현한게 있더라.

```js
const items = ['A', 'E', 'I', 'O', 'U', ''];

const f = (item) => items.map(b => b + a);

Array.from(new Set(
  items.map(f).flat()
  .map(f).flat()
  // n회 반복
));
```

## Solve 2

수학적 접근

첫번째 글자가 'A' 인 경우의 수는 총 781개이다.  
`(5^1 + 5^2 + 5^3 + 5^4 + 5^5) / 5 = 781개`

이를 이용해서 각 자릿수 이후 글자의 갯수를 알 수 있다.

`(5^1 + 5^2 + 5^3 + 5^4 + 5^5) / 5 = 781개`  
`(5^1 + 5^2 + 5^3 + 5^4) / 5 = 156개`  
`(5^1 + 5^2 + 5^3) / 5 = 31개`  
`(5^1 + 5^2) / 5 = 6개`  
`(5^1) / 5 = 1개`  


그러면 현재 입력받은 문자부터 다음 문자까지의 갯수를 확인 할 수 있다.

<br>

`AEIOU`의 경우는 다음과 같다.

1. 첫번째 자리 `A`
   * `781 * 0 + 1 = 1`
   * `A` 다음 오는 문자가 없을경우 `A` 하나, 다음 오는 문자가 있다면 `A`를 더해야 하므로 +1
2. 두번째 자리 `E` 
   * `156 * 1 + 1 = 157`
   * `E` 다음 오는 문자가 없을경우 `E` 하나, 다음 오는 문자가 있다면 `E`를 더해야 하므로 +1
3. 세번째 자리 `I`
  * `31 * 2 + 1 = 63`
  * `I` 다음 오는 문자가 없을경우 `I` 하나, 다음 오는 문자가 있다면 `I`를 더해야 하므로 +1
4. 네번째 자리 `O`
  * `6 * 3 + 1 = 19`
  * `O` 다음 오는 문자가 없을경우 `O` 하나, 다음 오는 문자가 있다면 `O`를 더해야 하므로 +1
5. 다섯번째 자리 `U`
  * `1 * 4 + 1 = 5`
  * `U` 다음 오는 문자가 없을경우 `U` 하나, 다음 오는 문자가 있다면 `U`를 더해야 하므로 +1

매번 `* n`을 해주는 이유는 해당 알파벳이 시작하는 Index 값이기 때문.


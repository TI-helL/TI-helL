// https://programmers.co.kr/learn/courses/30/lessons/84512?language=javascript

// region solution 1
const dp = (arr, selectedCount) => {
  const result = [];
  if (selectedCount === 1) return arr.map(v => [v]);

  arr.forEach((curr, idx) => {
    // 나머지 배열
    const restArr = [...arr];
    // 나머지 배열 순회
    const cArr = dp(restArr, selectedCount - 1);
    // 현재 값과 결합
    const combine = cArr.map(pa => [curr, ...pa]);
    result.push(...combine);
  });

  return result;
}

function solution1(word) {
  let answer = []

  answer.push(...dp(['A', 'E', 'I', 'O', 'U'], 1))
  answer.push(...dp(['A', 'E', 'I', 'O', 'U'], 2))
  answer.push(...dp(['A', 'E', 'I', 'O', 'U'], 3))
  answer.push(...dp(['A', 'E', 'I', 'O', 'U'], 4))
  answer.push(...dp(['A', 'E', 'I', 'O', 'U'], 5))

  answer = answer.map(v => v.join(''));

  answer.sort();

  return answer.indexOf(word);
}

// endregion

// region solution 2
const VOWELS = ['A', 'E', 'I', 'O', 'U', '']

const f = (a) => VOWELS.map(b => b + a)

function solution2(word) {
  return Array.from(
    new Set(VOWELS
    .map(f).flat()
    .map(f).flat()
    .map(f).flat()
    .map(f).flat())
  ).sort().indexOf(word)
}

// endregion


// region solution 3

function solution3(word) {
  const items = ['A', 'E', 'I', 'O', 'U'];
  const pivot = [781, 156, 31, 6, 1];

  return word.split('').reduce((acc, char, i) => {
    const idx = items.indexOf(char);
    const count = pivot[i] * idx + 1;

    console.log('=', count);

    return acc + count;
  }, 0)

}

solution3('AEIOU')


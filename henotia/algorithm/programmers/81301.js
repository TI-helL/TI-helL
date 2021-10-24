// https://programmers.co.kr/learn/courses/30/lessons/81301?language=javascript

function solution(s) {
  const code = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  return s.replace(new RegExp(code.join('|'), 'g'), (str) => code.indexOf(str));
}

solution('one4seveneight')

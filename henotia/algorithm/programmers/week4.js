// https://programmers.co.kr/learn/courses/30/lessons/84325?language=javascript

function solution(table, lang, pref) {
  const T = ['SI', 'CONTENTS', 'HARDWARE', 'PORTAL', 'GAME'];

  const points = table.map(c => lang.reduce((p, l, i) => p += c.split(' ').indexOf(l) > 0 ? (6 - c.split(' ').indexOf(l)) * pref[i] : 0, 0));

  const M = Math.max(...points);

  return points.map((p, i) => p === M ? T[i] : '').filter(v => v).sort()[0];
}

const TABLE = [
  'SI JAVA JAVASCRIPT SQL PYTHON C#',
  'CONTENTS JAVASCRIPT JAVA PYTHON SQL C++',
  'HARDWARE C C++ PYTHON JAVA JAVASCRIPT',
  'PORTAL JAVA JAVASCRIPT PYTHON KOTLIN PHP',
  'GAME C++ C# JAVASCRIPT C JAVA'
];

solution(TABLE, ['PYTHON', 'C++', 'SQL'], [7, 5, 5]);
solution(TABLE, ['JAVA', 'JAVASCRIPT'], [7, 5]);



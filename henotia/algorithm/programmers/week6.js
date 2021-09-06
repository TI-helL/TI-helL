// https://programmers.co.kr/learn/courses/30/lessons/85002?language=javascript

function solution(weights = [], head2head = ['',]) {
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

  scores.sort((a, b) => {
    return b.winRate - a.winRate
      || b.winHeavy - a.winHeavy
      || b.weight - a.weight
      || a.idx - b.idx;
  })

  console.log(scores.map(v => v.idx));

  return scores.map(v => v.idx);
}

solution([50, 82, 75, 120], ['NLWL', 'WNLL', 'LWNW', 'WWLN'])
solution([145, 92, 86], ['NLW', 'WNL', 'LWN'])
solution([60, 70, 60, 100, 50], ['NWWLL', 'LNWNN', 'LLNNN', 'WNNNN', 'WNNNN'])

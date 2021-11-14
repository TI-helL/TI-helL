# dataframe rank
## rank
주어진 조건을 토대로 데이터들의 순위를 측정하는 함수
- ascending : False면 숫자가 큰 것이 순위가 높음
- axis : 0이면 열, 1이면 행방향으로 순위 측정
- method : 동점처리
- pct: True면 상위 몇%인지 출력

### method
데이터 수치가 동점일 때 순위 측정 방법
- average
- first
- max
- min
- dence : 1위가 3명인 경우 모두 1등, 그다음 부터 4등
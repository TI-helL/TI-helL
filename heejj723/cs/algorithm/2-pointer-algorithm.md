# 2-pointer-algorithm.md

## 투 포인터 알고리즘

1차원 배열이 있고 이 배열에서 각자 다른 원소를 가리키고 있는 2개의 포인터를 조작해가면서 원하는 것을 얻는 형태이다.
이 때문에 투 포인터 알고리즘이라고 부른다.

주로 1차원 배열에서 특정 조건을 만족하는 부분 배열을 구할 때, 시간 복잡도를 줄이기 위해 활용 한다.
모든 부분 배열을 탐색하는 과정에서 반드시 연산이 겹치는 부분이 많다.

(s, e) 라는 부분 집합이 있다고 할 때
s 와 e 를 증가시켜 가면서 (s, e) 부분 집합이 특정 조건을 만족 하는지 확인하는 것이다. 


항상 `start <= end` 를 만족해야 한다.

s, e 를 어떻게 조작하느냐는 문제마다 다름 


## [참고](https://m.blog.naver.com/kks227/220795165570)

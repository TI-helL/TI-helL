# 최단 경로 알고리즘

> 최단 경로 알고리즘이란, 주어진 그래프에서 두 정점을 연결하는 가장 짧은 경로를 찾겠다는 것이다.

## 대표적인 회단 경로 알고리즘

- 다익스트라 (이번 글)
- 벨만-포드
- 플루이드-와샬

### 다익스트라 알고리즘
***
다익스트라 알고리즘은 a 와 c 사이에 b 를 거쳐서 가는 더 빠른 길이 있다면 대체하겠다는 뜻이다.

수식으로 표현하면
```
IF distance[a][c] > distance[a][b] + distance[b][c]
THEN distance[a][c] = distance[a][b] + distance[b][c]
```

***시간 복잡도***

 O(V^2)의 시간복잡도를 가지지만 우선 순위 큐를 이용하면 O(ElogV)에 해결할 수 있다.

> O(E+ElgV)=O(ElgV)

O(nlogn) 이면 상당히 괜찮다.
간선이 E개 있다고 할 때,

- O(E) : 모든 간선을 검사하는데 드는 시간
- O(ElogV) : (우선순위 큐(heap구조)에 원소를 추가, 삭제 할 때 드는 시간)O(logV) X (모든 간선)O(E)

___
**푸는 방법은 두가지가 있다.**
1. 집합으로 푸는 방식
2. 우선순위 큐로 푸는 방식
___

### 1. 집합으로 푸는 방식

사실 집합으로 푸는 방식은 위의 수식만 기억하면 된다.
2차원 배열을 선언해서 풀면 된다. </br>

<img width="391" alt="스크린샷 2021-09-13 오후 9 09 11" src="https://user-images.githubusercontent.com/45758481/133080913-9d9eb016-ac61-43a0-8e50-8bac0c7886ed.png">

이런 그래프가 있다고 해보자.

노드 시작점은 5이다.

맨 처음에 5 빼고 연결되지 않은 노드는 모두 무한의 거리를 가진다.

|5|4|3|2|1|
|------|---|---|---|---|
|0|INF|INF|INF|INF|

___

이제 start=5 에서 인접한 간선을 확인한다. 
근데 2, 4로 연결 된 간선이 있으므로 최단 거리를 표시하면

|5|4|3|2|1|
|------|---|---|---|---|
|0|INF|INF|INF|INF|
|0|**2**|INF|4|INF|

이 중 가장 짧은 간선의 인접 노드로 이동한다.
**여기서 중요한건, 이제 5->4 의 최단거리는 확정이라는 것**

___
이제 현재 정점은 4이다.
이제 4의 정점과 인접한 2, 3 노드로의 최단 거리를 표시한다.
정점 3으로의 최단 거리는,
```
distance[5][3] = MIN(distance[5][4] + distance[4][3], distance[5][3])
```

이걸 말로 표현하면, 현재 3으로의 최단 거리는 INF 이고, 5->4->3 으로 가는 최단거리는 2+1=3 이므로, 3으로 업데이트한다.

정점 2로의 최단거리는,
```
distance[5][2] = MIN(distance[5][4] + distance[4][2], distance[5][2])
```
이다.
distance[5][2] = MIN(2+1, 4) = 3, 3으로 업데이트 한다.

|5|4|3|2|1|
|------|---|---|---|---|
|0|INF|INF|INF|INF|
| |**2**|INF|4|INF|
| ||3|3||

...
중간 과정은 생략한다.
***


### 2. 우선순위 큐로 푸는 방식

위에서 힘들게 했던 방식을 큐로 풀면 더 깔끔해진다.
짧은 가중치의 간선 순서대로 방문하기 때문에 최소 경로를 가진 정점(노드) 가 나오도록 최소 힙으로 구현하면 되기 때문이다.

다시 한번 그래프를 보면 이렇게 생겼다.

<img width="363" alt="스크린샷 2021-09-13 오후 9 32 20" src="https://user-images.githubusercontent.com/45758481/133084077-ab44617a-eba9-4239-a06c-440dd7d6a97b.png">

___

(힘들어ㅓㅅ 내일 쓰겠음)


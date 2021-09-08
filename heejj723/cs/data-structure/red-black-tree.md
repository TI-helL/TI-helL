# red-black-tree.md

binary tree 에서, 저장과 검색은 평균 O(logn) 시간이 소요 된다.
Binary Search Tree 는 자신의 왼쪽 서브 트리는 현재 key 값이 작은 것, 오른쪽 서브 트리에는 key 값이 큰 것들이 오게 된다.
그런데 트리에 노드가 들어오는 순서에 따라, 트리의 균형이 맞을 수도, 깨질 수도 있다.

예를 들어 
1. 40 -> 20 -> 30 -> 60 -> 50 -> 80 순서대로 들어오는 경우,

![스크린샷 2021-09-08 오후 1 34 02](https://user-images.githubusercontent.com/45758481/132447055-27a6a9a1-e39a-4a58-aa19-f0bd6191c3ce.png)

이런 모양이 될 수 있지만, 순서가 오름 차순으로 들어오는 경우 균형이 깨져

![스크린샷 2021-09-08 오후 1 34 42](https://user-images.githubusercontent.com/45758481/132447106-8b93963d-65ac-4a33-a4b6-eb38eb1258ea.png)

이런 모양이 될 수도 있다. 이러한 비효율성 때문에 레드 블랙 트리가 고안 되었다.

레드 블랙 트리는 바이너리 트리이지만, 그 모양이 균형 잡힐 수 있도록 조건을 걸어두었다. (Blanced Search Tree)
---
</br> </br>

## 레드 블랙 트리 조건
1. 루트는 블랙이다
2. 모든 리프도 블랙이다
3. 노드가 레드이면 그 노드의 자식은 무조건 블랙이다
4. 루트노드에서 임의의 리프 노드에 이르는 경로에서 만나는 블랙 노드의 수는 같다 </br>
이 때 리프 노드는, 모든 NIL 리프 노드를 의미 한다.
5. 레드 노드는 두 개가 연속해서 등장할 수 없다.

위 조건을 위배하는 경우 문제 상황을 해결하는 식으로 구현한다. 

---

## 삽입
- 신규 생성 노드는 레드이다 (루트 노드 빼고) <- Z라고 칭함
- 삽입 할 때 케이스는 크게 4가지
1. Z = root
2. Z.Parent = RED, Z.Uncle = RED -> 색상 변환
3. Z.Parent = RED, Z.Uncle = BLACK -> 회전
- triangle form -> rotate Z.parent
- line form -> rotate Z.grandParent & recolor


### Case1. Z = root
- Z를 BLACK 으로 칠한다.

### Case2. Z.Uncle = RED

![스크린샷 2021-09-08 오후 2 21 13](https://user-images.githubusercontent.com/45758481/132450992-cb154110-b3fb-4634-9e35-77ca2cf8e072.png)

- 부모와 Uncle 을 BLACK 으로 칠한다.
- 위 그림의 트리는 SubTree 임

### Case3-1. Z.uncle = BLACK (triangle)
![스크린샷 2021-09-08 오후 2 22 44](https://user-images.githubusercontent.com/45758481/132451116-f6bf0663-6356-4e59-a243-a319f93dd35d.png)
- Z의 parent 를 회전시킨다.
- Z가 왼쪽 노드면 오른쪽으로, Z가 오른쪽 노드면 왼쪽으로 회전

![스크린샷 2021-09-08 오후 2 24 20](https://user-images.githubusercontent.com/45758481/132451262-77c38640-2ab4-4efb-a191-73d14b7d1065.png)

### Case3-2. Z.uncle = BLACK (line)
![스크린샷 2021-09-08 오후 2 24 55](https://user-images.githubusercontent.com/45758481/132451308-afc206dd-3533-439a-b007-c293de43278f.png)
 - Z의 GrandParent 를 회전시킨다.

![스크린샷 2021-09-08 오후 2 25 34](https://user-images.githubusercontent.com/45758481/132451375-364b4e17-a970-4f49-9e62-b3d602be3826.png)
![스크린샷 2021-09-08 오후 2 25 46](https://user-images.githubusercontent.com/45758481/132451389-b2f7a98d-459b-46d2-937c-f5b5636eda94.png)

 - 색도 다시 칠한다.
![스크린샷 2021-09-08 오후 2 26 25](https://user-images.githubusercontent.com/45758481/132451453-1063b670-7582-4ee5-8d1c-1231db75b2ac.png)

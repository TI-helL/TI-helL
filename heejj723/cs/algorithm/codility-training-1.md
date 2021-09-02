# codility-training-1
출처: https://app.codility.com/programmers/trainings/1/

### 1. longestPassword
쉬움. 생략
### 2. floodDepth

2포인터 알고리즘으로 풀었는데, 방법만 설명 해 보겠다.
문제를 요약하면, 산 골짜기에 물이 고이게 되는데, 그 최대 깊이를 구하라는 것.
<img width="458" alt="스크린샷 2021-09-02 오후 3 44 12" src="https://user-images.githubusercontent.com/45758481/131795440-7b6e5ca9-89fd-475c-ae4a-68e105853742.png">

1. 주어진 배열 A[]의 길이가 2 이하일 경우

- 애초에 골짜기가 생기지 않기 때문에 최대 깊이는 0이다.

2. 주어진 배열 A[]의 길이가 3 이상일 경우

현재 index 를 i 라고 할 때,
- A[i-1] >= A[i] : 그냥 넘어감
- A[i-1] < A[i] 
  - start 와 end 중에 바위의 높이가 작은 것 까지가 최대 높이이다.
  - 최대 깊이 = (최대 높이) - (start 와 end 사이에서 가장 낮은 높이)
  - answer 와 비교하여 더 큰걸 고른다. 

*** 이 때 새로운 start point 는 start 와 end 중 작은 것이 된다.
만약 매번 시작 지점을 갱신한다면, 현재 end 보다 더 높은 바위가 뒤에 나왔을 경우 이전 바위가 더 크기 때문에 최대 깊이를 구할 수 없다.

예를 들어, 

A[] = [1, 3, 2, 1, 5, 4, 6] 일 때,
i = 4 에서 start 높이가 5가 되어버리면, [5, 4, 6] 사이에서의 최대 높이는 1이 된다.
그러나 실제로는 3과 6 사이의 2 가 더 높은 숫자이다. 


```java
    public int floodDepth (int[] A) {

        int N = A.length;
        if (N <= 2) return 0;

        int s = A[0], e = 0;

        int answer = 0;
        int minHeight = s;

        for (int i = 1; i < N; i++) {
            e = A[i];
            minHeight = Math.min(minHeight, e);
            if (A[i-1] >= e) continue;
            answer = Math.max(answer, Math.min(s, e) - minHeight);
            if (s < e) {
                s = e;
                minHeight = s;
            }
        }
        return answer;
    }

```


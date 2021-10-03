
## Priority Queue

우선순위 큐로 풀었음.
큰 숫자가 앞에 오는 우선순위 큐를 선언하고
하나씩 감소시켜서 다시 뒤로 넣어버렸다.

만약에 가장 큰 숫자가 0이라면 야근을 더 안해도 되므로 for 문 종료.

```java
import java.util.*;
class Solution {
    public long solution(int n, int[] works) {
        long answer = 0;
        
        
        PriorityQueue<Integer> q = new PriorityQueue<>(Collections.reverseOrder());

        for (int work : works) {
            q.add(work);
        }
        
        for (int i = 0; i < n; i++) {
            if (q.peek() <= 0) break;
            int work = q.poll();
            q.add(work-1);
        }
        
        while(!q.isEmpty()) {
            int work = q.poll();
            answer+=(work*work);
        }

        return answer;
    }
}
```


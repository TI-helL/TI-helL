# TDD 로 알고리즘 문제 풀어보기 - 프로그래머스 42626

단기적인 목표로는 Spring Reactive 앱을 TDD 로 구현하는 것이 목표이다. </br>
그런데 TDD 개발 자체가 손에 익지 않아서 처음부터 적용하기에는 무리가 있다. </br>

알고리즘 코딩테스트 문제들은 input 과 output 의 명세가 명확하다. </br>
따라서 tdd 연습에 매우 적합하다고 생각했다. </br>

## 프로그래머스 42626 번 문제

![스크린샷 2021-10-31 오후 5 08 54](https://user-images.githubusercontent.com/45758481/139573995-7406dbb8-7e08-4f23-8a0f-012da27705dc.png)

## 문제 분석

문제의 핵심은 가장 작은 숫자와 두번째로 작은 숫자를 계속 섞다가, 더이상 섞을 수 없는 지점을 정의하는 것이다.

따라서 먼저 함수의 테스트가 필요한 경우의 수를 잘게 쪼개서 리스트업 해보았다.

## 테스트 조건

1. 가장 작은 원소를 똑바로 고르는가
2. 두번째로 작은 원소를 똑바로 고르는가
3. 1, 2의 결과를 섞을 때 올바른 연산을 하는가
4. 한번 섞을 때마다 음식의 개수가 -1 되는가
5. 섞기 전과 섞은 후에 count 지수가 +1 되는가
6. 섞기 연산을 수행할 수 있는 조건은?
7. 모든 스코빌 지수를 K로 만들 수 없는 조건은?

이 중 1, 2는 우선순위 큐를 사용하면 특별한 로직 없이 쉽게 처리 할 수 있다.
따라서 3번부터 테스트 코드를 작성했다.

## 0. SetUp

먼저 자주 사용 될 매개변수들을 정의하는 작업을 해주었다.

### 테스트
```java
  @BeforeEach
  void setUp() {
    moreSpicy = new MoreSpicy();
    q = new PriorityQueue<>();
    q.offer(1);
    q.offer(2);
    q.offer(3);
  }
```

### 코드
```java
@Setter
@Getter
public class MoreSpicy {

  private PriorityQueue<Integer> scoville;
  private Integer count;
  private Integer K;
}
```

## 3. 가장 작은 원소와 두번째로 작은 원소를 연산하는 함수

핵심은 테스트를 먼저 작성 한 후 본 코드를 작성하는 것이다. </br>

### 테스트

```java
  @Test
  void 섞기_연산_테스트() {
    // given
    moreSpicy.setScoville(q);

    // when
    Integer result = moreSpicy.getMixOfFirstMinAndSecondMin();

    // then
    assertThat(result).isEqualTo(5);
    assertThat(moreSpicy.getScoville().size()).isEqualTo(1);
  }

```

테스트에서 연산 결과가 똑바로 나오는지, </br>
또 이전 연산 이후 Queue 에 남은 원소가 연산 전보다 2 작은지를 검사하였다. </br>
이 때 유의할 점은, 아직 연산 결과를 Queue 에 추가하지 않았으므로, 이전보다 2가 작다는 것이다 </br>

### 코드

```java
  public Integer getMixOfFirstMinAndSecondMin() {
    Integer mixed = 0;
    mixed+=scoville.poll();
    mixed+=scoville.poll()*2;
    return mixed;
  }
```

## 5. 섞기 전과 섞은 후에 count 지수가 +1 되는가

테스트에서 연산 결과가 count+1 인지, </br>
또 이전 연산 이후 Queue 에 남은 원소가 연산 전보다 1 작은지를 검사하였다. </br>

### 테스트

```java
  @Test
  void 섞은_후_count_올리기() {
    // given
    moreSpicy.setScoville(q);

    // when
    Integer result = moreSpicy.addCount(0);

    // then
    assertAll(
        () -> assertThat(result).isEqualTo(1),
        () -> assertThat(moreSpicy.getScoville().size()).isEqualTo(2)
    );
  }
```


### 코드

```java
  public Integer addCount(Integer count) {
    scoville.add(getMixOfFirstMinAndSecondMin());
    count++;

    return count;
  }
```

3번과 5번 과정을 하나로 합쳐도 문제를 푸는 데는 아무 지장이 없을 것이다. </br>
실제로 이전에 이 문제를 풀었을 때는 그렇게 했다. </br>
그러나 TDD 의 장점은, 테스트 편한 코드가 나온다는 점이고, 테스트가 편한 코드는 디버깅 하기에도 편하다는 것이다. </br>
자연스럽게 하나의 기능 당 하나의 메소드를 정의하게 된다. </br>

---

## 6. 섞기 연산을 수행할 수 있는 조건은?

자, 이제 모든 섞기 연산을 테스트 하였다. </br>
그러면 이 섞기 연산이 실제로 수행 되는 조건은 무엇인가? </br>

먼저, 남은 음식이 2개 이상이어야 섞을 수 있다. </br>
둘째, 가장 작은 스코빌 지수의 음식이 K 이상일 경우에는 이미 모든 음식의 스코빌 지수가 K라고 말할 수 있다. </br>
따라서 이 경우에는 더이상 섞기 연산을 수행하지 말아야 한다. </br>
'최소' 섞는 횟수를 구하기 때문이다. </br>
PriorityQueue 에서는 가장 앞의 원소가 가장 작은 원소이다. (오름차순일 경우) </br>
따라서 작성할 메소드는 두가지 조건 중 하나라도 만족할 경우 `False` 를 뱉어야 한다. </br>

### 테스트1. 남은 음식의 숫자가 1인 경우

```java
  @Test
  void 조건_테스트_남은_음식_숫자가_1() {
    // given
    q.clear();
    q.offer(1);
    moreSpicy.setScoville(q);

    // then
    assertThat(moreSpicy.checkMixCondition()).isFalse();
  }
```

### 테스트1. 가장 작은 스코빌 지수의 음식이 K 이상인 경우

```java
  @Test
  void 조건_테스트_남은_음식_숫자가_1() {
    // given
    q.clear();
    q.offer(1);
    moreSpicy.setScoville(q);

    // then
    assertThat(moreSpicy.checkMixCondition()).isFalse();
  }
```


### 코드

```java
  public boolean checkMixCondition() {
    return scoville.size() > 1 && scoville.peek() < K;
  }
```

---

## 7. 모든 스코빌 지수를 K 이상으로 할 수 없는 경우는 -1 을 리턴

모든 음식을 다 섞어도 원소를 K 이상으로 할 수 없는 경우도 있을 것이다. </br>
끝까지 섞은 경우 (남은 원소가 1개뿐) 에도 그 지수가 K 이상이 아니라면 -1 을 뱉도록 한다. </br>

### 테스트

```java
  @Test
  void 스코빌_지수를_모두_K_이상으로_할수없을때() {
    // given
    q.clear();
    q.offer(4);
    moreSpicy.setScoville(q);
    moreSpicy.setK(5);

    // then
    assertAll(
        () -> assertThat(moreSpicy.isNotValidCondition()).isTrue()
    );
  }
```


### 코드

```java
  public boolean isNotValidCondition() {
    return scoville.size() == 1 && scoville.peek() < K;
  }
```

---

## solution

모든 테스트를 성공시켰다면, 모든 코드가 올바르게 동작한다고 확신 할 수 있을 것이다.

그러면 이런 코드를 작성할 수 있다.

```java
  public Integer solution() {
    while (checkMixCondition()) {
      count = addCount(count);
      if (isNotValidCondition()) return -1;
    }
    return count;
  }
```

사용되는 모든 메소드가 올바르게 동작하므로, 위 solution 을 통과할 거라는 확신을 할 수 있다.

solutionTest 의 조건은 프로그래머스에서 제공하는 테스트케이스를 이용하였다. 그 결과는

![스크린샷 2021-10-31 오후 5 49 17](https://user-images.githubusercontent.com/45758481/139575054-02414490-9fa8-43d7-961f-228fddd6d592.png)

---

## 결론

위 코드를 작성하는데 약 3시간 정도 걸렸다.

테스트 코드 없이 풀었을 때는 30분 밖에 안걸렸다.

그럼 테스트 코드 작성은 효율성이 너무 떨어져서 실무에 못써먹을까?

나는 이 문제를 이전에 풀이했던 적이 있는데, 그 때 코드와 비교를 해볼 수 있었다.

### 테스트코드 없이 (CPP)

```cpp
int solution(vector<int> scoville, int K) {
    int answer = 0;
    
    priority_queue<int, vector<int>, greater<int> > pq;
    for(auto s : scoville){
        pq.push(s);
    }
    
    int mixed = 0;
    while(pq.top() < K){
        mixed+= pq.top();
        pq.pop();
        mixed+= (pq.top()*2);
        pq.pop();
        pq.push(mixed);
        
        // cout << mixed << endl;
        mixed = 0;
        answer++;
        
        if(pq.size() == 1 && pq.top() < K)  return -1;
        
        // cout << pq.top() << endl;
    }
    return answer;
}
```

### 테스트 코드와 함께

```java

  public Integer solution() {
    while (checkMixCondition()) {
      count = addCount(count);
      if (isNotValidCondition()) return -1;
    }
    return count;
  }

  private Integer addCount(Integer count) {
    scoville.add(getMixOfFirstMinAndSecondMin());
    count++;

    return count;
  }

  private Integer getMixOfFirstMinAndSecondMin() {
    Integer mixed = 0;
    mixed+=scoville.poll();
    mixed+=scoville.poll()*2;
    return mixed;
  }

  private boolean checkMixCondition() {
    return scoville.size() > 1 && scoville.peek() < K;
  }

  private boolean isNotValidCondition() {
    return scoville.size() == 1 && scoville.peek() < K;
  }
```


전자는 CPP 이고 후자는 JAVA 인 것 보다 훨씬 확연한 차이가 보인다. </br>
테스트가 쉬운 코드를 짤 수록
- 하나의 메소드는 하나의 역할만 하고
- 디버깅이 쉬워진다

이런 차이를 눈으로 직접 느낀건 처음이라 아주 의미있는 작업이었다고 생각한다. </br>
실무, 특히 프레임워크 단에서 테스트를 진행하려면 고려해야 할 사항이 많은데,
그 전에 테스트코드의 유용성을 직접 느껴보기에는 알고리즘 문제를 TDD 로 풀어보는 것도 괜찮은 것 같다. 

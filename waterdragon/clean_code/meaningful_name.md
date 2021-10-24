# 의미있는 이름
의도가 분명하게 이름을 지어야 한다.  
변수나 함수 그리고 클래스 이름은 다음의 질문에 모두 답할수 있어야 한다.
- 변수(혹은 함수나 클래스)의 존재 이유는?
- 수행 기능은?
- 사용 방법은?

위 질문에 제대로 답변하지 못하고 추가적으로 주석이 필요하다면 의도를 분명히 드러내지 못했다는 뜻이다.

```java
int d; //경과 시간(단위: 날짜)
```

이름 d는 아무 의미도 드러나지 않는다. 경과 시간이나 날짜라는 느낌이 들지 않는다. 측정하려는 값과 단위를 표현하는 이름이 필요하다. 다음과 같이 수정하면 더 의미있는 변수를 생성할 수 있다.

```java
int elapsedTimeInDays;
int daysSinceCreation;
int daySinceModification;
int fileAgeInDays;
```

의도가 드러나는 이름을 사용하면 코드의 이해와 변경이 쉬워진다. 다음 코드는 무엇을 할까?

```java
public List<int[]> getThem(){
    List<int[]> list1 = new ArrayList<int[]>();
    for(int[] x: theList){
        if(x[0] == 4){
            list1.add(x);
        }
    }
    return list1;
}
```

위와 같은 코드가 하는일을 짐작하기 어렵다. 코드 맥락이 코드 자체에 명시적으로 드러나지 않기 때문이다.

1. theList에 무엇이 들어있는가?
2. theList에서 0번째 값이 왜 중요한가?
3. 값 4는 무슨 의미인가?
4. 함수가 반환하는 list1을 어떻게 사용하는가?

위 코드엔 이와 같은 정보가 드러나지 않는다. 지뢰 찾기 게임을 만든다고 가정할 경우 theList가 게임판이라는 사실을 알수 있고 theList를 gameBoard로 변경한다.  
또한 배열에서 0번째 값은 칸 상태를 4는 깃발이 꽂힌 상태를 가리킨다. 각 개념에 이름을 붙일경우 코드가 상당히 깔끔해진다.

```java
public List<int[]> getFlaggedCells() {
    List<int[]> flaggedCells = new ArrayList<int[]>();
    for(int[] cell : gameBoard){
        if(cell[STATUS_VALUE] == FLAGGED){
            flaggedCells.add(cell);
        }
    }
    return flaggedCells;
}
```

코드가 매우 명확해졌다. 한걸음 더 나아가 int배열을 사용하는 대신 칸을 간단한 클래스로 만들어도 되겠다.

```java
public List<Cell> getFlaggedCells(){
    List<Cell> flaggedCells = new ArrayList<Cell>();
    for(Cell cell : gameBoard){
        if(cell.isFlagged()){
            flaggedCells.add(cell);
        }
    }
    return flaggedCells;
}
```
# 2. Don’t use the else keyword

if-else 구문은 거의 모든 프로그래밍 언에에 포함 된 간단한 조건 논리이다. 리팩토링 시 기존 조건문에 조건을 추가하는 작업은 매우 쉽기 때문에 중첩되는 조건문이나 계속되는 case 문으로 인해 코드가 지저분해질 수 있다.

```java
public static void endMe() {
    if (status == DONE) {
        doSomething();
    } else {
        otherSomething();
    }
}
```

위와 같은 코드의 경우 보호절(guard clause)과 조기 반환(early return) 을 활용 하여 아래와 같이 변경할 수 있다.

```java
public static void endMe() {
    if (status == DONE) {
        doSomething();
        return;
    }
    otherSomething();
}
```

그러나 조기 반환 코드를 너무 많이 사용하면, 오히려 간결함을 저해 하기 쉽다는 점을 주의 해야 한다.

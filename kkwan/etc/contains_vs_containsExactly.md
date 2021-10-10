# `contains()` vs `containsExactly()`

## `contains()`

중복 여부, 순서에 관계 없이 값만 일치하면 테스트를 통과한다.

```java
void containsTest(){
    List<Integer> test = Arrays.asList(1, 2, 3);

    // 특정 값만 존재해도 테스트 통과
    assertThat(test).contains(1);

    // 중복된 값이 존재해도 테스트 통과
    assertThat(test).contains(1, 1);

    // 순서가 달라도 테스트 통과
    assertThat(test).contains(2, 1);

    // 존재하지 않은 값을 입력할 시 테스트 실패
    assertThat(test).contains(1, 2, 3, 4);
}
```

## `containsExactly()`

중복 여부, 순서가 완전히 일치해야 테스트를 통과한다.

```java
void containsExactlyTest(){
    List<Integer> test = Arrays.asList(1, 2, 3);

    // 중복 여부, 순서가 완전히 동일하여 테스트 통과
    assertThat(test).containsExactly(1, 2, 3);

    // 모든 원소가 일치하지 않아서 테스트 실패
    assertThat(test).containsExactly(1);

    // 순서가 일치하지 않아 테스트 실패
    assertThat(test).containsExactly(2, 1, 3);

    // 존재하지 않은 값을 입력할 시 테스트 실패
    assertThat(test).containsExactly(1, 2, 3, 4);
}
```

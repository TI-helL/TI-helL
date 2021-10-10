# `assertAll()` vs Assert Functions

## not using `assertAll()`

다음과 같이 여러 개의 assert 함수들로 테스트 코드를 작성할 시, 특정 assert 함수에서 오류가 발생하면 다음 assert 함수는 실행되지 않는다.

```java
assertNotNull(til); // 오류 발생 시 다음 assertThat을 실행하지 않음
assertThat(til.getStatus()).isEqualTo(TIL.COMPLETE);
```

## using `assertAll()`

다음과 같이 `assertAll()`을 활용하여 테스트 코드를 작성할 시, 특정 assert 함수에서 오류가 발생하더라도, 나머지 assert 함수를 실행할 수 있다.

```java
assertAll(
    () -> assertNotNull(til), // 오류가 발생하여도 다음 assertTaht을 실행함
    () -> assertThat(til.getStatus()).isEqualTo(TIL.COMPLETE)
);
```

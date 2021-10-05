# @DisplayName을 활용한 테스트코드 작성

`@DisplayName` 어노테이션을 사용하여 테스트 클래스와 메서드에 이름을 붙여줄 수 있다.

```java
@DisplayName("테스트코드 대제목")
public class StringTest {

	@Test
	@DisplayName("테스트코드 소제목")
	void testCode() {
		// given
        ...

		// when
        ...

		// then
		...
	}

```

`@Test` 어노테이션의 경우 `@DisplayName` 어노테이션을 활용하여 소제목 지정이 가능하지만, `@ParameterizedTest` 어노테이션의 경우 `@DisplayName` 어노테이션 활용이 불가능하다.

이를 해결하기 위해 다음과 같은 방법을 사용한다.

```java
@ParameterizedTest(name = "{index}: 파라미터 케이스 인덱스, {n}: n번째 매개변수: ")
	@CsvSource(value = {"0:a", "1:b", "2:c"}, delimiter = ':')
	void testCode(...) {
		// given
        ...

		// when
        ...

		// then
		...
	}
```

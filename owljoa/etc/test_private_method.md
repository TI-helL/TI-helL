# private method 테스트하는 방법

- 코드 리뷰하다가 static 클래스 외부에서 사용하지 않는 메소드의 접근 제어자가 public으로 되어 있길래 private으로 고쳐봤더니 테스트 클래스에서 접근이 불가능한 문제가 있었지만 검색해서 찾아낸 방법으로 해결했다 :)

<br>

- [1. 외부 클래스에서 호출이 불가능한 private 메소드](#1-외부-클래스에서-호출이-불가능한-private-메소드)
- [2. 자바 리플렉션(Reflection) API](#2-자바-리플렉션reflection-api)
  - [2.1. 메소드 찾기](#21-메소드-찾기)
  - [2.2. 메소드 접근 허용 설정](#22-메소드-접근-허용-설정)
  - [2.3. 메소드 호출](#23-메소드-호출)
  - [2.4. 전체 테스트 코드](#24-전체-테스트-코드)
- [3. Spring ReflectionTestUtils](#3-spring-reflectiontestutils)

<br><br>

# 1. 외부 클래스에서 호출이 불가능한 private 메소드

- 아래와 같은 static한 로또 번호 생성 클래스를 예로 들어 설명
- generateLotteryNumberSet() 메소드는 public 접근제어자가 붙어있기 때문에 외부 클래스에서 LotSetGenerator.generateLotteryNumberSet() 의 형태로 호출이 가능하지만, generateLotteryNumber() 메소드는 private 접근제어자가 붙어있기 때문에 외부 클래스에서 호출할 수 없다.

```java
package com.owljoa.lottery;

import java.util.HashSet;
import java.util.Set;

public class LotSetGenerator {

  public static Set<Integer> generateLotteryNumberSet() {
    Set<Integer> lotSet = new HashSet<>();

    while (lotSet.size() < 6) {
      lotSet.add(generateLotteryNumber());
    }

    return lotSet;
  }

  private static int generateLotteryNumber() {
    return (int) (Math.random() * 45 + 1);
  }
}
```

<br><br>

# 2. 자바 리플렉션(Reflection) API

- 컴파일러가 외부 클래스에서의 호출을 막고있지만 자바 리플렉션 API를 이용하면, 외부 클래스로부터 private 메소드에 대한 접근이 가능하도록 설정하고 호출할 수 있다.

<br>

## 2.1. 메소드 찾기

- 리플레션을 이용하면 클래스로부터 메소드를 `Method` 타입의 객체 형태로 추출해낼 수 있다.
- class 키워드로 Class 객체를 가져와서 `getDeclaredMethod("메소드 이름", 파라미터 1 타입, 파라미터 2 타입, 파라미터 3 타입, ...)` 메소드를 호출한다.
  - 대상 메소드가 파라미터가 없으면, 메소드 이름만 파라미터로 입력
  - 대상 메소드가 파라미터가 있으면, 메소드 이름과 각 파라미터의 타입 클래스들을 순서대로 입력
  - 이름과 파라미터들로 메소드를 식별하는데, 해당 메소드가 존재하지 않으면 `NoSuchMethodException` 발생

```java
// LotSetGenerator 클래스에서 generateLotteryNumber 메소드 추출
Method generateLotteryNumberMethod = LotSetGenerator.class.getDeclaredMethod(
      "generateLotteryNumber");

// generateLotteryNumber(String nation)처럼 메소드에 파라미터가 있는 경우
Method generateLotteryNumberMethod = LotSetGenerator.class.getDeclaredMethod(
      "generateLotteryNumber", String.class);
```

<br>

## 2.2. 메소드 접근 허용 설정

- 리플레션을 이용해서 추출한 메소드에 대해 접근을 임시로 허용할 수 있다.
- 접근 허용 효과는 JVM이 종료되거나 accesible 프로퍼티가 다시 false로 세팅(`setAccessible(false)`)되기 전까지 유지된다.

```java
// LotSetGenerator 클래스에서 generateLotteryNumber 메소드 추출
Method generateLotteryNumberMethod = LotSetGenerator.class.getDeclaredMethod(
      "generateLotteryNumber");

generateLotteryNumberMethod.setAccessible(true);
```

<br>

## 2.3. 메소드 호출

- 접근을 허용한 메소드 객체의 `invoke(대상 메소를 포함하는 클래스 객체, 파라미터 1, 파라미터 2, 파라미터 3, ...)` 메소드를 호출
- `invoke(...)` 메소드의 반환 타입은 `Object` 이기 때문에 반환된 값을 사용하려면 타입 캐스팅이 필요하다.

```java
int lotteryNumber = (int) generateLotteryNumberMethod.invoke(LotSetGenerator.class);
```

<br>

## 2.4. 전체 테스트 코드

- 앞에서 만든 [LotSetGenerator](#1-외부-클래스에서-호출이-불가능한-private-메소드) 클래스를 테스트 하기 위한 전체 테스트 코드

```java
package com.owljoa.lottery;

import static org.assertj.core.api.Assertions.assertThat;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Set;
import org.junit.jupiter.api.Test;

class LotSetGeneratorTest {

	@Test
	void generateLotteryNumberSetTest() {
	  Set<Integer> lotteryNumberSet = LotSetGenerator.generateLotteryNumberSet();

	  assertThat(lotteryNumberSet.size()).isEqualTo(6);
	}

	@Test
	void generateLotteryNumberTest()
	    throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
	  Method generateLotteryNumberMethod = LotSetGenerator.class.getDeclaredMethod(
	      "generateLotteryNumber");
	  generateLotteryNumberMethod.setAccessible(true);

	  int lotteryNumber = (int) generateLotteryNumberMethod.invoke(LotSetGenerator.class);

	  assertThat(lotteryNumber).isGreaterThanOrEqualTo(1).isLessThanOrEqualTo(45);
	}
}
```

<br><br>

# 3. Spring ReflectionTestUtils

- spring-test 라이브러리에서 private 필드나 메소드에 접근하는 유닛 테스트에 특화된 유틸 객체
  - 참고로 spring-test 라이브러리는 spring-boot-starter-test 의존성에 포함돼있다.
- ReflectionTestUtils을 이용하면 클래스 내부에 접근하는 유닛 테스트를 좀 더 간결하게 작성할 수 있다.
- 예를 들면 위에서 작성한 테스트코드 중 클래스 내부에 접근하는 generateLotteryNumberTest()를 ReflectionTestUtils을 이용해서 작성하면 다음과 같다.

  ```java
  package com.owljoa.lottery;

  ...

  import org.springframework.test.util.ReflectionTestUtils;

  ...

  class LotSetGeneratorTest {

  	...

  	@Test
  	void generateLotteryNumberTest() {

  	  Integer lotteryNumber = ReflectionTestUtils.invokeMethod(LotSetGenerator.class,
  	      "generateLotteryNumber");

  	  assertThat(lotteryNumber).isNotNull();
  	  assertThat(lotteryNumber).isGreaterThanOrEqualTo(1).isLessThanOrEqualTo(45);
  	}

  }
  ```

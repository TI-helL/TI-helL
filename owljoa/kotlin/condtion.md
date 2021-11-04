# Kotlin 조건문

- [1. If expression](#1-if-expression)
  - [1.1. 표현식에도 사용 가능한 `if` 키워드](#11-표현식에도-사용-가능한-if-키워드)
  - [1.2. 익숙한 `if` 구문도 사용 가능](#12-익숙한-if-구문도-사용-가능)
- [2. When expression](#2-when-expression)
  - [2.1. 개념](#21-개념)
  - [2.2. `else` 생략 가능한 경우](#22-else-생략-가능한-경우)
  - [2.3. 예시 모음](#23-예시-모음)

<br><br>

# 1. If expression

<br>

## 1.1. 표현식에도 사용 가능한 `if` 키워드

- 코틀린에서 `if`는 구문(statement)뿐만 아니라 표현식(expression)으로도 사용될 수 있다. (표현식은 값을 반환한다.)
  - `if`를 표현식으로 사용하는 경우 `else`를 필수적으로 포함해야한다.
  - 삼항연산자(condition ? then : else)를 if 표현식으로 대체할 수 있기 때문에 코틀린에는 삼항연산자가 없다.
    ```kotlin
    // if를 표현식으로 사용해서 삼항연산자 대체
    val max = if (a > b) a else b
    ```
  - `if`의 각 조건 브랜치들을 블록으로 활용할 수 있고, 이 경우 마지막 표현식이 블록의 값이 된다.
    ```kotlin
    // 블록 형태로도 표현 가능
    val max = if (a > b) {
    	print("Choose a")
    	a // a > b 인 경우 max에 a를 할당
    } else {
    	print("Choose b")
    	b
    }
    ```

<br>

## 1.2. 익숙한 `if` 구문도 사용 가능

```kotlin
var max = a
if (a < b) max = b

var max: Int
if (a > b) {
	max = a
} else {
	max = b
}
```

<br><br>

# 2. When expression

<br>

## 2.1. 개념

- `when`은 C 계열 언어들의 `switch`구문과 유사하게 조건부 표현식 혹은 구문을 정의할 때 사용한다.

  - `when(x)`는 인자 x가 만족하는 조건을 찾을 때까지 순서대로 모든 조건을 검사함
  - 표현식으로 정의되는 경우 `when`의 인자가 처음 만족하는 조건에 해당하는 브랜치가 표현식의 값이 된다.

  ```kotlin
  // when 구문
  // x의 값이 1이면 "x == 1", 2면, "x == 2", 둘 다 아니면 "x is neither 1 nor 2"를 출력
  when(x) {
  	1 -> print("x == 1")
  	2 -> print("x == 2")
  	else -> {
  		print("x is neither 1 nor 2")
  	}
  }

  // when 표현식
  val isOne = when(x) {
  	1 -> true
  	else false
  }
  ```

<br>

## 2.2. `else` 생략 가능한 경우

- 표현식으로 정의되는 경우 `else` 브랜치가 필수로 필요하지만, 아래와 같이 생략 가능한 경우도 있음

  - 컴파일러가 가능한 모든 조건이 브랜치 조건들에 포함된다는 것을 증명할 수 있으면, `else` 생략 가능
  - ex) `enum` class entries, `sealed` class subtypes

  ```kotlin
  enum class Bit {
    ZERO, ONE
  }

  val numericValue = when(getRandomBit()) {
      Bit.ZERO -> 0
      Bit.ONE -> 1
      // 케이스들이 enum의 모든 앤트리를 대해 포함하고 있기 때문에 else 생략
  }
  ```

<br>

## 2.3. 예시 모음

- 여러 케이스에 대해 공통적인 처리가 필요한 경우 한 줄로 표현

  ```kotlin
  when(x) {
  	0, 1 -> print("x == 0 or x == 1")
  	else -> print("otherwise")
  }
  ```

- 조건 부분에는 상수가 아닌 다양한 표현식 사용

  ```kotlin
  when(x) {
  	s.toInt() -> print("s encodes x")
  	else -> print("s does not encode x")
  }
  ```

- `in` 키워드를 활용해서 range나 collection에 포함되어있는지 아닌지를 체크

  ```kotlin
  when(x) {
  	in 1..10 -> print("x is in the range")
  	in validNumbers -> print("x is valid")
  	!in 10..20 -> print("x is outside the range")
  	else -> print("none of the above")
  }
  ```

- `is` 키워드를 활용해서 타입 체크

  - 코틀린이 제공하는 [smart casts](https://kotlinlang.org/docs/typecasts.html#smart-casts) 기능 덕분에 다른 체크 없이 해당 타입의 속성이나 메소드에 접근 가능

  ```kotlin
  fun hasPrefix(x: Any) = when(x) {
  	is String -> x.startWith("prefix")
  	else -> false
  }
  ```

- `when`에 인자를 입력하지 않으면 `if-else if`처럼 사용할 수 있다.
  - 각 브랜치 조건이 boolean 표현식이 되고, 이 조건이 true인 경우 해당 브랜치가 실행됨
    ```kotlin
    when {
    	x.isOdd() -> print("x is odd")
    	x.isEven() -> print("y is even")
    	else -> print("x+y is odd")
    }
    ```

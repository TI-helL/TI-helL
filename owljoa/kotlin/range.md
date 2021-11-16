# Range in Kotlin

- [1. 개념](#1-개념)
- [2. 반복문에 사용](#2-반복문에-사용)

<br><br>

# 1. 개념

코틀린에서 값의 범위를 표현하는 방법

- rangeTo() 함수 사용
- ..(점 두개) 연산자 사용

```kotlin
// 1 <= i <= 4
val myInteger = 1
val range = myInteger.rangeTo(4) // IntRange

print(range) // 1..4

if (i in 1..4) {
	print(i)
}
```

- 보통 포함여부의 판단을 위해 in이나 !in 연산자와 함께 사용
  - range 클래스들(IntRange, LongRange, CharRange)의 contains 함수를 간편하게 사용하기위한 연산자

<br><br>

# 2. 반복문에 사용

- Integral Type의 범위는(IntRange, LongRange, CharRange) iteration(반복) 가능
  - Integral Type의 정의는 아직 찾지 못했다.. (Integral Type이 Int, Long, Char 타입이라는 것만 확인)
  - 일단 kotlin.ranges 패키지의 Ranges.kt 파일내에 IntRange, LongRange, CharRange 클래스가 있다는 것만 확인
- for 루프 예시
  ```kotlin
  // i를 1부터 4까지 1씩 증가시키며 반복
  for (i in 1..4) print(i)

  // i를 4부터 1까지 1씩 감소시키며 반복
  for (i in 4 downTo 1) print(i)

  // i를 1부터 2씩 증가하며 반복 - 1,3,5,7
  for (i in 1..8 step 2) print(i)

  // i를 8부터 2씩 감소하며 반복 - 8,6,4,2
  for (i in 8 downTo 1 step 2) print(i)

  // until 함수 사용
  // [1, 10) 범위로 10은 제외
  for (i in 1 until 10) print(i)
  ```

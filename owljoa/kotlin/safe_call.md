# Safe call

- nullable(값이 null일 수 있는) 변수에 접근하는 안전한 방법

  ```kotlin
  val a = "Kotlin"
  val b: String? = null

  println(b?.length) // b가 null이 아니면 b 문자열의 길이를 출력하고, b가 null이면 null을 출력
  println(a?.length) // 불필요한 safe call

  // 이런 체인 형태의 safe call도 가능
  // 각 속성(properties) 중 하나라도 null이면 null이 할당됨
  val bobDepartmentHeadName = bob?.department?.head?.name

  // 할당 구문의 좌측에도 사용 가능
  // 좌측 속성 중 하나라도 null이면 할당 구문이 무시됨
  bob?.department?.head?.name = bobDepartment.getHead()
  ```

- null이 아닌 값들에 대해서만 어떤 작업을 수행하고 싶은 경우에는 `let`과 조합해서 사용할 수 있다.

  ```kotlin
  val listWithNulls: List<String?> = listOf("Kotlin", null)
  for (item in listWithNulls) {
      item?.let { println(it) } // Kotlin만 출력하고 null은 무시됨
  }
  ```

<br>

### [참고]

- [kotlin - safecall](https://kotlinlang.org/docs/null-safety.html#safe-calls)

- [kotlin - let](https://kotlinlang.org/docs/scope-functions.html#let)

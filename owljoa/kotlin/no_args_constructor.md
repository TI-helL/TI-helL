# Kotlin - no-args constructor 생성 방법

- modelmapper 사용 시 변환 대상 클래스에 대해 파라미터 없는 생성자(no arguments constructor or default constructor)가 필요했다.

- primary 생성자의 모든 파라미터에 기본값(default value)을 지정하면, Kotlin 컴파일러가 파라미터가 없는 생성자를 만들어낸다.

  ```kotlin
  // modelmapper를 사용한 변환의 대상(to / destination) 클래스는 아래와 같이 primary 생성자의 모든 파라미터에 기본값을 지정
  data class PersonViewA(
    var id: Int = -1,
    var name: String = ""
  )

  data class PersonViewB(
    name: String = ""
    age: Int = -1,
  ) {
    var name: String = name
    var age: Int = age
  }
  ```

<br>

### [참고]

https://kotlinlang.org/docs/classes.html#secondary-constructors

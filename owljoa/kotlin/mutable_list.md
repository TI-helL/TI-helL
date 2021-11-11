<br>

코틀린으로 작업하다가 List를 자바의 List처럼 사용하려 했더니 불가능했다 List 객체는 add 메소드를 제공하지 않았고, 찾아보니 코틀린에서 List는 읽기전용이고 쓰기까지 가능한 Mutable(변경 가능한)List 클래스가 별도로 제공된다.

```kotlin
// 코틀린에서는 컴파일도 불가능한 코드
var list: List<SomeObject> = ArrayList()
list.add(someElement)
```

<br>

# MutableList

- 데이터의 추가, 삭제 기능을 제공하며, 순서를 보장하는 제네릭 컬렉션
- 사용방법은 자바의 ArrayList와 크게 다르지 않기 때문에 간단하게 초기화와 데이터의 추가를 예시 코드로 설명한다.

<br>

## 1. 초기화

- kotlin.collections 패키지의 Collections 클래스 mutableListOf 메소드를 사용한다.
- mutableListOf 메소드는 두종류로 오버로딩 되어있는데, 하나는 빈 리스트를 생성하는 것이고 다른 하나는 리스트에 들어갈 요소들을 입력받는 것이다.

  ```kotlin
  // 정수형 데이터를 담을 빈 리스트 생성
  val listA = mutableListOf<Int>()

  // 요소를 입력받아 리스트 생성
  val listB = mutableListOf(1, 2, 3)
  ```

<br>

## 2. 데이터 추가

- 데이터를 추가하는 방법은 add, addAll 메소드를 사용하는 방법이 있고 + 연산자를 사용하는 방법이 있다.

  ```kotlin
  val list = mutableListOf<Int>()
  list.add(1)

  list.addAll(listOf(2, 3, 4))
  list += listOf(5, 6)
  ```

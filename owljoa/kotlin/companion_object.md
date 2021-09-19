# Companion objects

- 클래스 내에 선언한 `companion object`에는 객체 인스턴스 없이 해당 클래스 이름만으로 접근이 가능하다.

  ```kotlin
  class MyClass {
    companion object Factory {
      fun create(): Myclass = MyClass()
    }
  }
  
  val instance = MyClass.create()
  ```

<br>

## 이름 생략

- companion object의 이름을 생략하면 `Companion`이라는 이름이 사용된다.
- companion object의 이름 생략 여부와 관계 없이 class 이름은 companion object에 대한 참조 역할도 함

  ```kotlin
  class MyClass1 {
    companion object { }
  }

  val x = MyClass1.Companion
  val x2 = MyClass1

  class MyClass2 {
    companion object Named { }
  }

  val y = MyClass2

  ```


<br>

## 인터페이스 구현

- companion object가 다른 언어(ex. java)에서의 static 멤버처럼 보일 수 있지만, 런타임에서 companion object는 실제 객체의 인스턴스 멤버이다.
- 예를 들면 인터페이스의 구현도 가능하다.
  
  ```kotlin
  interface Factory<T> {
    fun create(): T
  }

  class MyClass {
    companion object : Factory<MyClass> {
      override fun create(): MyClass = MyClass()
    }
  }

  val factory : Factory<MyClass> = MyClass
  ```

# Kotlin Service Logic Performance Evaluation

## 클래스 내에서 성능 평가 하는 방법

서비스 로직 내에 다음 코드를 추가하여 출력되는 시간을 비교한다.

```kotlin
    val start: Long = System.currentTimeMillis()

    // code ...

    val end: Long = System.currentTimeMillis()
    println("result: " + (end - start))
```

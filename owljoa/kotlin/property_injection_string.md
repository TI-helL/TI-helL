# spring value annotation in kotlin - escape $(dollar) character

코틀린에는 string template이라는 문법이 있어서

문자열 내에서 변수의 값을 표현하기 위해 '$' 문자를 사용한다.

예를 들면, 아래와 같이

```kotlin
val s = "abc"
println("$s.length is ${s.length}")

// 결과
// abc.length is 3
```

<br>

그래서 spring에서 value annotation을 사용하는 경우와 같이 프로퍼티에 접근시 사용하는 구문에서 '$' 문자를 아래와 같이 이스케이프 해주어야 한다.

- '$' 문자를 문자로써 사용하기 위함

```kotlin
@Value("\${store.name}")
val storeName: String = ""
```

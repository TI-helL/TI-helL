# kotlin_start_cast_error

## 문제

스마트 캐스트를 하지 못해 !!를 사용하는 코드를 보았다

```kotlin
// customScreenerData
data class customScreenerData{
    var afford: String? = null
}

// logic
if(customScreenerData.afford != null){
    data["afford"] = customScreenerData.afford!!
}
```

위 코드는 동작은 한다. 다만 null safe한 코틀린에서 !!를 사용하는건 아름답지 않다고 생각한다.

afford에 대한 null 세이프가드를 해줬는데도 String?을 String으로 스마트 캐스팅을 하지 못하는 이유는 afford가 var이기 때문이다. mutable var를 다른 스레드에서 변경할 수 있기 때문에 if안은 null safe한 스코프를 보장받지 못한다.

## 해결법

이를 해결하기 위해선 두가지 방법을 사용할 수 있다.

- dto의 var을 val로 설계한다
- let을 사용하여 그 안의 스코프의 널세이프를 보장받는다

var를 val로 바꾸기에는 dto가 여러 로직에 복잡하게 연결되어 있기에 좀 더 코틀린 다운 null safe한 문법을 적용하여 해결하였다.

```kotlin
customScreenerData.afford?.let{
    data["afford] = it
}
```

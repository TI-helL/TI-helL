# jackson issue

jackson은 `.json` 데이터 구조 처리를 도와주는 라이브러리이다. 그러나 Kotlin + SpringBoot 개발 환경 내 다음과 같이 DTO 내에 `is`로 시작하는 field가 존재하게 되면, 해당 field를 `json`으로 변경시켜주지 못하는 이슈가 있다.

```kotlin
class Dto(
  ...
  val isDeleted: Boolean
  ...
) {
  ...
}
```

이를 해결하기 위해선 다음과 같은 두가지의 방법이 있지만, 되도록이면 전자의 방법을 사용하는 것이 좋을 것 같다. jackson의 경우 `jackson.property-naming-strategy=SNAKE_CASE` 처럼 `property-naming-strategy`를 정의할 수 있는데 두번째 방법으로 해당 문제를 해결할 시 코드 이해에 혼란을 줄 가능성이 있다.

- @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
- @get:JsonProperty("is_deleted")

```kotlin
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
class Dto(
  ...
  @get:JsonProperty("is_deleted") val isDeleted: Boolean
  ...
) {
  ...
}
```

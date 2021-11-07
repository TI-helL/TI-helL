# Multi Unique Key

JPA를 통해 다수 개의 유니크 컬럼을 지정할 때 다음과 같이 `uniqueConstraints`를 통해 명시해주면 유니크 속성을 가지게 된다.

```java

@Table(
  name = "table_name",
  uniqueConstraints = @UniqueConstraint(columnNames = { "colum_name", "colum_name", "colum_name" })
)

```

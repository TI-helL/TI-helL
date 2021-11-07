# Don’t use any getters/setters/properties

`getter`, `setter`, `property` 대신 객체에 정확한 메시지를 전달한다. 예로 다음과 같이 `getter`를 통해 값을 가져오고 연산을 하는 것이 아니라, 값을 전달하여 데이터를 은닉시킨다.

```java
sample.getValue() + 10

sample.add(10)
```

객체는 구현된 내부 데이터를 노출하면 안된다. 접근 메소드와 수정 메소드는 내부 데이터를 노출시키므로 유지 보수에 악영할을 미치기때문에 가능한 사용하지 않아야 한다.

`Lombok`에서 제공하는 `@getter`, `@setter`로 코드의 간결성을 확보하지만 되도록이면 필드는 private으로 하고, 위와 같이 정확한 메시지를 전달한다.

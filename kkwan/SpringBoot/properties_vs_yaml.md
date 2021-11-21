# `.properties` vs `.yaml`

`.properties` vs `.yaml` 둘의 목적은 동일하나, `.yaml`은 `.properties`와 다르게 계층 구조로 값을 잘 표현하며, 동일한 구성이 중복되는 것을 예방할 수 있다. 계층적 구조로 인해 높은 가독성을 보장한다.

```yaml
example:
  jdbc:
    url: localhost
    port: 3306
    user: user
    password: password
```

```properties
example.jdbc.url=localhost
example.jdbc.port=3306
example.jdbc.user=user
example.jdbc.password=password
```

# Null Check - Elvis Operator

- 코틀린의 Null Safety 제공을 위한 문법 중 하나로, 어떤 변수가 null인 경우 사용할 대체 값을 미리 지정할 수 있도록 하는 연산자
- `?:` 기호로 표현

<br>

## 사용 예

<br>

### 1. 대체 값 사용

<br>

Elvis 연산자를 이용해서 if문을 아래처럼 대체할 수 있다.

```kotlin
val l = b?.length ?: -1
```

- `?:`(Elvis 연산자)의 왼쪽 값이 null이 아니면 그대로 사용
- `?:`의 왼쪽 값이 null인 경우 오른쪽 값을 사용

<br>

### 2. null 값을 그대로 사용

- 대상 변수가 null을 참조하는 경우 null 참조를 그대로 사용할 수 있다.

```kotlin
fun foo(node: Node): String? {
  val parent = node.getParent() ?: return null
}
```

<br>

### 3. 예외 발생

- 대상 변수가 null을 참조하는 경우 예외를 발생시킬 수도 있다.

```kotlin
fun foo(node: Node): String? {
  val name = node.getName() ?: throw IllegalArgumentException("name expected")
}
```

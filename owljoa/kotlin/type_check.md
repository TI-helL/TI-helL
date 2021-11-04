# Kotlin 타입 체크

<br>

### 1. java에서는 `instanceof` 연산자를 사용

```java
// a가 A 타입인지 체크
if (a instanceof A){
	...
}
```

<br>

### 2. Kotlin에서는 `is`, `!is` 연산자 사용

```kotlin
// obj가 String 타입인지 체크
if (obj is String) {
	print(obj.length)
}

// !(obj is String) 과 같은
if (obj !is String) {
	print("Not a String")
} else {
	print(obj.length)
}
```

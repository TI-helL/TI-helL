# INTENT OBJECT PASSING

- 인텐트는 다른 컴포넌트간 작업 수행을 위한 정보를 전달하는 역할을 한다
- 그 정보엔 extra라는 데이터도 포함되는데
- intent에는 자료형별 get 메서드 래퍼들을 제공한다

## object

- 기본자료형 외의 사용자 정의 object 역시 주고받을 수 있는데
- putExtra("extra name", object instanse)
- getSerializableExtra("extra name")
- 두 메서드를 통해 직렬화된 오브젝트를 주고받는다.

```kotlin
// main activity
intent = Intent(this, subActivity.class::java)
intent.putExtra("object", object)

// sub activity
Object object = intent.getSerializableExtra("object")
```

## serializable

- 오브젝트를 직렬화 시키기 위해선
- Serializable를 구현해 주어야 한다.

```kotlin
class Object: Serializable{
    ...
}
```

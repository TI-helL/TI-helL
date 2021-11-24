# Item 3. private 생성자나 열거 타입으로 싱글턴임을 보증하라.

<br><br>

# 1. 싱글턴(singleton)

- 인스턴스를 하나만 생성할 수 있는 클래스
- ex) 함수와 같은 stateless 객체, 설계상 유일해야하는 시스템 컴포넌트

<br>

# 2. 생성 방법

- 생성자를 private 으로 감춰둔다.
- 싱글턴 인스턴스에 접근할 수 있는 puiblic static 변수가 메소드를 준비한다.

<br>

## 2.1. 정적 필드(static field)를 사용하는 방법

### 2.1.1. 개념 및 예시

- 예시코드에서 GlobalConfig 클래스의 생성자는 `GlobalConfig.INSTANCE`를 초기화하는 시점에 단 한 번만 호출된다.
  → `public`, `protected`로 선언된 생성자가 없기 때문에 프로그램 내에서 인스턴스가 하나만 존재하는 것이 보장된다.
- 예외 사항: 권한이 있는 클라이언트는 리플렉션 API의 `AccessibleObject.setAccessible` 메소드를 사용해서 `private` 생성자를 호출하는 것이 가능하다.
  → 방지를 위해 `private` 생성자 내에 두 번째 인스턴스 생성 시점을 잡아내서 예외를 처리하는 구문을 넣어주면 된다.

  ```java
  public class GlobalConfig {
    public static final GlobalConfig INSTANCE = new GlobalConfig();
    private GlobalConfig() { ... }

    public setBaseConfig() { ... }
  }
  ```

<br>

### 2.1.2. 장점

- 정적 필드에 직접 접근해서 사용하기 때문에 클래스가 싱글턴임이 명백히 드러난다.
  - 정적 필드가 final로 선언되어 있어서 다른 객체를 참조할 수 없음
- 간결함(?)

<br>

## 2.2. 정적 팩토리 메소드(static factory method)를 사용하는 방법

### 2.2.1. 개념 및 예시

- `GlobalConfig.getInstance()` 는 항상 같은 인스턴스를 반환하므로 클라이언트에서는 같은 인스턴스를 사용할 수 밖에 없다.
  → 인스턴스가 하나만 존재함을 보장
- 앞서 이야기한 리플렉션을 이용한 예외 처리는 여기서도 필요하다!!

```java
public class GlobalConfig {
	private static final GlobalConfig INSTANCE = new GlobalConfig();
	private GlobalConfig() { ... }
	public static GlobalConfig getInstance() { return INSTANCE; }

	public setBaseConfig() { ... }
}
```

<br>

### 2.2.2. 장점

- 인스턴스에 접근하는 방법(API)을 변경하지 않고도 싱글턴이 아닌 형태로 변경할 수 있다.
  - 팩토리 메소드(`getInstance`)가 호출하는 스레드별로 다른 인스턴스를 반환하도록 할 수 있다.
- 정적 팩토리를 제네릭 싱글턴 팩토리로 만들 수 있다.
  - 제네릭 싱글턴 팩토리 → Item 30 에서 공부할 것,,,
- 정적 팩토리 메소드의 참조 변수(객체)를 공급자(supplier)로 사용할 수 있다. (Item 43, 44에서 공부,,)
  - ex) GlobalConfig::getInstance를 Supplier<GlobalConfig>로 사용

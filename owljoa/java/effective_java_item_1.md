# Item 1. 생성자 대신 정적 팩토리 메소드를 고려하라

- [1. 정적 팩토리 메소드(static factory method)?](#1-정적-팩토리-메소드static-factory-method)
- [2. 장점](#2-장점)
  - [2.1. 이름을 가질 수 있다.](#21-이름을-가질-수-있다)
  - [2.2. 호출할 때마다 인스턴스를 새로 생성하지 않아도 된다.](#22-호출할-때마다-인스턴스를-새로-생성하지-않아도-된다)
  - [2.3. 반환타입의 하위 타입 객체를 반환할 수 있다.](#23-반환타입의-하위-타입-객체를-반환할-수-있다)
  - [2.4. 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환할 수 있다.](#24-입력-매개변수에-따라-매번-다른-클래스의-객체를-반환할-수-있다)
  - [2.5. 정적 팩토리 메소드를 작성하는 시점에는 반환할 객체의 클래스가 존재하지 않아도 된다.](#25-정적-팩토리-메소드를-작성하는-시점에는-반환할-객체의-클래스가-존재하지-않아도-된다)
- [3. 단점](#3-단점)
  - [3.1. 상속을 하려면 public이나 protected 생성자가 필요하니 정적 팩토리 메소드만 제공하면 하위 클래스를 만들 수 없다.](#31-상속을-하려면-public이나-protected-생성자가-필요하니-정적-팩토리-메소드만-제공하면-하위-클래스를-만들-수-없다)
  - [3.2. 정적 팩토리 메소드는 프로그래머가 찾기 어렵다.](#32-정적-팩토리-메소드는-프로그래머가-찾기-어렵다)
    - [3.2.1. 널리 알려진 네이밍 규칙과 예시](#321-널리-알려진-네이밍-규칙과-예시)

<br><br>

# 1. 정적 팩토리 메소드(static factory method)?

- public 생성자를 이용하지 않고 클래스의 인스턴스를 생성하는 방법
- 해당 클래스의 인스턴스를 반환하는 간단한 static method
- ex) 프리미티브 타입 int(정수) 값을 입력받아서 Integer 인스턴스로 변환해주는 정적 팩토리 메소드
  ```java
  // java.lang
  // Integer.java
  public static Integer valueOf(int i) {
      if (i >= IntegerCache.low && i <= IntegerCache.high)
          return IntegerCache.cache[i + (-IntegerCache.low)];
      return new Integer(i);
  }
  ```

<br><br>

# 2. 장점

<br>

## 2.1. 이름을 가질 수 있다.

- 생성자의 이름은 클래스의 이름으로 정해져 있기 때문에, 매개변수만으로 반환되는 인스턴스의 특성을 유추해야한다.
- 정적 팩토리 메소드는 이름에 제약이 없기 때문에, 반환하는 인스턴스의 특성을 이름으로 표현할 수 있다.
  ex) 아래 두 메소드는 모두 무작위로 길이가 bitLength이고 양수인 확률적 소수(probable prime)를 반환하지만, 생성자는 이름만으로 어떤 숫자를 반환하는지 알 수 없다. 반면에, 정적 팩토리 메소드인 probablePrime은 이름만으로 어떤 숫자를 반환하는지 유추해낼 수 있다.
  (참고로 확률적 소수는 모든 소수가 만족하고 대부분의 합성수는 만족하지 못하는 조건을 만족하는 정수를 말한다. [by wiki](https://en.wikipedia.org/wiki/Probable_prime))

  ```java
  // java.math
  // BigInteger.java
  public BigInteger(int bitLength, int certainty, Random rnd) {
      ...
  }

  public static BigInteger probablePrime(int bitLength, Random rnd) {
      ...
  }

  ////// 호출
  BigInteger(256, 10, rnd);
  BigInteger.probablePrime(256, rnd);
  ```

<br>

## 2.2. 호출할 때마다 인스턴스를 새로 생성하지 않아도 된다.

- 생성자는 호출할 대마다 새로운 인스턴스를 반환한다.
- 정적 팩토리 메소드를 이용하면 기존의 인스턴스를 재활용할 수 있다.
- ex) Boolean.valueOf(boolean) 메소드는 객체를 새로 생성하지 않고, 미리 생성해둔 true, false에 해당하는 객체들을 재활용한다.

  ```java
  // java.lang
  // Boolean.java

  ...

  public static final Boolean TRUE = new Boolean(true);
  public static final Boolean FALSE = new Boolean(false);

  ...

  public static Boolean valueOf(boolean b) {
      return (b ? TRUE : FALSE);
  }

  ...
  ```

- 이 장점을 응용한 결과물들에 대해 알아볼만 할 것 같다.
  - Flyweight Pattern
  - instance-controlled 클래스
    - 싱글턴
    - 인스턴스화 불가
  - 불변 값 클래스

<br>

## 2.3. 반환타입의 하위 타입 객체를 반환할 수 있다.

- 생성자는 항상 소속 클래스의 객체(인스턴스)를 반환한다.
- 정적 팩토리 메소드는 소속 클래스의 하위 클래스 객체를 반환할 수 있다.
- ex) Bird 클래스를 상속 받는 Duck 클래스가 있다면, Bird 클래스에서 Duck 클래스의 인스턴스를 반환하는 정적 팩토리 메소드를 제공할 수 있다.

  ```java
  // Bird.java
  public class Bird {

    private String name;
  	private String type;

    public Bird(String name, String type) {
      this.name = name;
      this.type = type;
    }

    public static Bird from(String type, String name) {
      switch (type) {
        case "sparrow":
          return new Sparrow(name, type);
        case "duck":
          return new Duck(name, type);
        default:
          return new Bird(name, type);
      }

    }

  }

  // Sparrow.java
  public class Sparrow extends Bird {

    public Sparrow(String name, String type) {
      super(name, type);
    }
  }

  // Duck.java
  public class Duck extends Bird {

    public Duck(String name, String type) {
      super(name, type);
    }
  }

  // MainApplication.java
  public class MainApplication {

    public static void main(String[] args) {
      Bird myDuck = Bird.from("duck", "ducky duck");
    }
  }
  ```

<br>

## 2.4. 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환할 수 있다.

- 생성자는 매개변수에 관계없이 소속 클래스의 인스턴스만을 반환할 수 있다.
- 반환 타입의 하위 타입이기만 하면 어떤 클래스의 인스턴스든지 모두 반환할 수 있다.
  - 다음 버전에서는 다른 클래스의 인스턴스를 반환해도 된다.
  - 해당 클래스를 사용하는 클라이언트는 내부 구현을 알 수도 없고 알 필요가 없다.
- ex) EnumSet 클래스는 원소의 갯수에 따라 두 가지 하위 클래스 중 하나의 인스턴스를 반환한다. (RegularEnumSet, JumboEnumSet)
  EnumSet 클래스를 사용하는 클라이언트 입장에서는 내부 구현이 변경되어도 코드를 변경하지 않아도 된다.

  ```java
  // java.util
  // EnumSet.java
  public static <E extends Enum<E>> EnumSet<E> noneOf(Class<E> elementType) {
    ...

    if (universe.length <= 64)
        return new RegularEnumSet<>(elementType, universe);
    else
        return new JumboEnumSet<>(elementType, universe);
  }

  ...

  public static <E extends Enum<E>> EnumSet<E> of(E e) {
      EnumSet<E> result = noneOf(e.getDeclaringClass());
      result.add(e);
      return result;
  }
  ```

<br>

## 2.5. 정적 팩토리 메소드를 작성하는 시점에는 반환할 객체의 클래스가 존재하지 않아도 된다.

- EnumSet을 예로 들면, RegularEnumSet, JumboEnumSet과 같은 구현체가 없이 인터페이스만 작성해두어도 클라이언트에서 사용하는 경우 컴파일 시 문제가 되지는 않는다.
- 내가 겪어본 프레임워크들은 보통 제공해야할 기능을 인터페이스로 두고 디폴트 구현체를 미리 구현해두는 방식을 많이 채택하고 있는 것으로 보인다.

```java
// java.util
// EnumSet.java
public static <E extends Enum<E>> EnumSet<E> noneOf(Class<E> elementType) {
  ...

  if (universe.length <= 64)
      return new RegularEnumSet<>(elementType, universe);
  else
      return new JumboEnumSet<>(elementType, universe);
}

...

public static <E extends Enum<E>> EnumSet<E> of(E e) {
    EnumSet<E> result = noneOf(e.getDeclaringClass());
    result.add(e);
    return result;
}
```

<br><br>

# 3. 단점

<br>

## 3.1. 상속을 하려면 public이나 protected 생성자가 필요하니 정적 팩토리 메소드만 제공하면 하위 클래스를 만들 수 없다.

- 상위클래스의 public 혹은 protected 생성자가 있어야 하위클래스를 반환하는 정적 팩토리 메소드를 제공할 수 있다.

<br>

## 3.2. 정적 팩토리 메소드는 프로그래머가 찾기 어렵다.

- 생성자처럼 표준이되거나 공식적인 키워드가 있는 것이 아니기 때문에 클래스 내에서 정적 팩토리 메소드를 찾아서 사용해야한다.
- 그래서 널리 알려진 네이밍 규칙에 따라 메소드 이름을 잘 짓고 API 문서를 잘 작성해야한다.

<br>

### 3.2.1. 널리 알려진 네이밍 규칙과 예시

- from
- of
- valueOf
- instance 혹은 getInstance
- create 혹은 newInstance
- get[Type]
- new[Type]
- [type]

```java
Date d = Date.from(instant);
Set<Rank> languages = EnumSet.of(C, JAVA, PYTHON);
BigInteger.valueOf(Integer.MAX_VALUE);
StackWalker luke = StackWalker.getInstance(options);
Object newArray = Array.newInstance(classObject, arrayLen);
// get[Type]
FileStore fs = Files.getFileStore(path);
// new[Type]
BufferedReader br = Files.newBufferedReader(path);
// [type]
List<Complaint> litany = Collections.list(legacyLitany);
```

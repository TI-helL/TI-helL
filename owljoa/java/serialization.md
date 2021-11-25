# Serialization(직렬화)

<br><br>

# 1. 개념 및 특징

- 직렬화는 플랫폼에 의존하지 않고 인스턴스에 의존하기 때문에, 직렬화 이후 다른 플랫폼에서 역직렬화 할 수 있다.
- 특정 클래스의 인스턴스가 직렬화될 수 있도록 하려면 해당 클래스에 `Serializable` 인터페이스를 구현해야한다.

<br>

## 1.1. Serialization(직렬화)

- 객체의 상태를 바이트 스트림으로 변환하는 행위
- `ObjectOutputStream`의 `writeObject` 메소드를 이용하면 프리미티브 타입과 객체들을 바이트 스트림의 형태로 변환하여 출력할 수 있다.
  ```java
  // package java.io
  // ObjectOutputStream.java
  // Serializable 인터페이스를 구현한 객체를 받아서 바이트 스트림으로 변환하여 출력하는 메소드
  public final void writeObject(Object o) throws IOException;
  ```

<br>

## 1.2. Deserialization(역직렬화)

- 바이트 스트림을 객체로 변환하는 행위
- `ObjectInputStream`의 `readObject` 메소드를 이용하면 바이트 스트림을 읽어들여서 자바 객체로 변환할 수 있다.
  ```java
  // package java.io
  // ObjectInputStream.java
  // 바이트 스트림을 읽어들여서 자바 객체로 변환하는 메소드
  public final Object readObject() throws IOException, ClassNotFoundException;
  ```

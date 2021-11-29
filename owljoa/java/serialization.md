# 1. 개념 및 특징

- 직렬화는 플랫폼에 의존하지 않고 **인스턴스에 의존**하기 때문에, 직렬화 이후 다른 플랫폼에서 역직렬화 할 수 있다.
  - static 필드는 클래스에 속하고 인스턴스에 속하지 않기 때문에 직렬화되지 않는다.
- 특정 클래스의 인스턴스가 직렬화될 수 있도록 하려면 해당 클래스에 `Serializable` 인터페이스를 구현해야한다.
- 클래스의 필드에 `transient` 키워드를 붙이면 직렬화할 때 해당 필드가 제외된다.

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

<br>

## 1.3. 예시

- `ObjectOutputStream`과 `FileOutputStream`을 사용하여 객체의 상태를 직렬화하고 파일에 저장
- `FileInputStream`으로 파일을 스트림 형태로 불러오고 `ObjectInputStream`을 이용해서 새로운 객체로 변환

<br>

### 1.3.1. `Serializable` 인터페이스를 구현한 `Bird` 클래스

```java
package bird;

import java.io.Serializable;

public class Bird implements Serializable {

  private static final long serialVersionUID = 1L;

	// static 변수는 인스턴스가 아닌 클래스에 소속됨
  static String animalCode = "61rd";
  private int height;
  private String type;
	// transient 키워드가 붙어서 직렬화에서 제외될 예정
  transient int speed;

  // getters, setters, toString method
}
```

<br>

### 1.3.2. `Bird` 클래스의 인스턴스를 생성하고 파일 스트림과 객체 스트림을 이용하여 직렬화/역직렬화하여 파일로 쓰기/읽기

```java
import bird.Bird;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class MainApplication {

  public static void main(String[] args) throws IOException, ClassNotFoundException {

		// Bird 객체 생성
    Bird bird = new Bird();
    bird.setType("sparrow");
    bird.setHeight(100);
    bird.setSpeed(10);

		// 파일 출력 스트림 생성
    FileOutputStream fileOutputStream = new FileOutputStream("test_file.txt");

		// 파일 출력 스트림에 대한 객체 출력 스트림 생성 및 객체를 직렬화해서 파일에 쓰기
    ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
    objectOutputStream.writeObject(bird);
    objectOutputStream.flush();
    objectOutputStream.close();

		// 파일 입력 스트림 생성
    FileInputStream fileInputStream = new FileInputStream("test_file.txt");

		// 파일 입력 스트림에 대한 객체 입력 스트림 생성 및 객체를 역직렬화하며 읽어오기
    ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
    Bird inputBird = (Bird) objectInputStream.readObject();
    objectInputStream.close();

    System.out.println("inputBird: " + inputBird);
    System.out.println("animalCode: " + Bird.getAnimalCode());
  }

}
```

<br>

### 1.3.3. 실행 결과

```java
...

// transient 설정된 speed 필드는 직렬화에서 제외되어,
// int 변수의 기본값인 0이 할당되어 있음을 확인할 수 있다.
inputBird: Bird{height=100, type='sparrow', speed=0}
animalCode: 61rd

...
```

# Java Serialization

- [Java Serialization](#java-serialization)
- [1. 개념 및 특징](#1-개념-및-특징)
  - [1.1. Serialization(직렬화)](#11-serialization직렬화)
  - [1.2. Deserialization(역직렬화)](#12-deserialization역직렬화)
  - [1.3. 예시](#13-예시)
    - [1.3.1. `Serializable` 인터페이스를 구현한 `Bird` 클래스](#131-serializable-인터페이스를-구현한-bird-클래스)
    - [1.3.2. `Bird` 클래스의 인스턴스를 생성하고 파일 스트림과 객체 스트림을 이용하여 직렬화/역직렬화하여 파일로 쓰기/읽기](#132-bird-클래스의-인스턴스를-생성하고-파일-스트림과-객체-스트림을-이용하여-직렬화역직렬화하여-파일로-쓰기읽기)
    - [1.3.3. 실행 결과](#133-실행-결과)
- [2. 알아두어야 할 것들](#2-알아두어야-할-것들)
  - [2.1. 내부 객체도 직렬화가 가능해야한다.](#21-내부-객체도-직렬화가-가능해야한다)
  - [2.2. Serial Version UID](#22-serial-version-uid)
  - [2.3. 커스텀 직렬화(custom serialization)](#23-커스텀-직렬화custom-serialization)

<br><br>

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

<br><br>

# 2. 알아두어야 할 것들

## 2.1. 내부 객체도 직렬화가 가능해야한다.

- 아래 예시처럼 클래스(`Bird`) 내에 다른 객체(`Wing`)가 필드로 포함되어있는 경우, `Wing` 클래스도 `Serializable` 인터페이스를 구현해야 `Bird` 인스턴스를 직렬화할 수 있다.
  - 그렇지 않을 경우 `NotSerializableException`이 발생한다.

```java
...

public class Bird implements Serializable {

	...

	private Wing wing;

	...
}
```

<br>

## 2.2. Serial Version UID

- JVM은 각 직렬화가 가능한 클래스에 long 타입의 버전 번호를 연결한다.
  - 버전번호는 객체를 저장하거나 불러올 때 객체 필드 구성을 검증하는데 사용된다.
- 클래스 내에 `serialVersionUID`라는 이름의 long 형 필드가 선언되어있지 않으면, JVM이 런타임에 자동생성한다.
  - 접근 제어자, 각 필드들과 클래스 이름을 기반으로 생성
  - 클래스의 필드 구성에 어떤 변경이 일어나면 버전번호가 변경되고 `InvalidClassException`이 발생할 수 있다.
  - 자동생성된 버전번호는 컴파일러에 의존하기 때문에 의도치 않은 `InvalidClassException`이 발생할 수 있기 때문에 `serialVersionUID`를 선언해서 사용하는 것이 권장된다.

<br>

## 2.3. 커스텀 직렬화(custom serialization)

- 자바에서 제공되는 디폴트 직렬화 방법을 재정의(override)해서 사용할 수 있다.
- 커스텀 직렬화는 직렬화가 불가능한 필드의 직렬화에 유용하다.
- 직렬화 대상 클래스 내에 아래 두 메소드를 추가함으로써 커스텀 직렬화를 정의할 수 있다.

  ```java
  private void writeObject(ObjectOutputStream out) throws IOException;
  private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException;
  ```

  <br>

- 예시

  - 이전 예시에서 transient 키워드로 마킹되어 직렬화에서 제외되었던 speed 필드를 직렬화에 포함시키기 위해 커스텀 직렬화를 수행하는 예시
  - Bird 클래스에서 writeObject와 readObject 재정의

    - 각 객체의 defaultWriteObject, defaultReadObject 메소드로 기본 직렬화 수행 후 직렬화에 포함되지 않은 speed 필드를 직렬화하는 구문을 추가하는 방식으로 재정의한다.

    ```java
    ...

    public class Bird implements Serializable {

    	...

      transient int speed;

    	// transient 키워드로 마킹된 필드
      private void writeObject(ObjectOutputStream objectOutputStream) throws IOException {
        objectOutputStream.defaultWriteObject();
        objectOutputStream.writeObject(getSpeed());
      }

      private void readObject(ObjectInputStream objectInputStream)
        throws IOException, ClassNotFoundException {
        objectInputStream.defaultReadObject();
        int speed = (int) objectInputStream.readObject();
        this.setSpeed(speed);
      }

      // getters, setters, toString method
    }
    ```

    <br>

  - MainApplication 클래스

    ```java
    ...

    public class MainApplication {

      public static void main(String[] args) throws IOException, ClassNotFoundException {

        Bird bird = new Bird();
        bird.setType("sparrow");
        bird.setHeight(100);
        bird.setSpeed(10);

        FileOutputStream fileOutputStream = new FileOutputStream("test_file.txt");
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
        objectOutputStream.writeObject(bird);
        objectOutputStream.flush();
        objectOutputStream.close();

        FileInputStream fileInputStream = new FileInputStream("test_file.txt");
        ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
        Bird inputBird = (Bird) objectInputStream.readObject();
        objectInputStream.close();

        System.out.println("inputBird: " + inputBird);
      }

    }
    ```

  - 실행 결과

    ```java
    ...

    // 이전 예시와는 다르게 speed 값이 직렬화되었음을 확인할 수 있다.
    inputBird: Bird{height=100, type='sparrow', speed=10}

    ...
    ```

# default interface method

java 8 이전에는 인터페이스가 추상 메소드만을 가질 수 있었다.

- 여러 구현체 클래스가 있는 인터페이스의 경우, 새로운 메소드가 추가되면 모든 구현체 클래스에서 새로운 메소드를 구현해야했다.

<br>

java 8에서는 이런 문제를 해결하기위해 default method의 개념을 도입했다.

- 인터페이스에 메소드의 구현체를 미리 넣어둘 수 있는 수단으로, 기존의 인터페이스 구현체들에서 구현하지 않아도 컴파일이 가능하다.

<br>

예시

- 아래 User 인터페이스를 구현한 AdminUser, GeneralUser 클래스는 default 메소드인 sayHello 메소드를 구현하지 않아도 에러가 발생하지 않는다.

<br>

- User Interface

  ```java
  package user;

  public interface User {

    void sleep();

    void readBook();

    default void sayHello() {
      System.out.println("Hello User!");
    }
  }
  ```

<br>

- AdminUser

  ```java
  package user.impl;

  import user.User;

  public class AdminUser implements User {

    private Integer id;
    private String name;

    public AdminUser(Integer id, String name) {
      this.id = id;
      this.name = name;
    }

    @Override
    public void sleep() {
      System.out.println("admin user - sleep");

    }

    @Override
    public void readBook() {
      System.out.println("admin user - read book");
    }
  }
  ```

<br>

- GeneralUser

  ```java
  package user.impl;

  import user.User;

  public class GeneralUser implements User {

    private Integer id;
    private String name;

    public GeneralUser(Integer id, String name) {
      this.id = id;
      this.name = name;
    }

    @Override
    public void sleep() {
      System.out.println("general user - sleep");
    }

    @Override
    public void readBook() {
      System.out.println("general user - read book");
    }
  }
  ```

<br>

- Main App

  ```java
  import user.User;
  import user.impl.AdminUser;
  import user.impl.GeneralUser;

  public class MainApplication {

    public static void main(String[] args) {

      System.out.println("Hello World");

      User adminUser = new AdminUser(1, "Jack");
      User generalUser = new GeneralUser(2, "Kate");

      adminUser.readBook();
      adminUser.sayHello();
      generalUser.readBook();
      generalUser.sayHello();

    }

  }
  ```

<br>

- 실행 결과
  ```java
  Hello World
  admin user - read book
  Hello User!
  general user - read book
  Hello User!
  ```

# Item 2. 생성자에 매개변수가 많다면 빌더를 고려하라

객체 생성에 필요한 선택적(optional) 매개변수가 많은 경우 정적 팩토리 메소드나 생성자만을 사용하면 제약이 있다.

→ 이런 경우에 개발자들이 사용해오던 패턴들과 빌더 패턴에 대해 그 장단점을 설명한다.

<br><br>

## 1. Telescoping Constructor Pattern (점층적 생성자 패턴)

<br>

### 1.1. 개념

객체 생성 시 필수 매개변수만 받는 생성자를 시작으로 점층적으로 선택적인 매개변수를 입력받는 생성자들을 추가해나가는 방법으로 원하는 매개변수를 모두 포함한 생성자 중 가장 짧은 것을 골라서 호출해서 사용한다.

- 장점
  - 단일 생성자나 정적 팩토리만을 사용하는 것에 비해 선택적 매개변수를 적게 입력할 수 있다.
- 단점
  - 매개변수의 갯수가 늘어날수록 클라이언트(호출 부분) 코드를 작성과 이해가 어려워진다.
  - 원하는 매개변수들의 사이 순서에 있는 매개변수에 대해서는 디폴트값을 끼워서 호출해야한다.

<br>

### 1.2. 예시

- Sandwich 클래스

    ```java
    ...
    
    public class Sandwich {
      
      private final Title title; // 필수
      private final Bread bread; // 필수
      private final Cheese cheese;
      private final Boolean heatBread;
      private final Set<Topping> topping;
      private final Set<Source> source;
    
      public Sandwich(Title title, Bread bread) {
        this(title, bread, DEFAULT_CHEESE);
      }
    
      public Sandwich(Title title, Bread bread, Cheese cheese) {
        this(title, bread, cheese, true);
      }
    
      public Sandwich(Title title, Bread bread, Cheese cheese, Boolean heatBread) {
        this(title, bread, cheese, heatBread, DEFAULT_TOPPING_SET);
      }
    
      public Sandwich(Title title, Bread bread, Cheese cheese, Boolean heatBread,
        Set<Topping> topping) {
        this(title, bread, cheese, heatBread, topping,
          DEFAULT_SOURCE_SET);
      }
    
      public Sandwich(Title title, Bread bread, Cheese cheese, Boolean heatBread,
        Set<Topping> topping, Set<Source> source) {
        this.title = title;
        this.bread = bread;
        this.cheese = cheese;
        this.heatBread = heatBread;
        this.topping = topping;
        this.source = source;
      }
    
      ...
    }
    ```

    <br>

- 사용 예시

    ```java
    private static List<Sandwich> makeSandwichesWithTelescopingConstructorPatten() {
      // 점층적 생성자 패턴(telescoping constructor pattern)
      // 샌드위치 생성자 호출
      Sandwich myTurkeySandwich = new Sandwich(Title.TURKEY, Bread.FLAT_BREAD);
      Sandwich yourHamSandwich = new Sandwich(Title.HAM, Bread.WHITE, Cheese.SHRED);
      // 설정을 원하는 optional 변수에 비해 default
      Sandwich ourSandwich = new Sandwich(Title.TURKEY, Bread.WHITE, Cheese.DEFAULT_CHEESE, true,
        Topping.DEFAULT_TOPPING_SET,
        EnumSet.of(Source.SWEET_ONION, Source.HOT_CHILI));
    
      return List.of(myTurkeySandwich, yourHamSandwich, ourSandwich);
    }
    ```

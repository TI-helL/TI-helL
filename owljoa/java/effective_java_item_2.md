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

- `Sandwich` 클래스

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

<br><br>

## 2. JavaBeans Pattern

<br>

### 2.1. 개념

매개변수가 없는 생성자로 객체를 생성하고 Setter 메소드로 원하는 필드를 채워서 객체 생성을 마무리하는 방법

- 장점
  - 점층적 생성자 패턴에 비해 코드를 이해하기 쉽다.
  - 원하는 매개변수만 설정할 수 있다.
- 단점
  - 객체 생성을 위해 여러 개의 메소드를 호출해야한다. (생성자 + 원하는 필드 수만큼)
  - 객체의 일관성을 유지할 수 없다.
    - 점층적 생성자 패턴에서는 생성자에서만 매개변수들의 유효성 확인을 하면 일관성을 유지할 수 있었던 반면에, 자바빈즈 패턴에서는 언제 어디서나 setter 메소드를 호출하여 설정한 필드값을 변경할 수 있기 때문에 일관성을 유지할 수 없다.
      → 객체가 일관성을 유지하지 못한다면, 버그를 발생시키는 코드와 런타임에서 예외가 발생하는 코드가 멀리 떨어져 있는 경우가 많기 때문에 디버그에 어려움을 겪을 수 있다.

<br>

### 2.2. 예시

- `SandwichByJavaBeans` 클래스

  ```java
  ...

  public class SandwichByJavaBeans {

    private Title title; // 필수
    private Bread bread; // 필수
    private Cheese cheese;
    private Boolean heatBread;
    private Set<Topping> topping;
    private Set<Source> source;

    public SandwichByJavaBeans() {
    }

    public void setTitle(Title title) {
      this.title = title;
    }

    public void setBread(Bread bread) {
      this.bread = bread;
    }

    public void setCheese(Cheese cheese) {
      this.cheese = cheese;
    }

    public void setHeatBread(Boolean heatBread) {
      this.heatBread = heatBread;
    }

    public void setTopping(Set<Topping> topping) {
      this.topping = topping;
    }

    public void setSource(Set<Source> source) {
      this.source = source;
    }

  	...
  }
  ```

<br>

- 사용 예시

  ```java
  private static List<SandwichByJavaBeans> makeSandwichesWithJavaBeansPattern() {
    // 자바 빈즈 패턴(Java Beans Pattern)
    // 기본 샌드위치 생성자 호출 후
    // setter 메소드들을를 이용해서 프로퍼티를 채움으로써 객체 생성 완료
    SandwichByJavaBeans myMeatBallSandwich = new SandwichByJavaBeans();
    myMeatBallSandwich.setTitle(Title.MEAT_BALL);
    myMeatBallSandwich.setBread(Bread.HEARTY_ITALIAN);
    myMeatBallSandwich.setCheese(Cheese.MOZZARELLA);
    myMeatBallSandwich.setHeatBread(true);
    myMeatBallSandwich.setTopping(EnumSet.of(Topping.LETTUCE, Topping.TOMATO));
    myMeatBallSandwich.setSource(EnumSet.of(Source.SALT, Source.HOT_CHILI));

    SandwichByJavaBeans yourStakeAndCheeseSandwich = new SandwichByJavaBeans();
    yourStakeAndCheeseSandwich.setTitle(Title.STAKE_AND_CHEESE);
    yourStakeAndCheeseSandwich.setBread(Bread.HONEY_OAT);
    yourStakeAndCheeseSandwich.setCheese(Cheese.SHRED);
    yourStakeAndCheeseSandwich.setHeatBread(true);
    yourStakeAndCheeseSandwich.setTopping(
      EnumSet.of(Topping.LETTUCE, Topping.PICKLE, Topping.JALAPENO, Topping.TOMATO));
    yourStakeAndCheeseSandwich.setSource(
      EnumSet.of(Source.SALT, Source.PEPPER, Source.EXTRA_VIRGIN_OLIVE_OIL));

    return List.of(myMeatBallSandwich, yourStakeAndCheeseSandwich);
  }
  ```

<br><br>

## 3. Builder Pattern

<br>

### 3.1. 개념

생성할 클래스 내에 별도의 빌더 클래스를 두고, 객체의 생성을 클라이언트가 직접하지 않고 빌더에게 위임하는 방법

- 객체 생성 순서
  1. 필요한 객체를 직접 만들지 않고 필수 매개변수만으로 생성자나 정적 팩토리를 호출해서 빌더 객체를 얻어낸다.
  2. 빌더 객체가 제공하는 일종의 setter 메소드들로 원하는 선택 매개변수들을 설정한다.
  3. 빌더 객체의 build 메소드를 호출하여 원하는 객체를 얻어낸다.
- 장점
  - 클라이언트 코드를 작성하거나 읽기 쉽다.
  - 생성 대상 클래스의 불변객체를 반환하기 때문에 일관성을 유지할 수 있다.
- 단점
  - 객체를 만들기 위해 빌더를 만들어야 한다.
  - 점층적 생성자 패턴보다는 코드가 장황해서 매개변수가 4개 이상은 되어야 값어치를 할 수 있다.

<br>

### 3.2. 예시

- `SandwichByBuilder` 클래스

  ```java
  package sandwich;

  import java.util.Set;
  import sandwich.code.Bread;
  import sandwich.code.Cheese;
  import sandwich.code.Source;
  import sandwich.code.Title;
  import sandwich.code.Topping;

  public class SandwichByBuilder {

    private final Title title; // 필수
    private final Bread bread; // 필수
    private final Cheese cheese;
    private final Boolean heatBread;
    private final Set<Topping> topping;
    private final Set<Source> source;

    public static class SandwichBuilder {

      private final Title title; // 필수
      private final Bread bread; // 필수
      private Cheese cheese = Cheese.DEFAULT_CHEESE;
      private Boolean heatBread = true;
      private Set<Topping> topping = Topping.DEFAULT_TOPPING_SET;
      private Set<Source> source = Source.DEFAULT_SOURCE_SET;

      public SandwichBuilder(Title title, Bread bread) {
        this.title = title;
        this.bread = bread;
      }

      public SandwichBuilder cheese(Cheese cheese) {
        this.cheese = cheese;
        return this;
      }

      public SandwichBuilder heatBread(Boolean heatBread) {
        this.heatBread = heatBread;
        return this;
      }

      public SandwichBuilder topping(Set<Topping> topping) {
        this.topping = topping;
        return this;
      }

      public SandwichBuilder source(Set<Source> source) {
        this.source = source;
        return this;
      }

      public SandwichByBuilder build() {
        return new SandwichByBuilder(this);
      }

    }

    public SandwichByBuilder(SandwichBuilder builder) {
      this.title = builder.title;
      this.bread = builder.bread;
      this.cheese = builder.cheese;
      this.heatBread = builder.heatBread;
      this.topping = builder.topping;
      this.source = builder.source;
    }

    @Override
    public String toString() {
      return "Sandwich{" +
        "title=" + title +
        ", bread=" + bread +
        ", cheese=" + cheese +
        ", heatBread=" + heatBread +
        ", topping=" + topping +
        ", source=" + source +
        '}' + "\n";
    }
  }
  ```

<br>

- 사용 예시

  ```java
  private static List<SandwichByBuilder> makeSandwichesWithBuilderPatten() {

    SandwichByBuilder mySandwich = new SandwichBuilder(Title.VEGE, Bread.WHEAT)
      .cheese(Cheese.SHRED)
      .heatBread(true)
      .topping(EnumSet.of(Topping.LETTUCE, Topping.PICKLE, Topping.OLIVE))
      .source(EnumSet.of(Source.HOT_CHILI, Source.SWEET_ONION))
      .build();

    SandwichByBuilder yourSandwich = new SandwichBuilder(Title.STAKE_AND_CHEESE, Bread.FLAT_BREAD)
      .cheese(Cheese.MOZZARELLA)
      .heatBread(false)
      .topping(EnumSet.of(Topping.LETTUCE, Topping.CUCUMBER, Topping.JALAPENO))
      .source(EnumSet.of(Source.HOT_CHILI, Source.PEPPER))
      .build();

    return List.of(mySandwich, yourSandwich);
  }
  ```

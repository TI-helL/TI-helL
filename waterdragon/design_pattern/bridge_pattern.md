# Bridge Pattern

- 두 장소를 연결하는 역할을 하는 디자인 패턴
- 기능의 클래스 게층과 구현의 클래스 계층 사이에 다리를 놓는다는 개념
- impl을 사용해서 기능의 계층과 구현의 계층을 연결한다

## 기능의 클래스 계층

기능의 클래스 계층이란 어떤 클래스 Something이 있다고 가정하고 Something에 새로운 기능(새로운 매소드)를 추가하고 싶을때 보통은 Something의 하위 클래스로 SomethingGood 클래스를 생성함다. SomethingGood 클래스는 기능을 추가하기 위해 만들어진 계층이다.
- 상위 클래스는 기본적인 기능을 가지고 있음
- 하위 클래스에서 새로운 기능을 추가함

이 클래스 계층을 **기능의 클래스 계층**이라고 함

SomethingGood 클래스에 또 다른 기능을 추가하고자 한다면 SomethingGood 클래스의 하위 클래스로 SomethingBetter 클래스를 생성한다.

```
Something  
    ㄴ SomethingGood  
        ㄴ SomethingBetter
```

기능의 클래스 계층은 위와 같이 Hierarchy를 가지고 있으며 목적한 기능을 추가한 새로운 클래스를 만드는 것이 가능하다.

## 구현의 클래스 계층

추상 클래스는 일련의 메소드를 선언하고 인터페이스(API)를 규정한다. 그리고 하위 클래스에서 그 추상 클래스의 메소드를 실제로 구현하고 상위 클래스에서는 추상 메소드로 인터페이스를 규정한다. 이와 같이 상위 클래스와 하위 클래스의 역할 분담에 의해 부품으로의 가치가 높은 클래스를 만들수 있다.  
구현의 클래스 계층의 예로 상위 클래스 ABbstractClass의 추상 메소드를 구현하는 하위 클래스를 ConcreteClass로 하면 다음과 같은 클래스의 계층이 만들어진다.
```
AbstractClass
    ㄴ ConcreteClass
```
그러나 여기에 사용되는 클래스 계층은 기능을 추가하기 위한 것도, 새로운 메소드를 추가하기 위한것도 아니다. 여기서는 역할을 분담하기 위해 클래스 계층이 사용된다.

- 상위 클래스는 추상 메소드에 의해 인터페이스(API)를 **규정**한다.
- 하위 클래스는 추상 메소드에 의해 그 인터페이스(API)를 **구현**한다.

이러한 클래스의 계층을 **구현의 클래스 계층**이라고 한다. 

## 클래스 계층의 혼재와 클래스 계층의 분리

하위 클래스를 구현하려고 할때 다음의 질문을 해볼 필요가 있다.  
**"나는 기능을 추가하려고 하는 것인가? 구현을 수행하려고 하는 것인가?"**  
만약 기능 계층과 클래스 계층이 하나라면 기능과 구현이 혼재하게 되고 이것은 클래스 계층을 복잡하게 하고 예측을 어렵게할 우려가 있다. 자신이 하위 클래스를 만들려고 할때 클래스 계층을 어디에 만들어야 할지 헤맬수 있기 때문이다. 따라서 두 개의 독립된 클래스 계층으로 분리할 필요가 있다. 그러나 단순히 분리만 하면 흩어져버리기 때문에 두 계층 사이에 다리를 놓는 작업이 필요하다. 

## Bridge pattern 예제
### 클래스 목록
|기능 / 구현|이름|설명|
|----------|--|--|
|기능의 클래스 계층|Display|"표시한다"는 클래스|
|기능의 클래스 계층|CountDisplay|"지정 횟수만큼 표시"하는 기능을 추가하는 클래스|
|구현의 클래스 계층|DisplayImpl|"표시한다"는 클래스|
|구현의 클래스 계층|StringDisplayImpl|"문자열을 사용해서 표시한다"는 클래스|
||Main|테스트용 클래스|

#### Dispaly Class

- 추상적인 무언가를 표시하는것
- 기능의 클래스 계층의 꼭대기 클래스

```JAVA
public class Display{
    private DisplayImpl impl;
    public Display(DisplayImpl impl){
        this.impl = impl;
    }
    public void open(){
        impl.rawOpen();
    }
    public void print(){
        impl.rawPrint();
    }
    public void close(){
        impl.rawClose();
    }
    public final void display(){
        open();
        print();
        close();
    }
}
```

#### CountDisplay Class

- 기능의 클래스 계층 꼭대기인 Display Class에 기능을 추가한 것
- Display Class에는 "표시한다"라는 기능밖에는 없지만 CountDisplay Class에는 "지정 횟수만큰 표시한다"라는 기능이 추가됨

```java
public class CountDisplay extends Display{
    public CountDisplay(DisplayImpl impl){
        super(impl);
    }
    public void multiDisplay(int times){ //지정된 횟수 만큼 표시한다.
        open();
        for(int i = 0; i<times; i++){
            print();
        }
        close();
    }
}
```

#### DisplayImpl Class

- 여기서부터 구현의 클래스 계층
- DisplayImple은 구현의 클래스 계층의 꼭대기
- rawOpen, rawPrint, rawClose는 Display 클래스의 open, print, close에 대응하며 각각 전처리, 표시, 후처리를 실행

```java
public abstract class DisplayImpl {
    public abstract void rawOpen();
    public abstract void rawPrint();
    public abstract void rawClose();
}
```

#### StringDisplayImpl Class

- 진정한 구현단계의 클래스
- StringDisplayImpl 클래스는 DisplayImpl 클래스의 하위 클래스로써 rawOpen, rawPring, rawClose 메소드를 사용해서 표시를 실행함
  
```java
public class StringDisplayImpl extends DisplayImpl {
    private String string;
    private int width;
    public StringDisplayImpl(String string){
        this.string = string;
        this.width = string.getBytes().length;
    }
    public void rawOpen(){
        printLine();
    }
    public void rawPrint(){
        System.out.println("|" + string + "|");
    }
    public void rawClose(){
        printLine();
    }
    public void printLine(){
        System.out.print("*");
        for(int i = 0; i< width; i++){
            System.out.print("-");
        }
        System.out.println("*");
    }
}
```


#### Main Class

- 테스트용 클래스

```java
public class Main{
    public static void main(String[] args){
        Display d1 = new Display(new StringDisPlayImpl("hello, korea"));
        Display d2 = new CountDisplay(new StringDisplayImpl("hello, world"));
        CountDisplay d3 = new CountDisplay(new StringDisplayImpl("hello, universe"));

        d1.display();
        d2.display();
        d3.display();
        d3.multiDisplay(5);
    }
}
```

<img src="https://user-images.githubusercontent.com/24540286/132331299-40c9ea4a-bcec-48af-9e29-a57699a3fea1.png" width=140/>

### Bridge 패턴의 등장인물

#### Abstraction(추상화)
- "기능의 클래스 계층"의 최상위 클래스
- 예제에서의 Display Class

#### Refined Abstraction(개선된 추상화)
- Abstraction에 대해 기능을 추가
- 예제에서의 CountDisplay Class

#### Implementer(구현자)
- "구현의 클래스 계층"의 최상위 클래스
- Abstraction의 인터페이스(API)를 구현하기 위한 메소드를 규정하는 역할
- 예제에서의 DisplayImpl

#### Concrete Implementor(구체적인 구현자)
- Implementor의 인터페이스를 구체적으로 구현
- 예제에서의 StringDisplayImpl

### Bridge Pattern Detail
Bridge 패턴의 특징은 '기능의 클래스 계층'과 '구현의 클래스 계층'을 분리하는 것이다. 이 두개의 클래스 계층을 분리하면 각각의 클래스 계층을 독립적으로 확장할 수 있다. 기능을 추가하고 싶으면 기능의 클래스 계층을 추가한다. 이때 구현의 클래스 계층은 전혀 수정할 필요가 없다. **새로 추가한 모든 기능은 "모든 구현"에서 이용할 수 있다.**

### 상속과 위임
상속은 견고한 연결이고 위임은 느슨한 연결이다. 상속은 클래스를 확장하기 위해 편리한 방법이지만 클래스간의 연결을 강하게 고정시킨다. 

```java
class SomethingGood extends Something{
    ...
}
```
위 관계는 소스코드를 고쳐 쓰지 않는한 바꿀 수 없는 아주 견고한 연결이다. 프로그램의 필요에 따라 클래스 간의 관계를 바꾸고 싶을 때 상속을 사용하는것은 바람직한 방법이 절대 아니다. 이와 같은 경우에는 상속이 아니라 ***위임***을 사용해야 한다. 
예제 프로그램에서 Display 클래스 내에서 위임이 사용되고 있다. Display 클래스의 impl 필드에는 구현되는 인스턴스가 저장되어 있기 때문에 

- open을 실행할 때에는 impl.rawOpen()을 호출
- print를 실행할 때에는 impl.rawPrint()를 호출
- close를 실행할 때에는 impl.rawClose()를 호출

이런 식으로 떠넘기기를 하고 있다. 이러한 떠넘기기가 바로 위임이다. 
예제 프로그램에서는 Main 클래스 내에서 Display나 CountDisplay의 인스턴스를 만들고 그 때 StringDisplayImpl의 인스턴스를 인수에게 전달한다. 만약 StringDisplayImpl 클래스 이외의 ConcreteImplementor 역할이 있다고 가정하고 그 인스턴스를 Display나 CountDisplay에게 전달하면 그것으로 구현이 확실히 교체된다. 이 교체를 수행할때 수정이 필요한 곳은 Main 하나뿐이다.









  

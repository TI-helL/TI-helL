# Observer Pattern

**상태의 변화를 알려주기!!** Observer는 관찰자라는 의미를 가진다. Observer 패턴에서는 관찰 대상의 상태가 변화하면 관찰자에게 알려준다. Observer 패턴은 상태변화에 따른 처리를 기술할 때 효과적이다.

## 예제 프로그램
|이름|설명|
|---|--|
|Observer|관찰자를 나타내는 인터페이스|
|NumberGenerator|수를 생성하는 클래스|
|RandomNumberGenerator|랜덤으로 수를 생성하는 클래스|
|DigitObserver|숫자로 수를 표시하는 클래스|
|GraphObserver|간이 그래프로 수를 표시하는 클래스|
|Main|동작 테스트용 클래스|

### Oberver Interface
이 예제에서 사용하는 Observer는 예제 프로그램용으로 java.util.Observer와는 다른 동작을 한다.  
update 메소드는 수를 생성하는 NumberGenerator 클래스에서 호출된다. update 메소드는 '나의 내용이 갱신되었으니 표시쪽도 갱신해달라'라고 Observer에게 전달하기 위한 메소드이다.

```java
public interface Observer{
    public abstract void update(NumberGenerator generator);
}
```

### NumberGenerator class
NumberGenerator 클래스는 수를 생성하는 추상 클래스이다. 실제의 수를 생성하는 부분(execute 메소드)과 수를 취득하는 부분(getNumber 메소드)은 하위 클래스에서 구현한다.  
Observer 필드는 NumberGenerator를 관찰하는 Observer를 보존하는 필드이다.  
notifyObservers 메소드는 모든 Observer에 대해서 '나의 내용이 갱신되었으니 표시를 갱신해달라'라고 전달한다. 이 메소드 안에서 모든 Observer의 update 메소드를 호출한다.

```java
import java.util.ArrayList;
import java.uitl.Iterator;

public abstract class NumberGenertor{
    private ArrayList observers = new ArrayList();
    public void addObserver(Observer observer){
        observers.add(observer);
    }
    public void deleteObserver(Observer observer){
        observers.remove(observer);
    }
    public void notifyObservers(){
        Iterator it = observers.iterator();
        while(it.hasNext()){
            Observer o = (Observer)it.next();
            o.update(this);
        }
    }
    public abstract int getNumber();
    public abstract void execute();
}
```

### RandomNumberGenerator class
RandomNumberGenerator 클래스는 나수를 20개 생성하고 그때마다 notifyObservers를 사용해서 Observer에게 통보한다.
```java
import java.util.Random;
public class RandomNumberGenerator extends NumberGenerator{
    private Random random = new Random();
    private int number;
    public int getNumber(){
        return number;
    }
    public void execute(){
        for(int i = 0; i< 20; i++){
            number = random.nextInt(50);
            notifyObservers();
        }
    }
}
```

### DigitObserver class
DigitObserver 클래스는 Observer 인터페이스를 구현하는 클래스로 관찰한 수를 숫자로 표시한다. update 메소드 안에서 인수로 주어진 NumberGenerator의 getNumber 메소드르 사용해서 수를 취득하고 표시한다. 또한 Thread.sleep을 사용해서 표시되는 모습을 관찰할 수 있도록 한다.

```java
public class DigitObserver implements Observer{
    public void update(NumberGenerator generator){
        System.out.println("DigitNumber : " + generator.getNumber());
        try{
            Thread.sleep(100);
        }catch(InterruptedException e){
            e.printStackTrace();
        }
    }
}
```

### GraphObserver class
GraphObserver 클래스는 관찰한 수를 간이 그래프로 표시한다.

```java
public class GraphObserver implements Observer{
    public void update(NumberGenerator generator0){
        System.out.print("GraphObserver:");
        int count = generator.getNumber();
        for(int i = 0; i<count; i++){
            System.out.print("*");
        }
        System.out.println();
        try{
            Thread.sleep(100);
        }catch(InterruptedException e){
            e.printStackTrace();
        }
    }
}
```

### Main class
동작 테스트용 Main 클래스에서는 RandomNumberGenerator의 인스턴스를 한개 만들고 그 관찰자를 두개 생성한다. observer1은 DigitObserver, observer2는 GraphObserver의 인스터스이다. addObserver를 사용해서 Observer를 등록한 후 generator.execute를 사용해서 수를 생성한다.

```java
public class Main{
    public static void main(String[] args){
        NumberGenerator generator = new RandomNumberGenerator();
        Observer observer1 = new DigitObserver();
        Observer observer2 = new GraphObserver();
        generator.addObserver(observer1);
        generator.addObserver(observer2);
        generator.execute();
    }
}
```

### 실행 결과
<img src="https://user-images.githubusercontent.com/24540286/132610722-97de9bc1-1900-4bdf-a23b-8452147afce0.png" width=50%>


## Observer 패턴의 역할

### Subject(관찰 대상자)의 역할
Subject는 '관찰되는 대상'을 나타낸다. Subject 역할은 관찰자인 Observer 역할을 등록하는 메소드와 삭제하는 메소드를 가지고 있다. 예제 프로그램에서 NumberGenerator가 이 역할을 수행한다.

### ConcreteSubject (구체적인 관찰 대상자)의 역할
ConcreteSubject 는 구체적으로 '관찰되는 대상'을 표현한다. 상태가 변화하면 등록되어 있는 Observer에게 전달한다. 예제 프로그램에서 RandomNumberGenerator가 이 역할을 수행한다.

### Observer(관찰자)의 역할
Observer는 Subject로부터 '상태가 변했다'라고 전달받는 역할을 한다. 이를 위한 메소드는 update이며 예제 프로그램에서 Observer 인터페이스가 이 역할을 수행한다.

### ConcreteObserver(구체적인 관찰자)의 역할
ConcreteObserver는 Observer의 구현체로 update 메소드가 호출되면 그 메소드 안에서 Subject의 현재 상태를 취득한다. 예제 프로그램에서 DigitObserver와 GraphObserver가 이 역할을 수행한다.

## 교환의 가능성
디자인 패턴의 목적 중의 하나는 클래스를 재이용 가능한 **부품**으로 만드는 것이다. Observer 패턴에서는 상태를 가지고 있는 ConcreteSubject와 상태변화를 전달 받는 ConcreteObserver가 존재한다. 그리고 이 두가지를 연결하는것이 인터페이스인 Subject와 Observer이다.  
RandomNumberGenerator 클래스는 현재 자신을 관찰하고 있는 것이 DigitOberver인지 GraphObserver인지 몰라도 상관없다. 그러나 그 observer들이 Observer 인터페이스를 구현하고 있다는 것은 확실히 알고 있다.  
또한 DigitObserver 클래스는 자신이 관찰하고 있는 것이 RandomNumberGenerator인지 다른 XXXNumberGenerator인지 신경 쓰지 않는다. 단지 NumberGenerator의 하위 클래스이고 getNumber 메소드를 가지고 있다는 것은 확실히 알고 있다.  
이러한 구현 방식은 디자인 패턴에서 자주 사용된다.
- 추상 클래스나 인터페이스를 사용해서 구상 클래스로부터 추상 메소드를 분리한다.
- 인수로 인스턴스를 전달할 때, 필드에서 인스터스를 저장할 때에는 구상 클래스의 형태로 하지않고 추상 클래스나 인터페이스의 형태로 한다.
  
이와 같이 구현하면 구상 클래스의 부분을 쉽게 교환할 수 있다.

## Observer의 순서
Subject에는 복수개의 Observer가 등록되어 있다. 예제 프로그램의 경우 notifyObservers 메소드에서는 먼저 등록한 Observer의 메소드가 먼저 호출된다. Observer 패턴을 설계할 경우에는 update 메소드가 호출되는 순서가 변해도 문제가 일어나서는 안된다. 원래 각 클래스의 톡립성이 보장되면 의존성의 혼랑은 발생하지 않는다. 그러나 다음같은 상황에서는 주의해야 한다.  

-  Observer의 행위가 Subject에 영향을 미칠때

예제 프로그램에서는 RandomNumberGenerator가 자신 안에서 데이터를 생성하고 update 메소드를 호출한다. 그러나 Subject가 update 메소드를 호출할때 Observer가 호출을 요청하는 경우도 있다. 이럴 경우 다음과 같은 루프가 발생할 수 있다.
> Subject의 상태 변화 -> Observer에게 전달 -> Observer가 Subject의 메소드를 호출 -> 이것에 의해 Subject의 상태가 변화 -> Observer에게 전달.....

## '관찰'하기보단 '전달'받길 기다린다
observer는 '관찰자'라는 의미이지만 실제로 Observer 패턴은 Subject로부터 상태 변화를 전달받는 것을 수동적으로 기다리고 있다. 이러한 패턴은 **Publish-Subscribe** 패턴이라고 한다. 

## Model/View/Controller MVC
MVC 안의 Model과 View의 관계는 Observer 패턴의 Subject와 Observer 역할에 대응한다. Model은 '표시 형식에 의존하지 않는 내부 모델'을 조작하는 부분이고 View는 Model이 '어떻게 보일 것인지'를 관리하는 부분이다. 일반적으로 하나의 Model에 여러개의 View가 대응한다. 
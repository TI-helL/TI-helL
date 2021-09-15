# Memento Pattern
현재의 상태를 저장하자! 텍스트 에디터를 사용할 때, 'undo' 기능을 사용하면 전의 상태롤 텍스트를 복원할 수 있다.  
<br>
Object 지향의 프로그램에서 undo 기능을 실행하려면 인스턴스가 가지고 잇는 정보를 저장해 둘 필요가 있다. 단 저장만 해서는 쓸모가 없고 저장한 정보로부터 인스턴스를 원래의 상태로 되돌릴 수 있어야 한다. 
인스턴스를 복원하기 위해서는 인스턴스 내부의 정보를 자유롭게 액세스 할 수 있어야 한다. 그러나 원하지 않는 액세스를 허용하면 클래스 내부 구조에 의존한 코드가 프로그램의 여기저기로 흩어져 클래스의 수정을 어렵게 한다. 이것을 **캡슐화의 파괴**라고 한다.  
<br>
Memento Pattern은 인스턴스의 상태를 나타내는 역할을 도입해서 캡슐화의 파괴에 빠지지 않고 저장과 복원을 실행한다.  
<br>
Memento Pattern을 사용하면
- undo
- redo
- history
- snapshot

등의 기능을 사용할 수 있다. 

## 예제 프로그램
Memento Pattern을 구현할 때 사용할 예제프로그램은 '과일을 모으는 주사위 게임'이며 규칙은 간단하다.

- 이 게임은 자동적으로 진행된다
- 게임의 주인공은 주사위를 던져 나온 수가 다음의 상태를 결정한다
- 좋은 수가 나오면 주인공의 돈이 증가한다
- 나쁜 수가 나오면 주인공의 돈이 감소한다
- 특별히 좋은 수가 나오면 주인공이 과일을 받는다
- 돈이 없어지면 종료한다
  
|패키지|이름|설명|
|---|---|--|
|game|Memento|Gamer의 상태를 나타내는 클래스|
|game|Gamer|게임을 실행하는 주인공의 클래스, Memento의 인스턴스를 만든다.|
|Anonymous|Main|게임을 진행시키는 클래스, Memento의 인스턴스를 저장해 두고, 필요에 따라서 Gamer의 상태를 복원한다.|

### Memento Class
주인공(Gamer)의 상태를 표현하는 클래스이다. Memento 클래스는 money와 fruits를 필드로 가진다. 이 두개의 필드가 private가 아닌 이유는 동일한 패키지 내의 Gamer 클래스로부터 필드에 자유롭게 액세스 할 수 있도록 하기 위함이다.  

```java
package Memento.game;

import java.util.ArrayList;
import java.util.List;

public class Memento {

  int money;
  ArrayList fruits;

  public int getMoney() {       //narrow interface
    return money;
  }

  Memento(int money) {          //wide interface
    this.money = money;
    this.fruits = new ArrayList();
  }

  void addFruit(String fruit) { //wide interface
    fruits.add(fruit);
  }

  List getFruits() {            //wide interface
    return (List) fruits.clone();
  }
}
```

Memento class는 public이 없다. 따라서 누구나 인스턴스를 만들 수 있는 것이 아니고 동일한 패키지(여기서는 game)에 속해 있는 클래스에서만 사용할 수 있다. 구체적으로는 Memento 클래스의 인스턴스는 game 패키지의 Gamer 클래스가 생성한다.  
<br>
addFruit 메소드는 과일을 추가하는 메소드인에 이 또한 public이 아니다. 따라서 **game 패키지의 외부에서는 Memento의 내부를 변경할 수 없다**

### Gamer Class
Gamer class는 게임을 실행하는 주인공을 표현하는 클래스이다. 
소지금(money)와 과일(fruit)과 난수발생기(random)을 가지고 있다. 또한 클래스 필드로 과일의 이름(fruitName)을 가지고 있다.  
<br>
게임의 중심이 되는 메소드는 bet 메소드 이다. 이 메소드는 주이공이 파산하지 않는한 주사위를 던져 나온 수에 따라 소지금이나 과일의 개수를 변화시킨다.  

```java
package Memento.game;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

public class Gamer {

  private int money;
  private List fruits = new ArrayList();
  private Random random = new Random();
  private static String[] fruitsName = {
      "사과", "포도", "바나나", "귤"
  };

  public Gamer(int money) {
    this.money = money;
  }

  public int getMoney() {
    return money;
  }

  public void bet() {
    int dice = random.nextInt(6) + 1;
    if (dice == 1) {
      money += 100;
      System.out.println("소지금이 증가했습니다.");
    } else if (dice == 2) {
      money /= 2;
      System.out.println("소지금이 절반이 되었습니다.");
    } else if (dice == 3) {
      String f = getFruit();
      System.out.println("과일(" + f + ")을 받았습니다.");
      fruits.add(f);
    } else {
      System.out.println("변한것이 없습니다.");
    }
  }

  public Memento createMemento() {
    Memento m = new Memento(money);
    Iterator it = fruits.iterator();
    while (it.hasNext()) {
      String f = (String) it.next();
      if (f.startsWith("맛있는 ")) {
        m.addFruit(f);
      }
    }
    return m;
  }

  public void restoreMemento(Memento memento) {
    this.money = memento.money;
    this.fruits = memento.getFruits();
  }

  @Override
  public String toString() {
    return "Gamer{" +
        "money=" + money +
        ", fruits=" + fruits +
        '}';
  }

  private String getFruit() {
    String prefix = " ";
    if (random.nextBoolean()) {
      prefix = "맛있는 ";
    }
    return prefix + fruitsName[random.nextInt(fruitsName.length)];
  }
}

```

createMemento는 현재의 상태를 저장하는(스냅샷을 찍는) 메소드이다. createMemento 메소드에서는 Memento의 작성을 수행한다. 여기에서는 현 시점에서의 소지금과 과일을 기초로 Memento의 인스턴스를 한 개 만들고 있다. 이렇게 만들어진 Memento 인스턴스는 '현재 Gamer 인스턴스의 상태'를 표현한다. 이것이 createMemento 메소드의 반환값이다. 과일에 대해서는 맛있는 것만 저장한다.  
<br>
restoreMemento는 createMemento와 반대로 undo를 실행하는 메소드이다. 제공된 Memento 인스턴스를 기초로 자신의 상태를 복원한다.

### Main Class
Main 클래스에서는 Gamer의 인스턴스를 작성하고 그것을 사용해서 게임을 진행한다. Gamer의 bet 메소드를 반복해서 호출하고 그때마다 소지금을 표시한다. 여기서 Memento 패턴을 도입한다.
<br>
변수 memento에는 '어떤 시점의 Gamer의 상태'가 저장되어 있다. 운 좋게 소지금이 증가하면 createMemento를 사용해서 현재의 상태를 저장한다.
<br>
소지금이 부족하게 되면 restoreMemento 메소드에게 이 memento를 제공해서 소지금을 원래의 상태로 되돌린다. 

```java
package Memento.Anonymous;

import Memento.game.Gamer;
import Memento.game.Memento;

public class Main {

  public static void main(String[] args) {
    Gamer gamer = new Gamer(100);
    Memento memento = gamer.createMemento();
    for(int i = 0; i< 100; i++){
      System.out.println("==== " + i);
      System.out.println("현상 : " + gamer);

      gamer.bet();

      System.out.println("소지금은 " + gamer.getMoney());

      if(gamer.getMoney() > memento.getMoney()){
        System.out.println("(많이 증가했으므로 현재의 상태를 저장하자)");
        memento = gamer.createMemento();
      } else if(gamer.getMoney() < memento.getMoney() / 2){
        System.out.println("(많이 감소했으므로 이전의 상태로 복원하자)");
        gamer.restoreMemento(memento);
      }

      try{// 시간 기다림
        Thread.sleep(1000);
      }catch (InterruptedException e){
        e.printStackTrace();
      }
      System.out.println(" ");
    }
  }
}
```

### 실행 화면
<img src="https://user-images.githubusercontent.com/24540286/133382929-aa27a8f2-19bd-4a86-ac22-d555a523527c.png" width=50%>


## Memento Pattern의 등장인물

### Originator(작성자)
Originator 역할은 자신의 현재 상태를 저장하고 싶을때 Memento 역할을 만든다. Originator 역할을 이전의 Memento 역할을 전달 받으면 그 Memento 역할을 만든 시점의 상태로 되돌리는 처리를 실행한다. 예제에서는 Gamer 클래스가 이 역할을 수행한다.

### Memento(기념품)
Memento 역할은 Originator 역할의 내부 정보를 정리한다. Memento는 Originator의 내부 정보를 가지고 있지만 그 누구에게도 정보를 공개하지 않는다.  
<br>
Memento 역할을 다음 두 종류의 인터페이스를 가지고 있다.
- wide interface - 넓은 인터페이스(API)  
  넓은 인터페이스는 오브젝트의 상태를 원래의 상태로 돌리기 위해 필요한 정보를 모두 얻을 수 있는 메소드의 집합니다. 

- narrow interface - 좁은 인터페이스(API)
  좁은 인터페이스는 외부의 caretaker 역할에게 보여주는 것이다. 좁은 인터페이스로 할수 있는 일에는 한계가 있고 내부 상태가 외부에 공개되는 것을 방지한다. 

이 두가지의 인터페이스를 구별해서 사용하면 오브젝트의 캡슐화가 파괴되는 것을 방지할 수 있다. 예제에서 Memento가 이 역할을 수행한다.

### Caretaker(관리인)
Caretaker 역할은 현재의 Originator 역할의 상태를 저장하고 싶을 때, 그것을 Originator 역할에게 전달한다. Originator는 그것을 받아서 Memento 역할을 만들어 Caretaker에게 전달한다. 예제에서는 Main 클래스가 이 역할을 수행한다. 
<br>
Caretaker는 좁은 인터페이스만 사용할 수 있으므로 Memento 내부 정보에 액세스 할 수 없다.
<br>
Originator 역할과 Memento 역할은 강하게 연결되어 있지만 Caretaker 역할과 Memento 역할은 유연하게 연결되어 있다. Memento 역할은 Caretaker에 대해 정보은폐를 수행하고 있다. 

## 두 개의 인터페이스와 액세스 제어
Memento 클래스에서는 getMoney 메소드에만 public을 붙여서 좁은 인터페이스로 하고 있다. 이 메소드는 Main 클래스에서도 사용할 수 있다.  
여기에서의 좁다라는 의미는 '내부 상태를 조작할 수 있는 정도가 적다'라는 의미히다. Memento 클래스에서 public이 붙어 있는 것은 getMoney 하나 뿐이다. 즉 할 수 있는 일은 소지금을 얻는 일 뿐이다.  
<br>
Main 클래스가 할 수 있는 것은 getMoney로 소지금을 얻는 것과 Memento 의 인스턴스를 변수에 저장하는 것 뿐이다. Main 안에서는 Memento의 생성자도 보이지 않는다. 생성자가 보이지 않는다는 것은 Main 클래스 안에서 Memento의 인스턴스를 만들 수 없다는 뜻이다. Main 클래스는 Memento의 인스턴스가 필요할 때 createMemento 메소드를 호출해서 '현재의 상태를 저장하고 싶으니까 Memento의 인스턴스를 만들어 달라고 Gamer에게 부탁해야 한다.  
<br>
이와 같이 액세스 제어를 이용하면 <b>'이 클래스에서 이 메소드는 보이지만 저 클래스에서는 보이지 않는다'</b>라는 것을 프로그램에서 표현할 수 있다.

## Memento를 몇 개 가질까?
Main 클래스에서 배열등을 이용하면 Memento의 인스턴스를 여러개 갖게 구현할 수도 있다.

## Caretaker과 Originator을 분리하는 이유
Caretaker는 어느 시점에서 스냅샷을 찍을지 결정하고, 언제 undo를 할지 결정하는 Memento를 저장한다. 한편 Originator는 Memento를 만드는 일과 제공된 Memento 역할을 사용해서 자신의 상태를 원래 상태로 될리는 일을 수행한다. 이와 같이 역할을 분담하면

- 여러 단계의 undo를 실행하도록 변경하고 싶다
- undo 기능 뿐만 아니라 현재의 상태를 파일에 저장하고 싶다

라는 수정을 할때도 Originator를 변경할 필요가 없다. 





























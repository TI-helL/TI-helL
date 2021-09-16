# Proxy Pattern
proxy는 대리인이라는 뜻이다(delegator 아님!!). 객체 지향에서는 '본인'도 '대리인'도 객체로 만들수가 있다. 바빠서 일을 할 수 없는 본인 객체 대신 대리인 객체가 어느정도 일을 처리하게 할 수 있다.

# 예제 프로그램
**이름있는 프린터** 라는 예제 프로그램을 구현해보자. Main 클래스는 printerProxy 클래스의 인스턴스(대리인)을 생성한다. 그 인스턴스에 'Alice'라는 이름을 붙이고 그 이름을 표시한다. 그 후 'bob'이라는 이름으로 변경해서 그 이름을 표시한다. 이름의 설정과 취득 부분에서는 PrinterProxy가 대리로 실행한다. 마지막에 print 메소드를 호출해서 **실제로 프린터를 실행하는 단계가 되어서야 printerProxy클래스는 Printer 클래스의 인스턴스를 생성한다.**
<br><br>

예제 프로그램에서는 Printer의 인스턴스 생성에 많은 시간이 걸린다는 것을 전제로 한다. 시간이 걸린다는 것을 표현하기 위해서 생성자로부터 heavyJob 메소드를 호출해서 일부러 '무거운일'을 실행한다.

<br>

|이름|설명|
|---|---|
|Printer|이름있는 프린터를 나타내는 클래스(본인)|
|Printable|Printer와 PrinterProxy의 공통 인스턴스|
|PrinterProxy|이름있는 프린터를 나타내는 클래스(대리인)|
|Main|동작 테스트용 클래스|

### Printable Interface

Printable 인터페이스는 PrinterProxy 클래스와 Printer 클래스를 동일시 하기 위한 것이다. 

```java
package Proxy;

public interface Printable {
  public abstract void setPrinterName(String name);
  public abstract String getPrinterName();
  public abstract void print(String string);
}
```

### Printer Class
Printer 클래스는 '본인'을 표시하는 클래스이다. 생성자에서는 인스턴스 생성에 시간이 걸린다는 것을 표현하기 위해 heavyJob 메소드를 실행한다. 
 
 ```java
package Proxy;

public class Printer implements Printable {

  private String name;

  public Printer() {
    heavyJob("printer의 인스턴스를 생성중");
  }

  public Printer(String name){
    this.name = name;
    heavyJob("Printer의 인스턴스 ( " + name + ")을 생성중");
  }

  @Override
  public void setPrinterName(String name) {
    this.name = name;
  }

  @Override
  public String getPrinterName() {
    return name;
  }

  @Override
  public void print(String string) {
    System.out.println("===" + name + "===");
    System.out.println(string);
  }

  private void heavyJob(String msg) {
    System.out.print(msg);
    for (int i = 0; i < 5; i++) {
      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      System.out.print(".");
    }
    System.out.println("완료");
  }
}
 ```

 ### PrinterProxy Class
 PrinterProxy는 대리인의 역할을 수행하며 Printable 인터페이스를 구현한다. name에는 이름을 지정하고 real 필드에는 대리인이 아닌 '본인'을 저장한다. 생성자에서는 이름을 설정하는데 이 시점에서 '본인'은 아직 만들어지지 않는다.  

```java
package Proxy;

public class PrinterProxy implements Printable {

  private String name;
  private Printer real;

  public PrinterProxy() {

  }

  public PrinterProxy(String name) {
    this.name = name;
  }

  public synchronized void setPrinterName(String name) {
    if (real != null) {
      real.setPrinterName(name);
    }
    this.name = name;
  }

  @Override
  public String getPrinterName() {
    return name;
  }

  @Override
  public void print(String string) {
    realize();
    real.print(string);
  }

  private synchronized void realize() {
    if (real == null) {
      real = new Printer(name);
    }
  }
}

```

setPrinterName 메소드는 새로운 이름을 설정한다. 만약에 real이 null이 아니면('본인'이 이미 만들어져 있으면), 본인에 대해서도 그 이름을 설정하다. 그러나 real이 null이면('본인'이 만들어져 있지 않으면) PrinterProxy의 name만 설정한다. getPrinterName 메소드는 PrinterProxy의 name만 반환할 뿐이다. printer 메소드는 PrinterProxy가 할수 있는 일의 범위를 넘어서기 때문에 realize 메소드를 호출해서 본인을 생성하고 본인의 printer 메소드를 호출한다. 이것은 '위임'이다.  

**setPrinterName과 getPrinterName을 여러번 호출해도 Printer의 인스턴스는 생성되지 않는다.**  

중요한 포인트는 **Printer 클래스는 PrinterProxy의 존재를 모른다**는 점이다. 자신이 PrinterProxy를 경유해서 호출되고 있는지 직접 호출되고 있는지 Printer 클래스는 모른다. 

### Main Class
Main 클래스는 PrinterProxy를 경유해서 Printer 클래스를 이용한다. Main 클래스에서 이름의 설정과 표시를 하는 동안에는 Printer의 인스턴스가 생성되지 않고 Print 메소드를 호출한 후에 생성된다.

```java
package Proxy;

public class Main {

  public static void main(String[] args) {
    Printable p = new PrinterProxy("Alice");
    System.out.println("이름은 현재 " + p.getPrinterName() + "입니다.");
    p.setPrinterName("bob");
    System.out.println("이름은 현재 " + p.getPrinterName() + "입니다.");
    p.print("Hello world");
  }

}
```

### 실행 결과
<img src="https://user-images.githubusercontent.com/24540286/133540717-0ce6cefb-520e-4930-b73a-d044b0441b5e.png" width=50%>

## Proxy Pattern의 등장인물

### Subject(주체) 역할
Proxy 역할과 RealSubject 역할을 동일시 하기 위한 인터페이스이다. Subject가 있는 덕분에 Client 역할은 Proxy 역할과 RealSubject 역할의 차이를 의식할 필요가 없다. 예제 프로그램에서는 Printable 인터페이스가 이 역할을 한다. 

### Proxy(대리인) 역할
Proxy 역할을 Client의 요구를 Proxy가 처리할 수 있는 만큼 처리하다가 Proxy가 처리할 수 없으면 RealSubject 역할에게 처리를 맡긴다. Proxy는 RealSubject가 필요해지면 그때 RealSubject를 생성한다. 예제에서는 PrinterProxy가 이 역할을 수행한다.

### RealSubject(본인)의 역할
Proxy에서 처리할수 없는 일이 발생했을때 동작하는 것이 RealSubject이다. 예제에서 Printer 클래스가 이 역할을 한다.

### Client의 역할
예제프로그램에서의 Main 클래스

## Proxy를 사용해서 속도 올리기
예제 프로그램에서는 Proxy를 사용해서 실제로 print할 때 까지의 무거운 처리(인스턴스 생성)을 지연시킬 수 있었다.  
<br>
예제 프로그램에서는 간략하게 구현됐기 때문에 별로 도움이 되지 않는다만 초기화에 시간이 걸리는 대규모 시스템을 생각해보자. 기동 시점에서 이용하지 않는 기능까지 전부 초기화를 하면 애플리케이션의 기동에 시간이 많이 걸린다. 따라서 실제로 그 기능을 사용할 단계가 됐을때 초기화를 하는것이 바람직하다.

## 대리인과 본인을 분리할 필요가 있는가?
PrinterProxy 클래스와 Printer 클래스를 분리하지 않고 Printer 클래스 안에 처음부터 인스턴스 지연생성 기능을 넣을 수도 있다. 그러나 Proxy 역할과 RealSubject 역할을 분리하면 개별적으로 수정을 할 수가 있다(분할해서 통치하라)  
<br>
PrinterProxy 클래스의 구현을 바꾸면 Printable에 있는 메소드 중에서 무엇을 대리인이 처리하고 무엇을 본인이 처리할 것인지 변경이 가능하다. 또한 PrinterProxy의 수정을 마무리해도 Printer 클래스는 수정할 필요가 전혀 없다. 

## 투과적이란?
PrinterProxy 클래스와 Printer 클래스는 같은 Printable 인터페이스를 구현한다. Main에서 PrinterProxy를 호출하던 Printer를 호출하던 PrinterProxy를 통해서 Printer를 호출하던 문제없이 사용할 수 있다. 이런경우 PrinterProxy는 **투과적**이라고 한다.

## PrinterProxy 클래스의 메소드를 synchronized로 구현하는 이유
synchronized로 구현하지 않을 경우 복수의 스레드로부터 setPrinterName과 realize가 개별적으로 호출된다. 이럴 경우 PrinterProxy 클래스의 name과 Printer 클래스의 name의 차이가 발생할 수 있다.  
<br>
synchronized로 구현하지 않고 최초에 PrinterProxy의 name 필드 값이 "alice"이고 real의 필드 값이 null(Printer의 인스턴스는 아직 생성되지 않음)이라고 가정한다. 그리고 스레드 A와 B가 실행된다고 가정하면 스레드 A가 setPrinterName("bob")을 실행함과 동시에 스레드 B가 (print 메소드 경유로) realize 메소드를 호출하면 PrinterProxy 클래스의 name은 bob이 되지만 Printer의 name은 "alice"가 되고 만다.
# Chain of Responsibility Pattern
책임 떠넘기기! 예를 들어 어떤 서류를 받으러 회사에 갔다고 가정했을 때 회사의 안내 센터에 물어보았더니 영업부로 영업부에서는 고객관리부로 고객관리부에서는 총무부로 떠넘기는 경우가 있다. 책임 떠넘기기라는 단어는 부정적인 이미지가 있지만 프로그래밍에서는 때때로 책임 떠넘기기가 필요할 때가 있다. 어떤 요청이 발생했을 때 여러개의 객체를 chain 처럼 연결해두면 그 객체를 차례로 돌아다니면서 요청을 처리하는 경우를 생각할수 있다.  

## 예제 프로그램

예제에서 사용할 클래스들

|이름|설명|
|---|--|
|Trouble|발생한 트러블을 나타내는 클래스, 트러블 번호(number)를 가지고 있음|
|Support|트러블을 해결하는 추상 클래스|
|NoSupport|처리할 수 없는 트래블|
|LimitSupport|지정한 번호 미만의 트러블을 해결하는 클래스|
|OddSupport|홀수 번호의 트러블만 해결하는 클래스|
|SpecialSupport|특정번호의 트러블을 해결하는 클래스|
|Main|Support들의 chain을 만들고 트러블을 발생키시틑 동작 테스트용 클래스|

### Trouble Class

발생한 트러블을 표현하는 클래스

```java
public class Trouble {
    private int number;         //트러블 번호
    public Trouble(int number){ //트러블의 생성
        this.number = number;
    }
    public int getNumber(){     //트러블 번호를 얻는다.
        return this.number;
    }
    public String toString(){
        return "[Trouble " + number + "]";
    }   
}
```

### Support Class

트러블을 해결할 chain을 만들기 위한 추상 클래스  
next 필드는 떠넘기는 곳을 지정하고 setNext 메소드에서 떠넘기는 곳을 설정한다.  
resolve 메소드는 하위 클래스에서 구현할 곳을 상정한 추상메소드. 반환값이 true일때 요청이 처리되었음을 나타내고, false의 경우에는 아직 요청이 처리되지 않았음을 나타낸다.  
support 메소드는 resolve 메소드를 호출하고 반환값이 false라면 '다음사람'에게 떠넘기기를 한다.  

```java
public abstract class Support{
    private String name;
    private Support next;
    public Support(String name){
        this.name = name;
    }
    public Support setNext(Support next){
        this.next = next;
        return next;
    }
    public final void support(Trouble trouble){
        if(resolve(trouble)){
            done(trouble);
        } else if(next != null){
            next.support(trouble);
        }else{
            fail(trouble);
        }
    }
    public String toString(){
        return "[" + name + "]";
    }
    protected abstract boolean resolve(Trouble trouble);
    protected void done(Trouble trouble){
        System.out.println(trouble + " is resolved by " + this.name + ".");
    }
    protected void fail(Trouble trouble){
        System.out.println(trouble + " cannot be resolved");
    }
}
```

### NoSupport class
NoSupport 클래스는 Support 클래스의 하위 클래스로 NoSupport 클래스의 resolve는 항상 false를 반환한다. 즉 아무 문제도 처리하지 않는 클래스이다.
```java
public class NoSupport extends Support {
    public NoSupport(String name){
        super(name);
    }
    protected boolean resolve(Trouble trouble){
        return false;
    }
}
```

### LimitSupport class
LimitSupport 클래스는 limit에서 지정한 번호 미만의 트러블을 해결하는 클래스
```java
public class LimitSupport extends Support {
    private int limit;  //이 번호 미만의 trouble만 해결할 수 있다
    public LimitSupport(String name, int limit) {
        super(name);
        this.limit = limit;
    }
    protected boolean resolve(Trouble trouble){
        if(trouble.getNumber() < limit){
            return true;
        }
        return false;
    }
}
```

### OddSupport class
홀수 번호의 트러블을 처리하는 클래스
```java
public class OddSupport extends Support {
    public OddSupport(String name){
        super(name);
    }
    protected boolean resolve(Trouble trouble){
        if(trouble.getNumber() % 2 == 1){
            return true;
        }
        return false;
    }
}
```

### SpecialSupport class
지정한 번호의 트러블에 한하여 처리하는 클래스
```java
public class SpecialSupport extends Support {
    private int number;
    public SpecialSupport (String name, int number){
        super(name);
        this.number = number;
    }
    protected boolean resolve(Trouble trouble){
        if(trouble.getNumber() == number){
            return true;
        }
        return false;
    }
}
```

### Main class
```java
public class Main{
    public static void main(String[] args){
        Support alice       = new NoSupport("Alice");
        Support bob         = new LimitSupport("bob", 100);
        Support charlie     = new SpecialSupport("charlie", 429);
        Support diana       = new LimitSupport("diana", 200);
        Support elmo        = new OssSupport("elmo");
        Support fred        = new LimitSupport("fred", 300);

        //Support chain의 생성
        alice
        .setNext(bob)
        .setNext(clarlie)
        .setNext(diana)
        .setNext(elmo)
        .setNext(fred);

        //트러블 발생
        for(int i = 0; i<500; i+=33){
            alice.support(new Trouble(i));
        }

    }
}
```

### 실행 결과
alice가 처리하지 못하면 bob이 bob이 처리하지 못하면 charlie가 charlie가 처리하지 못하면 diana가 diana가 처리하지 못하면 elmo가 elmo가 처리하지 못하면 fred가 처리하듯이 처리를 떠넘길수 있다.

<img src="https://user-images.githubusercontent.com/24540286/132453589-6a4aabb7-527e-4b01-8bfb-697b6ee95b67.png" width=50%>

## Chain of Reponsibility 패턴의 역할

### Handler
Handler는 요청을 처리하는 인터페이스를 결정하는 역할을 한다. '다음 사람'을 준비해두고 자신이 처리할 수 없는 요청이 나오면 그사람에게 떠넘기기를 한다. 예제에서는 Support 클래스가 Handler 역할을 수행한다.

### ConcreteHandler (구체적인 처리자)
예제 프로그램에서의 NoSupport, LimitSupport, OddSupport, SpecialSupport가 ConcreteHandler 역할을 수행한다.

### Client (요청자의 역할)
예제 프로그램에서 트러블을 생성하고 최초 alice에게 처리를 요청하는 역할 -> Main class가 그 역할을 수행한다.

## 요청하는 사람과 요청을 처리하는 사람을 유연하게 연결
Chain of Responsibility 패턴의 포인트틑 요청을 하는 사람(Client)과 요청을 처리하는 사람(Concrete Handler)을 유연하게 연결하는 것이다. Client 역할을 최초의 사람에게 요청을 하고 chain 안으로 요청이 전달되어 적절한 처리자에 의해 요청이 처리된다.  
만약 이 패턴을 사용하지 않으면 '이 요청은 이 사람이 처리해야한다'는 정보를 중앙집권적으로 갖고 있어야 한다. 이 경우 부품으로써 독립성이 훼손되기 때문에 바람직하지 않다.

## Concrete Handler를 동적으로 처리
예제 프로그램에서는 alice에서 fred 까지 항상 고정된 순서로 요청을 처리한다. 그러나 요청을 처리하는 ConcreteHandler의 관계가 동적으로 변화하는 상황도 생각해볼수 있다. Chain of Responsibility 패턴과 같이 위임에 의해 떠넘기기를 실행하고 있으면 상황의 변화에 따라서 ConcreteHandler의 역할을 재편할 수 있다.  
윈도우 시스템에서는 사용자가 윈도우 상에 컴포넌트(버튼이나 텍스트 입력필드)를 자유롭게 추가 할 수 있는 경우에 chain of responsibility 패턴이 유효하다.

## Chain of Responsibility의 특징

### 자신의 일에 집중
각각의 ConcreteHandler의 역할은 자신이 할 수 있는 역할에 집중하고, 자신이 할 수 없으면 다음사람에게 전달한다. 이러면 각각의 ConcreteHandler 역할에서 써야할 처리가 ConcreteHandler 역할의 고유 내용으로 집중된다,

### 처리의 지연???
누군가 요청을 처리할 것인지 미리 정해져 있고 그 상대가 바로 처리하는 경우와 Chain of Responsibility를 비교하면 처리에서 지연될 수 있다. 요구와 처리자의 관계가 고정적이고 처리속도가 상당히 중요한 경우에는 Chain of Respolsibility 패턴을 사용하지 않는 편이 유효할 수도 있다.

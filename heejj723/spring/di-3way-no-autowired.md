
파일 이름을 어떻게 정해야 할지 모르겠다. </br>
대충 Dependency Injection 방법 세가지와 왜 `@Autowired` 로 필드 인젝션이 추천되지 않는 지에 대해 적을 것


## Dependency Injection 3가지 방법
- Field Injection
- Setter Injection
- Constructor Injection


## 1. Field Inejction

변수 선언부에 `@Autowired` Annotation을 붙인다.

```java
@Component
public class SampleController {
    @Autowired
    private SampleService sampleService;
}
```

그런데 이 필드 주입은 추천 되는 방법이 아니다. </br>
이 외에 이후에 소개 될 `Constructor Injection` 을 더 추천하는데, 왜 그럴까? </br>

## 1.1 Field Injection 을 사용하면 안 좋은 이유

### Constructor 를 이용한 인젝션에 비해 단일 책임의 원칙을 위반한다.
`@Autowired` 아래에 어떤 클래스 든 주입 받을 수 있다. </br>
이 부분에 있어서 Constructor 를 이용하면 수 많은 파라미터와의 의존관계를 의식하게 되는데, 리팩토링 신호를 알 수 있다고 한다. </br>

근데 이부분은 결국 `@RequiredArgumentConstructor` 어노테이션도 지향 하라는 말인 것 같은데 별로 이해는 안간다. </br>
오히려 저런 lombok 어노테이션이 제공하는 코드의 가독성을 포기하고 개발자에게 일종의 경고등을 울리라는 건지.. </br>

### 의존성이 '숨는다'

DI(Dependency Injection) 컨테이너를 사용한다는 것은 클래스가 자신의 의존성만 책임진다는게 아니다. 제공된 의존성 또한 책임진다. </br>
그래서 클래스가 어떤 의존성을 책임지지 않을 때, 메서드나 생성자를 통해(Setter나 Contructor) 확실히 커뮤니케이션이 되어야한다.  </br>
하지만 Field Injection은 숨은 의존성만 제공해준다. </br>


### 순환 의존을 컴파일 타임에 알 수 없음.

Constructor Injection에서 순환 의존성을 가질 경우 BeanCurrentlyCreationExeption을 발생시킴으로써 순환 의존성을 알 수 있다. </br>

### 불변성 선언 불가능 

Constructor Injection과 다르게 Field Injection은 final을 선언할 수 없다. 그래서 객체가 변할 수 있다. </br>


## 2. Setter Injection

```java
@Component
public class SampleController {
    private SampleService sampleService;
 
    @Autowired
    public void setSampleService(SampleService sampleService) {
        this.sampleService = sampleService;
    }
}
```

이런식으로 필요한 부분만 의존성을 주입 받고 싶을 때 유용하다. </br>
그런데 Controller 의 객체 생성과 동시에 의존성이 주입되지가 않는다. </br>
그래서 언제든지 `SampleController` 의 객체는 `NullPointerException` 을 뱉을 수 있다. </br>
객체를 통해서 `SampleService` 의 의존관계를 사용하는 메소드가 콜 될때 해당 객체는 Null 값일 수 있기 때문이다. </br>

따라서 `Constructor Injection` 이 추천 된다.

## 3. Constructor Injection

아래처럼 생성자의 파라미터에 의존성을 주입받는다.

```java
@Component
public class SampleService {
    private SampleDAO sampleDAO;
 
    @Autowired
    public SampleService(SampleDAO sampleDAO) {
        this.sampleDAO = sampleDAO;
    }
}

@Component
public class SampleController {

	private final SampleService sampleService = new SampleService(new SampleDAO());
    
	...
}
```

혹은 lombok의 `@RequiredArgumentsConstructor` 를 이용할 수도 있다.
```java
@Component
@RequiredArgumentsConstructor
public class SampleService {
    private final SampleDAO sampleDAO;
}
```

생성자를 사용하는 방법이 좋은 이유는 필수적으로 사용해야하는 의존성 없이는 Instance를 만들지 못하도록 강제할 수 있기 때문이다. </br>

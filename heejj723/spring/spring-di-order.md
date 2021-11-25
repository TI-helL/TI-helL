# Spring Dependency Injection 순서에 대해서

Spring boot 에서 Bean 을 주입 받을 때 그 순서를 잘 모르고 있었는데, 이번 기회에 정리해 보자.

Service 레이어에서 여러 서비스에 대한 디펜던시를 주입받는 상황을 가정하여 밑과 같은 테스트 프로젝트를 생성하였다.

```java
@Service
public class MainService {

  private final ConstructorService constructorService;
  private SetterService setterService;
  @Autowired
  private AutowiredService autowiredService;

  public MainService(ConstructorService constructorService) {
    System.out.println("[MainService] Constructor Called");
    System.out.println("MainService.constructorService: " + constructorService);
    System.out.println("MainService.setterService: " + setterService);
    System.out.println("MainService.autowiredService: " + autowiredService);
    this.constructorService = constructorService;
  }

  @Autowired
  public void setSetterService(SetterService setterService) {
    System.out.println("[MainService] setSetterService Called");
    System.out.println("MainService.constructorService : " + constructorService);
    System.out.println("MainService.setterService : " + setterService);
    System.out.println("MainService.autowiredService : " + autowiredService);
    this.setterService = setterService;
  }
}

```



## 코드 설명
1. MainService 는 AutowiredService, ConstructorService, SetterService 를 주입받는다.
2. 각각의 서비스는 다른 Bean 을 주입받지 않으며, Constructor 가 콜될 때 로그를 찍는다.



## 실행 순서 결과

```
[AutowiredService] Constructor Called
[ConstructorService] Constructor Called
[MainService] Constructor Called
MainService.constructorService: com.example.ditestspring.service.ConstructorService@4c9e9fb8
MainService.setterService: null
MainService.autowiredService: null
[SetterService] Constructor Called
[MainService] setSetterService Called
MainService.constructorService : com.example.ditestspring.service.ConstructorService@4c9e9fb8
MainService.setterService : com.example.ditestspring.service.SetterService@11a82d0f
MainService.autowiredService : com.example.ditestspring.service.AutowiredService@1adb7478
```


## 결과 설명 

### AutowiredService, ConstructorService 의 생성자 
- `AutowiredService` 는 아무 필드도 없는 서비스이다.
- Spring 에서는 먼저 Bean 으로 등록가능한 것들에 대해서 미리 bean 을 만들어 둔다.
- 여기서는 `AutowiredService`, `Constructor0Service` 를 먼저 생성할 수 있다.
- 그 사이에서의 순서는 `@DependsOn` 과 같은 어노테이션으로 Bean Creation Order 를 컨트롤 할 수도 있다.

### MainService 의 생성자
- `MainService` 가 빈으로 등록되기 위해서는, 주입받는 3개의 Service 가 모두 bean 으로 등록되어있어야 한다.
- **(중요)** MainService 의 생성자에서는 오직 ConstructorService 의 값만 존재하고 나머지는 null 이다.
- 왜냐하면 Spring 에서는 반드시 생성자를 먼저 만들고 나서, Bean 을 주입하기 때문이다.
- 즉 Bean 생성시기와 Bean 주입시기가 다르다.

### SetterService
- `MainService` 를 bean 으로 만들기 위해서, `SetterService` 의 생성자가 Call 된다.
- 그리고 비로소 MainService 의 Setter 를 통한 DI 에서는 모든 필드에 bean 주입이 된 것을 확인할 수 있다.

## 결론
- 필드 주입은 객체의 생성자를 생성한 이후에 일어난다.
- 따라서 특정 Bean 의 객체 생성 시점에 의존성주입을 받고 싶다면, Constructor DI 를 이용하자.
  - `AbstractAutowireCapableBeanFactory.doCreateBean` 을 뜯어보면, DI 순서는
  - Constructor -> Autowired -> Setter
  - 임을 알 수 있다.

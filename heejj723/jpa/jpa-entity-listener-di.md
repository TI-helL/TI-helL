# JPA Entity Listener 에서 의존성 주입받기

- JPA EntityListener 는 EntityManagerFactory 를 Bean 으로 등록할 때 빈으로 등록된다.
- 그런데 EntityListener 에서 EntityManagerFactory 를 사용하는 Bean 을 주입받으려고 하면 문제가 된다.

예를들어 다른 서비스를 Bean 으로 주입받는다고 해보자.

`AssetService` 를 호출한다고 했을 때, AssetService 내부에는 `Repository` 같은 빈을 사용하고 있을 것이다.
`repository` 입장에서는 EntityManagerFactory 를 빈으로 사용한다. 즉 문제는,

1. EntityManagerFactory 를 빈으로 등록하려고 보니 EntityListener 를 먼저 등록해야 한다.
2. EntityListener 를 등록하려고 보니 Service 를 빈으로 등록해야 한다.
3. Service 를 등록하려고 보니 EntityManagerFactory 가 필요하단다..

이 상황에서 EntityManager 는 런타임 에러를 뱉는다.
왜냐하면 JPA 가 Bean 을 등록하는 `SpringContainedBean` 에서는, Bean 생성에 실패하게 되면 newInstance 로 가짜 객체를 생성하고 넘어가버린다.
따라서 EntityListener 는 Bean 이 아니라 newInstance 형태로 생성되어 버린다.
따라서 빈이 아닌 엔티티리스너는 그 자체로 의존성 주입을 받을 수가 없다.

결론적으로 Listener 에는 모든 주입 필드가 null 이 된다. (newInstance 이기 때문)

그래서 Listener 에서 빈을 사용하기 위해서는 몇가지 우회 방법을 사용해야 한다.

## Listener 에 주입 받는 방법 3가지

### 1. ApplicationContext 를 통해 주입 받는 방법
JpaRepository를 직접 주입받지 말고 ApplicationContext를 주입 받아서, getBean을 통해서 Repository를 가져오는 방법을 이용해도 된다.
해당 방식은 사용하는 시점에 Bean을 가져오기에, EntityManagerFactory가 생성이 되어 있으니 문제가 발생하지 않는다.
### 2. @Lazy
@Lazy를 추가하여, context refresh 시점에는 proxy 상태였다가, 해당 Repository가 처음 사용될 때 초기화가 될 수 있게 변경 한다.
이렇게 하면 EntityManagerFactory가 생성된 이후기 때문에 문제가 발생하지 않는다.

### 3. BootstrapMode Deferred or Lazy
BootstrapMode를 Deffrred로 설정하게 되면, JpaRepositories를 proxy로 생성 해준다.
또한, Spring context가 load하는 thread와 다른 thread를 이용해서 작업이 진행되고, ContextRefreshedEvent에 trigger에 의해서 repository가 초기화가 진행된다.
결론은 @Lazy와 비슷하게 동작 하지만 application이 시작 전에 Repository들이 초기화가 보장되어 있고, load 속도도 빨라진다.



### 참고
https://kangwoojin.github.io/programing/jpa-entity-listeners/

# 어노테이션

[Controller](https://www.notion.so/Controller-cb54c2a5e1b449e5ade51f257f226ccb) 

[Entity(모델)](https://www.notion.so/Entity-0e06a7f707124e289bdf6526e72b30ee) 

[Repository](https://www.notion.so/Repository-f8cc48c004b14721baa0501e61afd763) 

[Service](https://www.notion.so/Service-b1f79febf20f423cacd5990f99c408be) 

[DTO](https://www.notion.so/DTO-91f3e6e0686e4178829353dd10d57280) 

## Controller

- 웹 MVC 컨트롤러 역할

`@Controller`

- 컨트롤러 기능 수행

`@ResponseBody`

- 

`@RequestMapping("/hello")`

- 

## Entity(모델)

`@GeneratedValue`

- @GeneratedValue(strategy = GenerationType.IDENTITY)
- 기본키 생성을 데이터베이스에 위임
- 즉, id 값을 null로 하면 DB가 알아서 AUTO_INCREMENT 해준다

`@Id`

- 기본키
- 기본타입, 기본래퍼유형, String, java.util.Date, java.sql.Date, java.math.BigDecimal, java.math.BigInteger 중 하나

[[JPA] 기본키(PK) 매핑 방법 및 생성 전략 - Heee's Development Blog](https://gmlwjd9405.github.io/2019/08/12/primary-key-mapping.html)

`@Coulumn`

- @Coulumn 어노테이션을 지정하지 않으면 열 이름은 기본 키 속성 또는 필드 이름으로 가정함
1. **@Entity**
    - 테이블과 링크될 클래스
    - 기본값으로 클래스의 카멜케이스 이름을 언더스코어 네이밍(_)으로 테이블 이름을 매칭ex) `SalesManager` → `sales_manager`
2. **@Id**
    - 해당 테이블의 PK 필드
3. **@GeneratedValue**
    - PK의 생성 규칙 표시
    - Spring Boot 2.0부터는 `auto_increment`를 위해서 `GenerationType.IDENTITY` 옵션 추가 필수
4. **@Column**
    - 테이블의 칼럼임을 표시
    - 필수 x, 기본값 외에 변경이 필요한 옵션이 존재할 경우 사용
5. **@ManyToOne** 및 **@OneToMany**
    - 관계 매핑을 위한 애노테이션
6. **@NoArgsConstructor**
    - 기본 생성자 자동 추가
7. **@Getter**
    - 클래스 내 모든 필드의 `Getter` 메소드 자동 생성
8. **@Builder**
    - 해당 클래스의 빌더 패턴 클래스 생성
    - 생성자 상단에 선언 시 **생성자에 포함된 필드**만 빌더에 포함
9. **@Transient**

of()

- static Method : 별도 객체의 호출없이 사용가능하도록 하기 위한 목적

## EntityManager

- 여러 엔티티를 관리함. Hibernate 에서는 Session이라고 함
- EntityManager은 자신이 관리해야하는 엔티티 객체들을 영속 컨텍스트에 넣어 객체들의 Lifecycle을 관리함
    - EntityManager은 thread safe하지 않으므로 여러 스레드가 동시 접근하면 동시성 문제가 생김
    - 보통 트랜잭션을 시작할 때 커넥션을 획득하낟.
    - @PersistenceContext 애노테이션을 통해 주입받을 수 있다.

## EntityManagerFactory

- EntityManager 인스턴스를 관리함. Hibernate에서는 SessionFactory라고 함
- EntityManagerFactory 생성시 Connection Pool도 함께 생성함
- 한번 생성시 어플리케이션 전체에서 공유되며, thread safe함
    - Persistence 부트 스트랩 클래스를 통해 생성하거나, @PersistenceUnit을 통해 주입받음

## Persistence Context (영속성 컨텍스트)

- JPA가 엔티티 객체들을 모아두는 공간
- Entity를 영구 저장할 수 있는 환경
- EntityManager은 Entity를 저장하거나 조회할 때 Entity Context에 엔티티를 보관하고 관리함
1. 비영속 (new/transient)
    - 영속성 컨텍스트와 전혀 관련이 없는 상태
    - 자바 영역에 객체만 존재하고 데이터베이스와 연동이 된 적이 없는 상태
    - 엔티티매니저에게 관리되지 않음
2. 영속 (managed)
    - 영속 컨텍스트에 저장된 상태
    - 데이터 베이스에 저장되고, 메모리상에서도 같은 상태로 존재하는 상태
    - 객체는 영속 컨텍스트 내에 들어가게 되고, id(pk) 값을 통해 필요한 Entity 객체를 꺼내 사용할 수 있음
3. 준영속 (detached)
    - 영속 컨텍스트에 저장되었다가 분리된 상태
    - 영속 컨텍스트에서 엔티티 객체를 꺼내서 사용하는 상태
    - 준영속 상태의 객체는 고유한 id(pk)를 가지고 있지만, 데이터베이스와 동기화가 이루어지지 않은 상태
4. 삭제 (removed)
    - 삭제된 상태
    - 데이터베이스 상에서 삭제됨
    - 객체는 더 이상 영속 컨텍스트에 존재하지 않음
- 

![스크린샷 2022-09-23 오전 11.30.42.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/86d42403-6c67-4bcd-b4bc-38a61f8895ec/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-09-23_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.30.42.png)

## DTO

- 
1. @Builder 애노테이션으로 Dto객체의 생성자 부분을 만들어주고
2. toEntity 메서드를 통해 Service -> Database(Entity)로 Data를 전달할 때 Dto를 통해서 전달한다

## Repository

- JPA에서의 **DB Layer 접근자**를 의미한다.
- **인터페이스**를 생성 후 `JpaRepository<Entity 클래스, PK 타입>`을 상속하면 기본적인 CRUD 메소드가 자동으로 생성된다.
- `@Repository`를 추가할 필요가 없다.
- 도메인 객체를 DB에 저장하고 관리

## Service

- 핵심 비즈니스 로직 정의
- 직접 DB접근하지 않고 Repository를 거쳐간다.
- 서비스를 인터페이스로 만들고 서비스impl에서 클래스로 구현
- 인터페이스와 구현체를 분리하여 틀을 만들어두고 그 틀을 가져와서 사용하게끔 한다

## Impl

- 핵심 기능 구현
- 관습적인 추상화의 문제점

장점

- 서비스는 httpServelt 을 상속받을 필요가 없는 순수한 자바객체라 어떤 컨트롤러가 본인을 호출하든 필요한 매개변수만 넘겨주면 된다. → 모듈화를 통해 어디서 호출되던 재사용이 가능하다.
- 서비스는 뷰에 종속된 코드가 없기때문에 그대로 재사용가능하다.
- 인터페이스와 구현체 클래스가 당장은 1:1일수는 있으나 언제든지 구현체가 확장될 가능성이 있음. 그러므로 인터페이스와 구현체를 분리하여 미래의 변화에 유연하게 대처할 수 있어야 함

단점

- 관습적으로 이렇게 해야하니까 그냥 분리하는 사람들이 있는데 개발자 당사자는 인터페이스와 구현체 클래스의 분리한 설계를 통한 이점과 근거에 대해 명확히 이해할 필요가 있다.

분리 예시

1) MemberService : 회원 서비스 인터페이스

- GeneralMemberService : 일반 회원 서비스 구현체 클래스
- CeoMemberService : 사장님 회원 서비스 구현체 클래스

1:1이면 걍 .. 구현체로만 만들어도 될듯
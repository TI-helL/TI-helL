jpa

- 객체지향 프로그래밍 + 관계형 데이터베이스 둘다 이해

h2

- 인메모리형 관계형 데이터베이스
- 메모리에서 실행되어 재시작때마다 초기화됨 → 테스트 용도

Entity

- 테이블과 링크될 클래스
- 클래스의 카멜케이스 이름을 언더스코어 네이밍의 테이블과 매칭함

@Id

- PK
- 엔티티의 PK는 보통 Long 타입의 Auto_increment를 추천 (mysql에선 bigint가 됨)
    - 주민등록번호 같은 비즈니스상 유니크키, 복합키로 PK를 하면 문제가 발생함
        - FK시 다른 테이블에서 복합키 전부를 갖고 있거나, 중간 테이블을 하나 더 둬야함
        - 인덱스에 좋은 영향을 못줌
        - 유니크한 조건이 변경되면 PK 전체를 수정해야 함
        - 주민등록번호, 복합키는 유니크 키로 별도로 추가하기

@GeneratedValue

- PK 생성 규칙
- GenerationType.IDENTITY : auto_increment 옵션

@Column

- 테이블 칼럼, 선언안해도 클래스 필드는 칼럼이 됨
- 추가로 변경이 필요한 옵션이 있을 때 사용 (ex: 문자열 크기 변경, 타입 변경)

@NoArgsConstructor

- 기본 생성자 자동 추가
- public Posts(){}와 같은 효과

@Getter

- 클래스 내 모든 필드의 Getter 메소드를 자동생성

@Builder

- 해당 클래스의 빌더 패턴 클래스를 생성
- 생성자 상단에 선언시 생성자에 포함된 필드만 빌더에 포함

Getter/Setter 주의점

- 게터/세터를 무작정 생성할 경우 해당 클래스의 인스턴스 값들이 언제 어디서 변해야하는지 코드상으로 명확히 구분하기 어려움.
- 차후 기능 변경시 복잡해짐
- Entity 클래스에서는 Setter 메소드를 만들지 않는다. 대신 해당 필드값 변경이 필요하면 명확히 그 의도와 목적을 알수있게 메소드를 추가해야함

Setter가 없을 경우 DB에 데이터 삽입

- 기본적인 구조
    - 생성자를 통해 최종값을 채운후 DB에 삽입
    - 값 변경이 필요한 경우 해당 이벤트에 맞는 public 메소드를 호출하여 변경
- 추천
    - 생성자 대신 @Builder를 통해 제공되는 빌더 클래스를 사용.
    - 빌더도 생성자처럼 생성 시점에 값을 채워주는 역할
    - 생성자의 경우 지금 채워야할 필드가 뭔지 모름
    
    ```python
    Example(b,a)
    public Example(string a, string b){
    	this.a = a;
    	this.b = b;
    }
    ```
    
    - 하지만 빌더는 다름
    
    ```python
    Example.builder()
    	.a(a)
    	.b(b)
    	.build();
    ```
    

Repository 생성하기

- 특정 클래스로 Database에 접근하도록 JpaRepository를 생성함
- 인터페이스로 생성함
- JpaRepository<Entity 클래스, PK 타입>을 상속하면 기본 CRUD 메소드가 자동 생성됨
- Entity 클래스와 Entity Repository는 함께 위치해야 함
- Entity 클래스는 기본 Repository 없이는 제대로 역할을 할 수 없음
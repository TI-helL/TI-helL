# Entity

- **no-arg constructor** and a **primary key**
- **entity classes must not be declared *final*.**

- @Id
    - @GeneratedValue(Strategy=GenerationType.{type} )
        - AUTO
            - DB에 따라 아래 3가지 전략중 하나를 자동으로 선택
        - TABLE
            - 시퀀스 테이블을 만들어서 시퀀스를 구현
            - 특정 DB에 의존적이지 않음
        - SEQUENCE
            - DB의 시퀀스 객체를 활용
            - Oracle, DB2, H2
        - IDENTITY
            - 기본키 생성을 데이터베이스에 위임
            - MySQL 의 AUTO INCREMENT
            - 특정 DB에 의존적

- @Transient
    - 데이터베이스에서 사용되지 않고 일회성으로 사용되는 변수
    - 영속성이 불필요한 데이터
        - 비밀번호 확인 변수 등
        
- @Temporal
    - (TemporalType.DATE)
    
- @Enumerated
    - enum 클래스 선언하여 정의
    - enum에 정의도니 데이터만 활용하기 위해 적용
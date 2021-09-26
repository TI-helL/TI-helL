# JPA N+1 문제

---

## 지연(Lazy) 로딩과 즉시(Eager) 로딩 

- 지연 로딩: 엔티티 조회 시 우선 Proxy 객체로 가져 온 뒤, 실제 그 객체를 사용하는 시점에  DB에 쿼리를 던지는 것
- 즉시 로딩: 하나의 쿼리로 실제 객체를 가져온다.

보통 `@OneToOne`, `@ManyToOne` 은 Default 가 즉시 로딩, </br>
`@OneToMany`, `@ManyToMany` 는 지연 로딩이 디폴트이다.

연관 관계가 ㅇㅇToMany 일 경우 실제 가져오는 데이터가 많기 때문에 실제 사용하는 시점에 쿼리를 날리는 것이 효율적이기 때문인 듯 하다.


---
## 그래서 N+1 문제의 원인?

> Spring Data JPA 에서 제공하는 Repository의 findAll(), findById() 등과 같은 메소드를 사용하면 바로 DB에 SQL 쿼리를 날리는 것이 아니다. JPQL 이라는 객체지향 쿼리 언어를 생성, 실행시킨 후 JPA는 이것을 분석해서 SQL을 생성, 실행하는 동작에서 N+1 문제가 발생한다.

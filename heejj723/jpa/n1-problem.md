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

N+1 문제는 다음과 같은 경우일 때 발생한다.
- 즉시 로딩으로 데이터 가져올 때
- 지연 로딩으로 데이터 가져온 후 연관 관계 하위 데이터 조회 할 때 

---
ERD 가 이렇다고 해보자.

<img width="719" alt="스크린샷 2021-09-26 오후 9 32 09" src="https://user-images.githubusercontent.com/45758481/134808146-6c921833-5bd4-4cba-ab3a-7fa9b2434875.png">

### Album 에 대해서만 접근할 경우
```java
List<Album> albums = AlbumRepository.findAll();
```

- Lazy Loading
  - 하위 엔티티에 접근하지 않았으므로 Album List 를 불러오는 한번의 쿼리만 일어남.

- Eager Loading
  - 연관 관계에 있는 하위 엔티티까지 모두 불러오기 위해 추가적인 쿼리를 진행한다.
  - 노래 데이터가 N 일때, 쿼리는 총 N+1 번 발생한다.

### Album 과 Song 에 대해 접근 할 경우
```java
List<Album> albums = AlbumRepository.findAll();
for (Album album : albums) {
  List<Song> songs = album.getSongs();
}
```

- Lazy Loading
  - Album 관련 객체를 조회 할 때 `이미 한번의 쿼리가 끝난다` 
  - 따라서 단지 앨범 객체에 대한 Id 값으로 DB 에 한번 더 접근하게 되고, 쿼리는 총 N+1번 발생

- Eager Loading
  - 이미 Album 객체를 가져 올 때 하위 엔티티 (Songs) 에 대한 정보도 가져온다.
  - 이 때 한번의 Join 쿼리로 모든 데이터를 가져온다.

---

## 해결 방법?

### Fetch Join
```java
@Query("select DISTINCT a from Album a join fetch a.songs") // 편의상 JPQL 로 작성했으나 QueryDSL 로 써도 무방
List<Album> findAllJoinFetch();

List<Album> albums = AlbumRepository.findAll();
for (Album album : albums) {
  List<Song> songs = album.getSongs();
}

```

지연 로딩 방식을 바꾸지 않고 한번의 join query 로 해결하는 방식이다. </br>

물론 한계도 있다.
- JPA 제공하는 Pageable 사용 불가
- 1:N 관계가 여러개인 경우 사용 불가

근데 위 문제들은 QueryDsl 을 사용하면 자연스럽게 해결 된다.
QueryDsl 로 동적 쿼리와 페이징 처리가 모두 가능하기 때문

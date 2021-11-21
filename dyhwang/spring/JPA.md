# JPA
## 왜 JPA를 사용해야 하는가
- 객체지향으로 개발을 하지만 관계형 데이터베이스를 사용하게 되면 sql을 피할 수 없다
- 좋은 객체지향 설계를 해도 관계형과는 패러다임 불일치의 문제가 있다.
- 왜냐면 관계형 db는 어떻게 데이터를 저장할지에 초점이 맞춰진 기술이기 때문이다.
- 반면에 객체지향은 메시지를 기반으로 기능과 속성을 한곳에서 관리하는 기술이다.
## 관계형과 객체지향간 패러다임 불일치
객체지향
```java
User user = findUser();
Group group = user.getGroup
# User와 Group의 상속 관계를 알 수 있다.
```
관계형 DB에서 객체정보를 가져올 때
```java
User user = userDao.findUser();
Group group = groupDao.findGroup(user.getGroupId());
# User와 Group을 따로 조회하기에 어떤 관계인지 알기 어렵다.
```
위의 불일치 문제를 해결하기 위해 JPA가 중간에서 패러다임을 일치 시켜주는 역할을 한다.
## Spring-Data-JPA
- JPA는 인터페이스이다.
- 인터페이스는 JPA를 사용하기 위해선 그 구현체를 사용해야 한다.
- Hibernate, EclipseLink 등이 있다
- 스프링에서는 이러한 구현체를 직접 사용하지 않고 좀 더 쉽게 사용하고자
- 추상화 시킨 Spring Data JPA
- JPA <- hibernate <- spring-data-JPA 관계를 갖는다.
장점
- 구현체 교체의 용이성
	- hibernate에서 다른 구현체로 교체할 경우 쉬운 교체가 가능하다
- 저장소 교체의 용이성
	- spring data의 하위 프로젝트들은 기본적인 CRUD 인터페이스가 같다
	- save, findAll, findOne 등의 인터페이스를 갖고 있어
	- 저장소 교체 시에도 문제가 생기지 않는다
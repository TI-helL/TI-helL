# Spring IOC Container 구조에 대해서 

## IOC
- 객체 생성 및 의존성 관리, 생명주기 관리
- 제어의 역전 (프레임워크)
    - 객체가 내가 사용할 객체를 직접 선택을 안함
    - IOC 컨테이너가 대신 해줌
    - 대표적으로 서블릿이 있음

## DI (Dependency Injection)
- 클래스 간 의존관계를 Bean 을 이용해서 컨테이너가 자동 연결 
- 개발자는 Bean 으로 등록만 해주면 됨..
- Setter Injection 과 Constructor Injection 이 있음

## Bean
- Spring DI Container 가 관리하는 객체가 Bean.. 
- 이 bean 들을 관리하는 ioc 는 Bean Factory..
## Bean Factory
  - Bean 생성, 조회, 반환   
  - Bean Factory 를 상속한 ApplicationContext 를 사용함..
## Application Context   
  - BeanFactory 의 확장



# Automatic Dependency Injection

의존 객체 자동 주입(Automatic Dependency Injection)은 스프링 설정파일에서 혹은 태그로 의존 객체 대상을 명시하지 않아도 스프링 컨테이너가 자동적으로 의존 대상 객체를 찾아 해당 객체에 필요한 의존성을 주입하는 것을 말한다.

## `@Resource`

- Java에서 지원하는 Annotation으로 특정 프레임워크에 종속적이지 않다.

- name 속성의 이름을 기준으로 찾습니다. 없으면 타입, 없으면@Qualifier 어노테이션의 유무를 찾아 그 어노테이션이 붙은 속성에 의존성을 주입한다.

- 탐색 순서: `name` > `type` > `@Qualifier` > `fail`

## `@Autowired`

- Spring에서 지원하는 Annotation이다.

- 주입하려고 하는 객체의 타입이 일치하는지를 찾고 객체를 자동으로 주입한다. 만약에 타입이 존재하지 않는다면 @Autowired에 위치한 속성명이 일치하는 bean을 컨테이너에서 찾는다. 그리고 이름이 없을 경우 @Qualifier 어노테이션의 유무를 찾아 그 어노테이션이 붙은 속성에 의존성을 주입한다.

- 탐색 순서: `type` > `name` > `@Qualifier` > `fail`

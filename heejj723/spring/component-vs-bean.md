# Bean과 Component 차이

## Bean
`@Bean` 은 메소드 레벨에서 선언하며, 반환되는 객체(인스턴스)를 개발자가 수동으로 빈으로 등록하는 애노테이션이다.
- 개발자가 컨트롤이 불가능한 외부 라이브러리들을 Bean으로 등록하고 싶은 경우에 사용된다.
- 예를 들면 `ObjectMapper`의 경우 ObjectMapper Class에 @Component를 선언할 수 없으니
`ObjectMapper`의 인스턴스를 생성하는 메소드를 만들고 해당 메소드에 `@Bean`을 선언하여 Bean으로 등록한다.


## Component
반면 `@Component` 는 클래스 레벨에서 선언함으로써 스프링이 런타임시에 컴포넌트스캔을 하여 자동으로 빈을 찾고(detect) 등록하는 애노테이션이다.

- 개발자가 직접 컨트롤이 가능한 `Class` 레벨에서 사용한다.

## 결론
Bean 과 Component 는 각각 선언할 수 있는 타입이 정해져 있어서 해당 용도 이외에 사용하게 되면 컴파일 에러가 발생한다. 

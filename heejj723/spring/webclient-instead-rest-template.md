# Spring 에서 RestTemplate 대신 WebClient 사용하기

## 왜 WebClient?

Spring 어플리케이션이 클라이언트 입장에서 HTTP 요청을 할 때는 주로 `RestTemplate` 을 사용했다.
그런데 Spring5.0 부터는 이제 유지가 되고, 이후 Deprecated 될 예정이다.

`RestTemplate` 대신에 스프링은 `WebClient` 사용을 강력히 권고하고 있는데, 이유는 다음과 같다.

- Non-blocking I/O
- Reactive Streams back pressure
- High concurrency with fewer hardware resources
- Functional-style, fluent API that takes advantage of Java 8 lambdas
- Synchronous and asynchronous interactions
- Streaming up to or streaming down from a server

더 자세한 이유가 궁금하면 [여기](https://www.baeldung.com/spring-webclient-resttemplate) 를 찾아보면 잘 알 수 있다.

정리해 보자면, `WebClient` 는 스프링 리액티브에서 제공하는 Async, Non-blocking Solution 을 사용한다는 것이다.

RestTemplate 은 Http 호출 한 그 스레드 내에서 응답을 기다리는 반면, WebClient 는 각 이벤트에 대한 thread 를 생성한다.

이벤트 기반 아키텍처이고, Spring WebFlux 라이브러리의 일부이기 때문에, 우리가 스프링 부트에서 어노테이션으로 개발 하듯이. '선언적' 프로그래밍을 할 수 있도록 해준다.

이벤트에 대한 콜백을 처리하는 방식은 node.js 랑도 상당히 닮아있다.


## 두개의 차이점 비교

위 블로그 글을 보면 알 수 있듯이, 두 개의 가장 큰 차이점은 응답이 오기 전에 컨트롤러가 리턴 되느냐 아니느냐다.

컨트롤러는 바로 리턴해서 끝나버리고, 나중에 Flux 가 준비가 되면 Client 쪽으로 바로 응답을 내려준다.

이러한 동작을 Framework 단에서 지원해 주어야 할 필요성이 대두되고 있고, 그래서 NIO 지원이 중요하다.

## 사용법

나중에..

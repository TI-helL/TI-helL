# Spring WebFlux - WebClient 동기식 API 호출 block 메소드 에러

- Spring에서 API 제공이 아닌 호출을 위해 검색해보면 RestTemplate을 찾을 수 있고, 더 검색하다보면 RestTemplate은 유지보수 모드에 진입했고 향후 deprecated 될 예정이니 WebClient를 사용하는 것이 바람직하다고 한다.
- 그래서 WebClient를 RestTemplate처럼 사용하기 위해 검색해보면 사용하는 방법은 대부분 비슷하게 아래와 같은 형태의 코드가 나온다.

  ```java
  ...

  Mono<List<MyObject>> response = webClient.post()
      .uri(MY_URI)
      .bodyValue(myBody)
      .retrieve()
      .bodyToMono(new ParameterizedTypeReference<List<MyObject>>() {
      }).log();

  return response.block();

  ...
  ```

  <br>

- 실행했더니 `return response.block()` 라인에서 아래와 같은 에러가 발생했다..

  ```java
  java.lang.IllegalStateException: block()/blockFirst()/blockLast() are blocking, which is not supported in thread reactor-http-nio-2
  at reactor.core.publisher.BlockingSingleSubscriber.blockingGet(BlockingSingleSubscriber.java:83) ~[reactor-core-3.4.10.jar:3.4.10]
  Suppressed: reactor.core.publisher.FluxOnAssembly$OnAssemblyException:
  Error has been observed at the following site(s):
  |_ checkpoint ⇢ HTTP GET "/my/uri" [ExceptionHandlingWebHandler]
  ...
  ```

  <br>

- 원인을 아직 확실하게 이해하지 못했지만,, 프로젝트에 `spring-boot-starter-webflux` 의존성만 추가하고 어플리케이션을 실행하면 Spring은 이 어플리케이션이 WebFlux와 netty를 기반으로 동작하는 Reactive application이라고 간주하고 블로킹을 지원하지 않는 쓰레드를 이용하게 되기 때문에 block 메소드 호출 시 에러가 발생한다는 것 까지만 알아냈다.

- 일단 검색해서 찾아낸 해결책은 `spring-boot-starter-webflux`와 `spring-boot-starter-web` 의존성 두 개를 모두 추가하라는 것이다.

  - 이렇게 하면 webflux만 추가했을 때에 비해 눈에 띄는 차이점은 spring 내장 WAS가 netty에서 tomcat으로 변경된 것과 API 요청 시 동작하는 쓰레드의 이름이 reactor-http-nio-{번호}에서 nio-8080-exec-{번호}와 ctor-http-nio-{번호}로 변경된 것이다.

  <br>

- 그래서 아래와 같이 의존성을 추가하면 `block()` 메소드가 정상적으로 동작하는 것을 확인할 수 있다.

  ```groovy
  ...

  dependencies {
    ...

    implementation 'org.springframework.boot:spring-boot-starter-web:2.5.5'
    implementation 'org.springframework.boot:spring-boot-starter-webflux'

    ...
  }

  ...
  ```

<br>

## 참고 링크

- [공식] RestTemplate 유지보수 모드 - https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html

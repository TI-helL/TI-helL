# WebClient
Spring WebClient는 웹으로 API를 호출하기 위해 사용되는 HTTP Client 모듈중 하나이다. java에서 가장 많이 사용되는 HTTP Client는 RestTemplate인데 곧 deprecate로 변경된다. WebClient와 RestTemplate의 차이점은 WebClient는 Non-blocking이고 RestTemplate는 Blocking 방식을 사용한다.

## 사용하기

### Gradle implement
```gradle
implementation group: 'org.springframework.boot', name: 'spring-boot-starter-webflux', version: '2.0.0.RELEASE'
```

### 인스턴스 생성
```java
webClientBuilder.clientConnector(clientHttpConnector)
        .defaultHeader("accept", MediaType.APPLICATION_JSON_VALUE, "charset=UTF-8")
        .defaultHeader("a", "a")
        .baseUrl("http://localhost:8080")
        .build();
```

### 사용하기

```java
Mono<ResponseEntity<String>> insurancesResDtoMono =  svcWebClient.get()
        .uri(uriBuilder -> uriBuilder
            .path("/path")
            .queryParam("param", "0000000000")
            .build()
        )
        .header("Authorization", "Bearer " + "token")
        .retrieve()
        .toEntity(String.class);

```
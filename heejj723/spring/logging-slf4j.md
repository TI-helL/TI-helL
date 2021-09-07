# logging-slf4j.md

### 가장 간단한 방법

`System.out.println()` 을 이용하기 </br>

- 로그의 양이나 로그 레벨을 조절 할 수 없다. </br>
- 출력된 로그를 파일 등에 저장하기 불편하다
- 느리다.


### 1) java.util.logging
JDK 1.4 부터 포함된 표준 로깅 API

### 2) Apache Commons logging

### 3) Log4j

### 4 SLF4J - logging Facade(퍼사드)

- SLF4J 는 로깅 퍼사드임. 로깅에 대한 추상 레이어를 제공하는 interface </br> </br>
![img](https://user-images.githubusercontent.com/45758481/132287124-715b05b5-edda-495c-908f-b86725edba80.gif)

### 왜 쓰는가?

- 어플리케이션은 SLF4J 를 사용해서 어떤 로깅 라이브러리를 쓰더라도 같은 방식으로 로그를 남겨야함
- 로그 라이브러리를 교체하더라도 코드 변경 불필요

## 4) Logback

- 로깅 퍼사드의 구현체 중 하나임

### 이점
1. 오랫동안 검증 된 `Log4J` 아키텍처 기반임
2. 컴포넌트
- `log-core`
- `logback-classic` : `slf4j` 에서 사용 가능하도록 만든 플러그인 컴포넌트
- `logback-access` : 웹 어플리케이션에서 http 요청에 대한 디버깅을 잘 지원함
3. Automatic reloading of configuration files
- 운영 서버 모드에서 로그 레벨를 `warn` 으로 설정했다가, 운영 중에 `info` 레벨로 변경하길 원할 때
- 100개의 쓰레드가 초당 백만 invocation을 발생해도 시스템에 무리를 안준다고 함

### Logback 설정 방법

build.gradle
```xml
    implementation 'ch.qos.logback:logback-classic:1.2.5'
```

logback-spring.xml
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>
  <property scope="context" name="LOG_DIR" value="./data/logs"/>
<!--    <appender-ref ref="CONSOLE" />-->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
      <file>${LOG_DIR}/app.log</file>
      <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
        <fileNamePattern>${LOG_DIR}/app.%d{yyyy-MM-dd}-%i.log</fileNamePattern>
        <maxHistory>30</maxHistory>
      </rollingPolicy>
      <encoder>
        <charset>UTF-8</charset>
        <pattern>%d{yyyy:MM:dd HH:mm:ss.SSS} %-5level --- [%thread] %logger{35}: %msg %n</pattern>
      </encoder>
    </appender>

  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <layout class="ch.qos.logback.classic.PatternLayout">
      <pattern>%d{yyyy-MM-dd HH:mm:ss} [%-5p] [%F]%M\(%L\) : %m%n</pattern>
    </layout>
  </appender>

  <root level="INFO">
    <appender-ref ref="FILE" />
    <appender-ref ref="STDOUT" />
  </root>
</configuration>
```


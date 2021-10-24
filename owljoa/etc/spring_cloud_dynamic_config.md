# Spring Cloud Config 변경사항 동적 반영

- [1. Config File(s)](#1-config-files)
- [2. Config Server](#2-config-server)
  - [2.1. 빌드 설정(build.gradle)](#21-빌드-설정buildgradle)
  - [2.2. config-server 설정 (application.yml)](#22-config-server-설정-applicationyml)
  - [2.3. config server 코드 (ConfigServerApplication.java)](#23-config-server-코드-configserverapplicationjava)
- [3. Config Client (API Server, Gateway Server ...)](#3-config-client-api-server-gateway-server-)
  - [어플리케이션 설정](#어플리케이션-설정)
  - [RefreshScope 어노테이션 추가](#refreshscope-어노테이션-추가)
- [4. Config 변경사항 반영 방법](#4-config-변경사항-반영-방법)
- [참고](#참고)

<br><br>

# 1. Config File(s)

- Git 저장소에 저장되어있는 설정 파일들
  ```yaml
  # examlple-local.yml
  owljoa: "owljoa local"
  ```
  ```yaml
  # example-dev.yml
  owljoa: "owljoa dev"
  ```

<br>

# 2. Config Server

- 설정파일을 원하는 클라이언트에 전달하는 역할

<br>

## 2.1. 빌드 설정(build.gradle)

- spring cloud config 패키지 이용

  - org.springframework.cloud:spring-cloud-config-server

  ```groovy
  // build.gradle (config-server)

  plugins {
  	id 'org.springframework.boot' version '2.5.4-SNAPSHOT'
  	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
  	id 'java'
  }

  group = 'example.owljoa'
  version = '0.0.1-SNAPSHOT'
  sourceCompatibility = '11'

  repositories {
  	mavenCentral()
  	maven { url 'https://repo.spring.io/milestone' }
  	maven { url 'https://repo.spring.io/snapshot' }
  }

  ext {
  	set('springCloudVersion', "2020.0.4-SNAPSHOT")
  }

  dependencies {
  	implementation 'org.springframework.cloud:spring-cloud-config-server'
  	testImplementation 'org.springframework.boot:spring-boot-starter-test'
  }

  dependencyManagement {
  	imports {
  		mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  	}
  }

  test {
  	useJUnitPlatform()
  }
  ```

<br>

## 2.2. config-server 설정 (application.yml)

```yaml
server.port: 8200
spring:
  application.name: config-server
  # 설정파일들이 있는 git 저장소 uri
  cloud.config.server.git.uri: https://github.com/github-user/config-file-example-repository-path
```

<br>

## 2.3. config server 코드 (ConfigServerApplication.java)

- EnableConfigServer 어노테이션 이용

```java
package example.owljoa.configservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@EnableConfigServer
@SpringBootApplication
public class ConfigServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigServiceApplication.class, args);
	}

}
```

<br>

# 3. Config Client (API Server, Gateway Server ...)

- 설정파일 요청 및 사용자 역할

## 어플리케이션 설정

- 2.4.x 버전부터 bootstrap.yml 파일을 사용하지 않고, config.import 프로퍼티를 사용함

  - bootstrap.yml 파일을 사용하려면 spring-boot-starter-bootstrap dependency를 이용할 것

  ```yaml
  # application.yml
  # API 서버 포트 8081
  server:
    port: 8081

  spring:
    profiles:
      include:
  			- local  # local 프로파일 설정을 적용
    # 대상 config server 지정
    config.import: "optional:configserver:http://localhost:8200"
    application:
      name: owljoa # config file name
  management:
    endpoints:
      web:
        exposure:
          include: refresh # refresh endpoint 열기 (변경된 config 적용 용도)
  ```

<br>

## RefreshScope 어노테이션 추가

- config 변경사항 적용할 Bean에 @RefreshScope 어노테이션 추가

  ```java
  package com.github.owljoa.study.sample;

  import org.springframework.beans.factory.annotation.Value;
  import org.springframework.cloud.context.config.annotation.RefreshScope;
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.RestController;

  @RefreshScope
  @RestController
  public class SampleController {
    @Value("${name}")
    private String name;

    @GetMapping("/name")
    public String getName() {
      return "name in config file: " + name;
    }
  }
  ```

<br>

# 4. Config 변경사항 반영 방법

- spring actuator의 refresh endpoint를 노출시켜서 POST 방식으로 호출
  ![config_변경사항_반영_방법](../images/spring_cloud_dynamic_config_1.png)

<br><br>

# 참고

[https://spring.io/guides/gs/centralized-configuration/](https://spring.io/guides/gs/centralized-configuration/)

[https://docs.spring.io/spring-boot/docs/2.0.x/actuator-api/html/](https://docs.spring.io/spring-boot/docs/2.0.x/actuator-api/html/)

[https://godekdls.github.io/Spring Cloud Config/spring-cloud-config-client/](https://godekdls.github.io/Spring%20Cloud%20Config/spring-cloud-config-client/)

[https://spring.io/blog/2020/08/14/config-file-processing-in-spring-boot-2-4](https://spring.io/blog/2020/08/14/config-file-processing-in-spring-boot-2-4)

[http://honeymon.io/tech/2021/01/16/spring-boot-config-data-migration.html](http://honeymon.io/tech/2021/01/16/spring-boot-config-data-migration.html)

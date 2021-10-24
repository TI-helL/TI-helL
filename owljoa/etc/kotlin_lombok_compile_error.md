# Kotlin에서 Lombok 사용하면 발생하는 에러 원인과 해결방향

<br>

- [Kotlin에서 Lombok 사용하면 발생하는 에러 원인과 해결방향](#kotlin에서-lombok-사용하면-발생하는-에러-원인과-해결방향)
- [1. 문제](#1-문제)
  - [1.1. Java와 Kotlin을 함께 사용하는 프로젝트의 간략한 컴파일 과정](#11-java와-kotlin을-함께-사용하는-프로젝트의-간략한-컴파일-과정)
  - [1.2. 컴파일 과정에 발생하는 문제](#12-컴파일-과정에-발생하는-문제)
- [2. 해결할 수 있는 방향들..](#2-해결할-수-있는-방향들)
  - [2.1. 빌드 순서 조정](#21-빌드-순서-조정)
  - [2.2. Java와 Kotlin 코드들을 별도의 모듈로 분리](#22-java와-kotlin-코드들을-별도의-모듈로-분리)
  - [2.3. 빌드 전처리 과정에서 Delombok 실행](#23-빌드-전처리-과정에서-delombok-실행)
  - [2.4. Lombok이 적용된 코드를 Kotlin으로 변환](#24-lombok이-적용된-코드를-kotlin으로-변환)
  - [2.5. Lombok 제거](#25-lombok-제거)
- [3. 참고](#3-참고)

<br><br>

# 1. 문제

- Kotlin 코드내에서 Lombok 코드 사용 시 컴파일 에러 발생

## 1.1. Java와 Kotlin을 함께 사용하는 프로젝트의 간략한 컴파일 과정

1. Kotlin 컴파일러가 Kotlin 코드를 컴파일 →  .class 파일(바이트코드) 생성
    - Kotlin 코드가 참조하는 Java 코드가 함께 로딩되어 사용됨
2. Java 컴파일러가 Java 코드를 컴파일해서 .class 파일 생성
    - Kotlin 컴파일 결과물인 .class 파일의 경로를 클래스 패스에 추가해서 컴파일함

## 1.2. 컴파일 과정에 발생하는 문제

Lombok이 코드를 생성하는 시점은 1.1에서 언급한 2번째 과정 중 Annotation Processing 단계

→ Kotlin 코드가 이미 컴파일된 이후이기 때문에 Kotlin 코드는 Lombok이 생성한 코드를 사용할 수 없게됨...

<br><br>

# 2. 해결할 수 있는 방향들..

- 요약하면 Java와 Kotlin 코드가 따로 컴파일되거나 Kotlin의 고유 기능으로 대체하는 방법이 있다.
    - 따로 컴파일을 하면 결국 Java, Kotlin 사이의 호환성을 이용하지 않게 됨 → Kotlin 언어의 매력 중 하나?를 버리는 셈
- 현재 진행중인 프로젝트의 경우 규모가 크지도 않고 기존 Java 코드를 마이그레이션하는 것이 아니라 신규 개발에 해당하므로 Kotlin의 고유 기능을 사용하는 것으로 결정함..

<br>

## 2.1. 빌드 순서 조정

- Kotlin보다 Java 코드가 먼저 컴파일되도록 빌드 순서를 조정하는 방법
- Java 코드에서 Kotlin 코드를 호출할 수 없게됨

<br>

## 2.2. Java와 Kotlin 코드들을 별도의 모듈로 분리

- 두 언어를 각각 별도의 모듈로 분리해서 컴파일하는 방법
- 언어간의 코드 호출 불가능

<br>

## 2.3. 빌드 전처리 과정에서 Delombok 실행

- Lombok이 제공하는 Delombok 기능을 활용해서 Lombok이 코드를 미리 생성하도록 하는 방법
- Delombok이 Gradle 플러그인을 공식 지원하지 않아서 빌드 구성이 복잡해짐

<br>

## 2.4. Lombok이 적용된 코드를 Kotlin으로 변환

- Lombok을 적용하는 경우는 보통 JPA Entity, DTO 등 데이터를 담는 용도의 클래스임을 이용하여 Kotlin 고유 기능을 대체하는 방법
- Kotlin에서 제공하는 data class를 적용하면 Lombok의 어노테이션을 활용하여 생성하는 constructor, getter, setter, equals, hashCode, toString과 같은 메소드들을 별도로 구현하지 않아도 사용할 수 있음

<br>

## 2.5. Lombok 제거

- Lombok에서 사용한 어노테이션으로 인해 생성된 코드들을 저장소에 반영해서 사용하는 방법
- Lombok에 대한 의존성을 아예 제거할 수 있음

<br><br>

# 3. 참고

[https://sudonull.com/post/70034-Kotlin-bytecode-compilation-and-performance-part-1-INFORION-Blog](https://sudonull.com/post/70034-Kotlin-bytecode-compilation-and-performance-part-1-INFORION-Blog)

[https://d2.naver.com/helloworld/6685007#ch1-3-4](https://d2.naver.com/helloworld/6685007#ch1-3-4)

[https://workingdev.net/2018/06/kotlin-intro-setup-and-hello-world.html](https://workingdev.net/2018/06/kotlin-intro-setup-and-hello-world.html)
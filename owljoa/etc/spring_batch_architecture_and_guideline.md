# Spring Batch 아키텍처와 설계 가이드라인

<br>

## 1. Spring Batch 아키텍처

<br>

### 1.1. Application

- 스프링 배치 사용자(개발자)가 작성한 커스텀 코드, 배치 작업들 포함

<br>

### 1.2. Batch Core

- 배치 작업을 제어하고 실행하는데 필수적인 코어 클래스들 포함
- `JobLauncher`, `Job`, `Step` 의 구현체 포함

<br>

### 1.3. Batch Infrastructure

- Application 개발자들과 core에 의해 사용되는 공통 reader, writer, service들 포함

<br><br>

## 2. 배치 프로세스 설계 가이드라인

- 데이터가 처리되는 물리적 장소와 저장되는 물리적 장소를 가깝게 할 것

  - 통신 등 부수적 과정 최소화

    <br>

- 메모리 내에서 최대한 많은 연산을 수행할 것

  - I/O 등 시스템 리소스 사용 최소화

    <br>

- SQL 구문을 분석해서 불필요한 I/O 여부를 체크할 것

  - 한 번 읽어서 캐시하거나 작업 스토리지에 보관할 수 있는데도 매 트랜잭션마다 데이터를 읽어들이지는 않는지
  - 같은 트랜잭션 내에서 한 번 읽어들인 데이터를 다시 읽어들이지는 않는지
  - 불필요한 테이블(혹은 인덱스) 스캔이 있지는 않는지
  - SQL 구문의 WHERE 절에 key-value가 없는 것은 아닌지

    <br>

- 배치 내에서 같은 일을 두번하지 말 것

  - ex) 리포트를 위한 데이터 요약이 필요하다면, (가능한 경우) 데이터를 처리함과 동시에 집계 및 요약 → 리포팅용 어플리케이션이 같은 데이터에 대해 다시 처리할 필요가 없어짐

    <br>

- 배치 어플리케이션이 시작하는 시점에 메모리를 충분히 할당할 것

  - 프로세스 실행 중에 재할당하면 시간이 오래 걸림

    <br>

- 데이터 무결성 고려할 것

  - 데이터 무결성 유지를 위해 충분한 체크 로직 및 레코드 유효성 검사 추가

    <br>

- Checksum 만들 것

  - 유효성 검사 목적
  - ex) (flat) 파일은 앞부분에 헤더처럼 전체 레코드 수와 키 필드의 집계에 대한 정보를 포함하고 있어야 함

    <br>

- 실제 데이터 볼륨이 있는 프로덕션과 유사한 환경에서 최대한 빠르게 스트레스 테스트를 계획 및 진행할 것

<br><br>

## 3. 참고

- 공식 홈페이지 - [아키텍처](https://docs.spring.io/spring-batch/docs/4.3.x/reference/html/spring-batch-intro.html#springBatchArchitecture)

- 공식 홈페이지 - [가이드라인](https://docs.spring.io/spring-batch/docs/4.3.x/reference/html/spring-batch-intro.html#batchArchitectureConsiderations)

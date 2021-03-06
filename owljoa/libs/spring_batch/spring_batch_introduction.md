# Spring Batch Introduction

<br>

## 1. 소개

<br>

- 안정적인 배치 어플리케이션 개발을 위한 경량화된 종합 배치 프레임워크

- **스케줄링 용도의 프레임워크가 아님!!!**
  - 스케줄러를 대체하는 것이 아니라 스케줄러와 함께 작동하도록 설계됨
  - Quartz, Tivoli, Control-M 등 함께 사용하기 좋은 스케줄러들이 많음

<br>

- 미션 크리티컬 환경에서 대용량 데이터에 대한 비즈니스 연산이 필요한 경우에 적합

  - 사용자 상호작용 없이 대용량 데이터에 대한 자동화된 처리를 요구하는 케이스

    (ex. 월말 결산 혹은 통지와 같이 시간에 기반한 이벤트에 관련된 처리)

  - 대용량 데이터 셋에 대해 반복적으로 수행되어야할 복잡한 비즈니스 규칙

    (ex. 보험 혜택 결정, 요율 조정)의 주기적 적용을 요구하는 케이스

  - 내/외부 시스템으로부터의 기록용 시스템으로 트랜잭션 방식의 정보 통합 작업

    (ex. 포멧팅, 유효성 검사, 데이터 처리)

<br>

- 스프링 프레임워크의 특성을 기반으로 만들어짐
  - 생산성
  - POJO 기반 개발 방식
  - 사용 편의성

<br>

- 사용 예시
  - 파일에서 데이터를 읽어서 DB로 옮기거나 SP(Stored Procedure)를 실행
  - DB간 대용량 데이터 이동 혹은 대용량 데이터에 대한 변환 작업

<br>

## 2. 제공 기능

- 대용량 데이터를 처리하는 데 필수적이고 재사용 가능한 기능 제공
  - 로깅/추적
  - 트랜잭션 관리
  - 작업 처리 통계
  - 작업 재시작/건너뛰기
  - 리소스 관리

<br>

- 매우 많은 양의 데이터에 대한 고성능 배치 작업을 수행할 수 있도록 하는 최적화 및 파티셔닝 기능 제공

<br>

## 참고

공식 홈페이지: [https://spring.io/projects/spring-batch](https://spring.io/projects/spring-batch)

# Lesson 11: Advanced (Enterprise) Features

- [1. Clustering](#1-clustering)
  - [1.1. Clustering with JobStoreTX or JobStoreCMT](#11-clustering-with-jobstoretx-or-jobstorecmt)
  - [1.2. Clustering With TerracottaJobStore](#12-clustering-with-terracottajobstore)
- [2. JTA Transactions](#2-jta-transactions)

<br><br>

# 1. Clustering

<br>

## 1.1. Clustering with JobStoreTX or JobStoreCMT

- 설정파일에서 `org.quartz.jobStore.isClustered` 속성 값을 `true`로 세팅하면 클러스터링이 활성화됨
- 클러스터에 포함되는 각 인스턴스는 같은 `quartz.properties` 파일을 사용해야함
  - 예외로 스레드 풀 크기, `org.quartz.scheduler.instanceId` 속성 값은 달라도됨
  - `instanceId`의 경우 각 노드별로 고유해야함! → 속성값을 `"AUTO"`로 주면 자동으로 고유값이 할당됨
- **(중요) 서로 다른 머신에서 클러스터링을 하려면 먼저 시간을 동기화할 것!!!** ([참고](https://www.nist.gov/pml/time-and-frequency-division/services/internet-time-service-its))
- **(중요) 클러스터링 되지 않은 인스턴스가 다른 인스턴스와 같은 테이블에 접근하여 작업하는 일은 없어야 한다!!!**
  - 의도치 않은 데이터 문제가 일어날 수 있음
- **(중요) 각각의 작업 실행은 하나의 노드에서만 일어나야한다!**

<br>

## 1.2. Clustering With TerracottaJobStore

- TerracottaJobStore를 사용하도록 설정하면 자동으로 클러스터링이 활성화됨
  ```java
  org.quartz.jobStore.class = org.terracotta.quartz.TerracottaJobStore
  org.quartz.jobStore.tcConfigUrl = localhost:9510
  ```
- 자세한 사항은 튜토리얼에 언급되어있지 않음.. (참고하라는 [링크](http://www.terracotta.org/quartz)는 닫혀있는 상태)

<br><br>

# 2. JTA Transactions

- 다음과 같이 설정하면 작업들을 JTA 트랜잭션에 포함시켜서 실행할 수 있다.
  - 모든 작업들에 적용됨
  ```java
  org.quartz.scheduler.wrapJobExecutionInUserTransaction = true
  ```
- 특정 작업들을 지정해서 JTA 트랜잭션에 포함하고 싶다면, `@ExecuteInJTATransaction` 어노테이션을 해당 Job 클래스에 추가한다.
- `JobStoreCMT`를 JobStore로 사용하면 스케줄러 인터페이스에 대한 호출도 트랜잭션에 포함된다.
  - 주의할 점은 스케줄러에서 메소드를 호출하기 이전에 트랜잭션을 시작해야한다는 것
  - `UserTransaction`을 통해서 직접 관리하거나 컨테이너가 관리하는 트랜잭션들을 사용하는 `SessionBean`에 스케줄러를 사용하는 코드를 추가

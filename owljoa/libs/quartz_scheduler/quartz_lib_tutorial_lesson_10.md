# Lesson 10. Configuration, Resource Usage and SchedulerFactory

- Quartz가 동작하기위해 설정되어있어야하는 주요 컴포넌트
  - ThreadPool
  - JobStore → Lesson 9 에서 설명했으므로 생략
  - (필요 시) DataSources → Lesson 9 에서 설명했으므로 생략
  - Scheduler

<br>

---

- [1. ThreadPool](#1-threadpool)
- [2. Scheduler](#2-scheduler)
  - [2.1. StdSchedulerFactory](#21-stdschedulerfactory)
  - [2.2. DirectSchedulerFactory](#22-directschedulerfactory)
- [3. Logging](#3-logging)

---

<br><br>

# 1. ThreadPool

- Quartz가 작업 실행에 사용할 스레드 집합을 제공
- 스케줄러 사용처에 따라 적당한 갯수의 스레드를 사용해야함
  - 리소스가 낭비되지 않도록 최소한의 스레드를 사용할 것
  - 작업들이 예정된 시점에 바로 실행될 수 있도록 충분한 스레드를 사용할 것
- 트리거의 발동 시간이 됐는데 이용 가능한 스레드가 없는 경우, Quartz는 이용 가능한 스레드가 나올 때 까지 일시정지 후 작업을 실행함
  - 이 과정에서 미리 스케줄러에 설정되어있는 불발(misfire) 임계 시간에 도달하면 불발(misfire) 처리될 수 있음

<br><br>

# 2. Scheduler

- 스케줄링을 수행하는 주체
- 생성 시 식별할 이름, RMI(Remote Method Invocation) 설정, JobStore, ThreadPool 인스턴스 필요
- RMI 설정에 포함되는 정보
  - 스케줄러가 자체 RMI 서버로 생성되어야 할지 여부
  - 사용할 호스트와 포트
  - 등등..
- StdSchedulerFactory도 원격 프로세스에서 생성된 스케줄러에 대한 프록시(RMI stubs)용도의 스케줄러 인스턴스를 생성할 수 있음

<br>

## 2.1. StdSchedulerFactory

- SchedulerFactory 인터페이스의 구현체
- java properties를 사용해서 Quartz Scheduler에 대한 초기 설정을 불러옴
- getScheduler() 메소드를 호출하면 간단하게 스케줄러를 생성하고 초기화할 수 있음
  ```java
  Scheduler scheduler = schedulerFactory.getScheduler();
  ```

<br>

## 2.2. DirectSchedulerFactory

- SchedulerFactory 인터페이스의 구현체
- 스케줄러 인스턴스를 코드레벨에서 직접 설정하면서 생성하기 위해 사용
- 보통의 상황에서는 권장하지 않음
  - 내부 구조에 대한 많은 이해가 필요함
  - 스케줄러의 설정을 하드코딩해야함 (선언적 정의 불가)

<br><br>

# 3. Logging

- Quartz는 로깅에 SLF4J 프레임워크를 사용
- 트리거와 작업 실행에 대한 더 많은 정보를 원한다면 _org.quartz.plugins.history.LoggingJobHistoryPlugin, org.quartz.plugins.history.LoggingTriggerHistoryPlugin 사용할 것_

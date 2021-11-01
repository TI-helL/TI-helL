# Lesson 12: 기타 Quartz의 다양한 기능

- [1. Plug-Ins](#1-plug-ins)
- [2. JobFactory](#2-jobfactory)
- [3. Factory-Shipped Jobs](#3-factory-shipped-jobs)

<br><br>

# 1. Plug-Ins

- 추가 기능 플러그인을 위한 인터페이스가 제공됨 (`org.quartz.spi.SchedulerPlugin`)
- Quartz의 기본 제공 플러그인들은 `org.quartz.plugins` 패키지에 포함되어 있음
  - 스케줄러 시작 시 작업 자동 스케줄링 기능, 작업과 트리거 이벤트 히스토리 로깅, JVM 종료 시 스케줄러의 안전한 종료를 보장하는 기능 등등..

<br><br>

# 2. JobFactory

- 트리거가 발도되면 스케줄러에 설정되어있는 `JobFactory`를 통해 해당 트리거에 연결된 Job 인스턴스가 생성됨
  - 디폴트 `JobFactory`는 Job 클래스의 newInstance() 메소드를 호출함
  - IoC나 DI 컨테이너가 Job 인스턴스를 생성 및 초기화하도록 하기 위해 별도의 `JobFactory` 구현체를 만들어야할 수도 있음
    - `org.quartz.spi.JobFactory` 인터페이스를 참고
    - `Scheduler.setJobFactory(...)` 메소드를 이용

<br><br>

# 3. Factory-Shipped Jobs

- Quartz는 유틸리티 Job들도 제공함
  - 작업 내에서 이메일을 보내거나 EJB를 호출하는 등의 기능을 수행
  - `org.quartz.jobs` 패키지에 포함되어있음

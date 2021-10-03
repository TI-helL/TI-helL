# Quartz Library Tutorial Lesson 1 ~ 2

<br>

## Lsson 1: Using Quartz

<br>

- Quartz 기본 사용 과정
  - 스케줄러 생성
  - 스케줄링할 작업(JobDetail) 정의 및 생성
  - 작업의 실행 조건을 부여할 트리거(SimpleTrigger) 생성
  - 스케줄링
    - 작업 실행
  - 스케줄러 종료

<br>

- 스케줄러 인스턴스를 만들기 위해 `SchedulerFactory` 사용
  - 스케줄러는 종료(shutdown) 이후 재시작을 위해서는 인스턴스를 재생성해야함
  - 트리거는 스케줄러가 시작되기 이전이나 일시정지 상태인 경우 적용되지 않음
  - 스케줄러 인스턴스 생성부터 스케줄러에 작업 등록, 스케줄러 시작까지 수행하는 코드 예시

    ```java
    // 스케줄러를 생성할 스케줄러 팩토리 인스턴스 생성
    SchedulerFactory schedulerFactory = new StdSchedulerFactory();

    // 스케줄러 인스턴스 생성
    Scheduler scheduler = schedulerFactory.getScheduler();

    // 미리 만들어둔 DumbJob을 바인딩하여 작업(Job) 생성
    // DumbJob은 quartz의 Job 인터페이스를 간단하게 구현한 클래스
    JobDetail dumbJob = JobBuilder.newJob(DumbJob.class)
        .withIdentity("dumbJob", "dumbGroup1")
        .build();

    // 작업이 바로 시작되고, 3초 간격으로 4회 반복하도록 트리거 정의
    SimpleTrigger dumbTrigger = TriggerBuilder.newTrigger()
        .withIdentity("dumbTrigger", "dumbGroup1")
        .startNow()
        .withSchedule(SimpleScheduleBuilder.simpleSchedule()
            .withIntervalInSeconds(3)
            .withRepeatCount(4))
        .build();

    // job과 trigger를 이용해서 스케줄링
    scheduler.scheduleJob(job, trigger);

    // 스케줄러 시작
    scheduler.start();
    ```

<br>

## Lesson 2: The Quartz API, Jobs and Triggers

<br>

## 2.1. The Quartz API

<br>

- 주요 인터페이스
  - Scheduler: 스케줄러와 상호작용하는 주요 API
  - Job: 스케줄러를 이용해서 실행되길 원하는 컴포넌트에 의해 구현될 인터페이스
  - JobDetail: Job의 인스턴스를 정의하기위해 사용
  - Trigger: 주어진 작업이 실행될 조건(일정)을 정의하는 컴포넌트
  - JobBuilder: JobDetail 인스턴스의 정의 및 생성에 사용
  - TriggerBuilder: Trigger 인스턴스의 정의 및 생성에 사용

<br>

- `Scheduler`의 라이프 사이클
  - `SchedulerFactory` 를 통해 생성되는 시점부터 `shutdown()` 메소드가 호출되는 시점까지 동작
  - 생성된 이후에는 Job과 Trigger를 추가/제거 및 리스트 조회하는 기능이나 스케줄링 관련 기능(ex. Trigger 일시 정지)의 용도로 사용 될 수 있음
    - `Scheduler` 는 `start()` 메소드로 실행되기 이전까지 트리거를 실제로 적용하지 않음

<br>

- 인스턴스 생성을 위한 Builder 클래스 제공
  - `JobDetail` ← `JobBuilder`

    ```java
    // 작업(Job)을 정의하고 HelloJob class에 바인딩
    JobDetail job = JobBuilder.newJob(HelloJob.class)
        .withIdentity("job1", "group1")
        .build();
    ```

  - `Trigger` ← `TriggerBuilder`
    - `Schedule` ← `SimpleScheduleBuilder`

      ```java
      // 작업이 바로 시작되고, 매 20초마다 반복되도록 트리거 정의
      Trigger trigger = TriggerBuilder.newTrigger()
          .withIdentity("trigger1", "group1")
          .startNow()
          .withSchedule(SimpleScheduleBuilder.simpleSchedule()
              .withIntervalInSeconds(20)
              .repeatForever())
          .build();
      ```

<br>

## 2.2. Jobs and Triggers

<br>

### 2.2.1. 작업은 `Job` 인터페이스를 구현해서 생성

<br>

- `Job` 인터페이스
  - 어떤 작업을 수행할지 execute 메소드 내에 구현
  - 연결된 트리거가 발동되면, 스케줄러의 작업 쓰레드 중 하나가 `execute(...)` 메소드를 호출
  - `JobExecutionContext` 객체는 작업 인스턴스에 실행환경(스케줄러, 트리거, 작업(JobDetail) 객체 등)에 대한 정보를 제공

  <br>

- 간단한 `Job` 구현체 - `HelloJob` 예시

    ```java
    import org.quartz.Job;
    import org.quartz.JobExecutionContext;
    import org.quartz.JobExecutionException;

    public class DumbJob implements Job {

      @Override
      public void execute(JobExecutionContext context) throws JobExecutionException {
        System.out.println("Tutorial Lesson 3 - Hello DumbJob");
      }
    }
    ```

<br>

### 2.2.2. `JobDetail` 객체

<br>

- 작업 인스턴스 정의
- 작업이 스케줄러에 등록되는 시점에 생성됨
- 작업에 대한 다양한 설정을 포함
  - ex) `JobDataMap` - 작업 인스턴스의 상태 정보 저장

<br>

### 2.2.3. `Trigger` 객체

- 작업 실행을 유발하는 용도
- 작업 실행 일정을 포함
- `JobDataMap`도 포함 - 작업에 파라미터 전달
- 다양한 트리거가 있지만 보통은 두 가지만 사용
  - `SimpleTrigger`
    - 특정 시점에 한 번(one-shot)만 실행할 작업에 유용
    - ex) 주어진 시간에 실행하고 작업 내용을 N번 반복하며 작업과 작업 사이에는 T만큼 지연
  - `CronTrigger`
    - 주기적 작업에 유용
    - ex) 매주 금요일 정오 / 매월 10일 10시 15분

<br>

### 2.2.4. `Job`과 `Trigger`를 나눠놓은 이유

- `Job`을 `Trigger`와는 별개로 생성하고 스케줄러에 저장해둘 수 있음
- 같은 `Job`을 여러 개의 `Trigger`와 연관지어 스케줄링 가능
- 특정 `Job`에 연결된 `Trigger`가 만료된 이후에도 해당 `Job`을 재정의하지 않고 다시 스케줄링 가능
  - 비슷하게, 특정 `Job`을 재정의하지 않고 `Trigger` 교체나 수정 가능

<br>

## 2.3. Identities

- Job, Trigger를 스케줄러에 등록할 때 식별 가능한 키가 주어짐
  - 각 인스턴스 생성 시 `withIdentity(...)` 메소드로 이름과 그룹명을 부여함
  - 하나의 그룹 내에서 이름들은 고유해야함

      → 키: 그룹.이름 (그룹과 이름의 조합 - 고유한 키)

      → ex) group1.job1

      ```java
      // 작업(Job)에 group1 그룹에 포함시키고 job1 이라는 이름 부여
      JobDetail job = JobBuilder.newJob(HelloJob.class)
          .withIdentity("job1", "group1")
          .build();

      // Trigger에 group1 그룹에 포함시키고 trigger1 이라는 이름 부여
      Trigger trigger = TriggerBuilder.newTrigger()
          .withIdentity("trigger1", "group1")
          .startNow()
          .withSchedule(SimpleScheduleBuilder.simpleSchedule()
              .withIntervalInSeconds(20)
              .repeatForever())
          .build();
      ```

<br><br>

## 참고 링크

[http://www.quartz-scheduler.org/documentation/2.3.1-SNAPSHOT/tutorials/](http://www.quartz-scheduler.org/documentation/2.3.1-SNAPSHOT/tutorials/)
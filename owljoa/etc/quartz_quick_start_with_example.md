# Quartz Quick Start Guide

<br>

## 1. 설치 (다운로드)

- gradle java project 기준

<br>

### 1.1. standalone 배포 패키지

- http://www.quartz-scheduler.org/downloads

<br>

### 1.2. Maven Dependency

```XML
<!-- Quartz Core -->
<dependency>
  <groupId>org.quartz-scheduler</groupId>
  <artifactId>quartz</artifactId>
  <version>2.4.0-SNAPSHOT</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.30</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-simple -->
<dependency>
   <groupId>org.slf4j</groupId>
   <artifactId>slf4j-simple</artifactId>
   <version>1.7.30</version>
</dependency>
```

<br>

### 1.3. Gradle Dependency

```Groovy
dependencies {
  ...

  // https://mvnrepository.com/artifact/org.quartz-scheduler/quartz
  implementation group: 'org.quartz-scheduler', name: 'quartz', version: '2.3.2'

  // https://mvnrepository.com/artifact/org.slf4j/slf4j-api
  implementation group: 'org.slf4j', name: 'slf4j-api', version: '1.7.30'
  // https://mvnrepository.com/artifact/org.slf4j/slf4j-simple
  implementation group: 'org.slf4j', name: 'slf4j-simple', version: '1.7.30'

  ...
}
```

---

<br><br>

## 2. 예제

<br>

### 2.1. 스케줄러 인스턴스 생성, 시작, 종료

- `StdSchedulerFactory.getDefaultScheduler()` 로 스케줄러 인스턴스를 생성하면, `scheduler.shutdown()` 호출 이전까지 어플리케이션이 종료되지 않음

  -> 스케줄러 관련 쓰레드가 남아서 동작하기 때문

  ```java
  import org.quartz.Scheduler;
  import org.quartz.SchedulerException;
  import org.quartz.impl.StdSchedulerFactory;

  public class QuartzStudyApplication {

    public static void main(String[] args) {
      try {
        // 스케줄러 인스턴스 생성
        Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

        // 스케줄러 시작
        scheduler.start();

        // 스케줄러 종료
        scheduler.shutdown();
      } catch (SchedulerException se) {
        se.printStackTrace();
      }
    }
  }
  ```

<br>

<details>

  <summary>
  <font size="3">실행결과</font>
  </summary>

- 로깅에 대한 셋업이 되어있지 않으면 모든 로그는 다음과 같이 콘솔로 출력됨

  ```log
  [main] INFO org.quartz.impl.StdSchedulerFactory - Using default implementation for ThreadExecutor
  [main] INFO org.quartz.simpl.SimpleThreadPool - Job execution threads will use class loader of thread: main
  [main] INFO org.quartz.core.SchedulerSignalerImpl - Initialized Scheduler Signaller of type: class org.quartz.core.SchedulerSignalerImpl
  [main] INFO org.quartz.core.QuartzScheduler - Quartz Scheduler v.2.3.2 created.
  [main] INFO org.quartz.simpl.RAMJobStore - RAMJobStore initialized.
  [main] INFO org.quartz.core.QuartzScheduler - Scheduler meta-data: Quartz Scheduler (v2.3.2) 'DefaultQuartzScheduler' with instanceId 'NON_CLUSTERED'
    Scheduler class: 'org.quartz.core.QuartzScheduler' - running locally.
    NOT STARTED.
    Currently in standby mode.
    Number of jobs executed: 0
    Using thread pool 'org.quartz.simpl.SimpleThreadPool' - with 10 threads.
    Using job-store 'org.quartz.simpl.RAMJobStore' - which does not support persistence. and is not clustered.

  [main] INFO org.quartz.impl.StdSchedulerFactory - Quartz scheduler 'DefaultQuartzScheduler' initialized from default resource file in Quartz package: 'quartz.properties'
  [main] INFO org.quartz.impl.StdSchedulerFactory - Quartz scheduler version: 2.3.2
  [main] INFO org.quartz.core.QuartzScheduler - Scheduler DefaultQuartzScheduler_$_NON_CLUSTERED started.
  [main] INFO org.quartz.core.QuartzScheduler - Scheduler DefaultQuartzScheduler_$_NON_CLUSTERED shutting down.
  [main] INFO org.quartz.core.QuartzScheduler - Scheduler DefaultQuartzScheduler_$_NON_CLUSTERED paused.
  [main] INFO org.quartz.core.QuartzScheduler - Scheduler DefaultQuartzScheduler_$_NON_CLUSTERED shutdown complete.
  ```

</details>

<br><br>

### 2.2. 20초마다 실행되는 Job 스케줄링

- 작업 클래스 (HelloJob) 추가

  - quartz의 Job 인터페이스 구현

  ```java
  import org.quartz.Job;
  import org.quartz.JobExecutionContext;
  import org.quartz.JobExecutionException;

  public class HelloJob implements Job {

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
      System.out.println("Simple Example - HelloJob");
    }
  }
  ```

- 스케줄러의 `start()`와 `shutdown()` 호출 사이에 코드 추가

  - 작업을 정의하는 코드
  - 트리거를 정의하는 코드
  - 작업을 트리거와 함께 스케줄러에 등록하는 코드
  - 트리거가 발생하고 작업이 실행될 시간을 벌기 위해 메인 쓰레드를 잠시 멈추는 코드

  <br>

  ```java
  import org.quartz.JobBuilder;
  import org.quartz.JobDetail;
  import org.quartz.Scheduler;
  import org.quartz.SchedulerException;
  import org.quartz.SimpleScheduleBuilder;
  import org.quartz.Trigger;
  import org.quartz.TriggerBuilder;
  import org.quartz.impl.StdSchedulerFactory;

  public class QuartzStudyApplication {

    public static void main(String[] args) {
      try {
        // 스케줄러 인스턴스 생성
        System.out.println("스케줄러 생성 시작");
        Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();
        System.out.println("스케줄러 생성 완료");

        // 스케줄러 시작
        System.out.println("스케줄러 시작");
        scheduler.start();
        System.out.println("스케줄러 시작 완료");

        // 작업(Job)을 정의하고 HelloJob class에 바인딩
        JobDetail job = JobBuilder.newJob(HelloJob.class)
            .withIdentity("job1", "group1")
            .build();

        // 작업이 바로 시작되고, 매 20초마다 반복되도록 트리거 정의
        Trigger trigger = TriggerBuilder.newTrigger()
            .withIdentity("trigger1", "group1")
            .startNow()
            .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                .withIntervalInSeconds(20)
                .repeatForever())
            .build();

        // job과 trigger를 이용해서 스케줄링
        scheduler.scheduleJob(job, trigger);

        // 스케줄러 종료 이전에 job이 여러 번 트리거되고 실행되도록 메인 쓰레드 동작 60초간 정지
        Thread.sleep(60000);

        // 스케줄러 종료
        System.out.println("스케줄러 종료");
        scheduler.shutdown();
        System.out.println("스케줄러 종료 완료");
      } catch (SchedulerException | InterruptedException se) {
        se.printStackTrace();
      }
    }
  }
  ```

<br>

<details>

  <summary>
  <font size="3">실행결과</font>
  </summary>

- 작업이 스케줄러에 등록됨과 동시에 트리거 발생 및 작업 한 번 실행
- 이후 20초 마다 작업이 실행되므로 메인 쓰레드가 정지된 60초간 총 4번 실행됨을 확인할 수 있음

  ```log
  스케줄러 생성 시작
  [main] INFO org.quartz.impl.StdSchedulerFactory - Using default implementation for ThreadExecutor
  [main] INFO org.quartz.simpl.SimpleThreadPool - Job execution threads will use class loader of thread: main
  [main] INFO org.quartz.core.SchedulerSignalerImpl - Initialized Scheduler Signaller of type: class org.quartz.core.SchedulerSignalerImpl
  [main] INFO org.quartz.core.QuartzScheduler - Quartz Scheduler v.2.3.2 created.
  [main] INFO org.quartz.simpl.RAMJobStore - RAMJobStore initialized.
  [main] INFO org.quartz.core.QuartzScheduler - Scheduler meta-data: Quartz Scheduler (v2.3.2) 'DefaultQuartzScheduler' with instanceId 'NON_CLUSTERED'
    Scheduler class: 'org.quartz.core.QuartzScheduler' - running locally.
    NOT STARTED.
    Currently in standby mode.
    Number of jobs executed: 0
    Using thread pool 'org.quartz.simpl.SimpleThreadPool' - with 10 threads.
    Using job-store 'org.quartz.simpl.RAMJobStore' - which does not support persistence. and is not clustered.

  [main] INFO org.quartz.impl.StdSchedulerFactory - Quartz scheduler 'DefaultQuartzScheduler' initialized from default resource file in Quartz package: 'quartz.properties'
  [main] INFO org.quartz.impl.StdSchedulerFactory - Quartz scheduler version: 2.3.2
  [main] INFO org.quartz.core.QuartzScheduler - Scheduler DefaultQuartzScheduler_$_NON_CLUSTERED started.
  스케줄러 생성 완료
  스케줄러 시작
  스케줄러 시작 완료
  Simple Example - HelloJob
  Simple Example - HelloJob
  Simple Example - HelloJob
  Simple Example - HelloJob
  스케줄러 종료
  스케줄러 종료 완료
  [main] INFO org.quartz.core.QuartzScheduler - Scheduler DefaultQuartzScheduler_$_NON_CLUSTERED shutting down.
  [main] INFO org.quartz.core.QuartzScheduler - Scheduler DefaultQuartzScheduler_$_NON_CLUSTERED paused.
  [main] INFO org.quartz.core.QuartzScheduler - Scheduler DefaultQuartzScheduler_$_NON_CLUSTERED shutdown complete.
  ```

</details>

# Quarz Library Tutorial Lesson 3

<br>

## Lesson 3: More About Jobs and Job Details

<br>

- 스케줄러가 작업을 실행할 때 마다 해당 Job 구현체의 인스턴스를 새로 생성 후 해당 인스턴스의 execute(...) 메소드를 호출함
  - 작업 실행이 완료된 **인스턴스는 참조가 제거되고** Garbage Collecting 대상으로 처리
  - 기본 JobFactory 구현체를 사용하는 경우 Job 구현체에는 인자가 없는 생성자(no-args constructor)가 필요
  - Job 구현체에 상태를 나타내는 필드가 존재할 수 없음

      → 인스턴스가 계속 재생성되기 때문에 필드도 계속 초기화

<br>

### 3.1. 작업에 외부 파라미터 전달

<br>

#### 3.1.1. JobDataMap

<br>

- 작업 실행 시 JobDetail 혹은 Trigger에서 Job 인스턴스에 전달할 데이터들을 포함
- Java의 Map 인터페이스를 구현한 구현체
  - 프리미티브 타입의 데이터를 저장/조회하기 위해 몇가지 메소드가 더 추가됨
- `JobDataMap` 데이터 입력 방법
  - JobDetail 혹은 Trigger 생성 시 `usingJobData(key, value)` 메소드를 호출하여 입력

      ```java
      // QuartzApplication.java

      ...

      // 작업 정의 및 DumbJob 클래스에 바인딩
      JobDetail dumbJob = JobBuilder.newJob(DumbJob.class)
        .withIdentity("dumbJob", "group1")
        .usingJobData("jobSays", "Hello World!") // jobSays를 key로 Hello World!를 값으로 데이터 입력
        .usingJobData("myFloatValue", 3.141f)
        .build();

      ...
      ```
  
  <br>

  - JobDetail 혹은 Trigger 생성 이후 해당 객체의 JobDataMap을 직접 수정

      ```java
      // QuartzApplication.java

      ...

      // 작업 정의
      JobDetail dumbJob = JobBuilder.newJob(DumbJob.class)
          .withIdentity("dumbJob", "dumbGroup1")
          .build();

      // dumbJob에 초기화 파라미터 전달
      dumbJob.getJobDataMap().put(DumbJob.JOB_SAYS, "HELLO");
      dumbJob.getJobDataMap().put(DumbJob.EXECUTION_COUNT, 1);

      ...

      // DumbJob.java
      public class DumbJob implements Job {
        // DumbJob에서 사용할 파라미터 이름 정의
        public static final String JOB_SAYS = "jobSays";
        public static final String EXECUTION_COUNT = "executionCount";

        @Override
        public void execute(JobExecutionContext context) throws JobExecutionException {
          ...
        }
      }
      ```

- 작업 실행 중에 `JobDataMap`의 데이터 조회 예시
  - `JobExecutionContext`의 객체에 포함된 `JobDetail` 혹은 `Trigger`를 추출하고 해당 객체 내의 `JobDataMap`을 조회

  ```java
  package job;

  import org.quartz.DisallowConcurrentExecution;
  import org.quartz.Job;
  import org.quartz.JobDataMap;
  import org.quartz.JobExecutionContext;
  import org.quartz.JobExecutionException;
  import org.quartz.JobKey;

  public class DumbJob implements Job {

    // DumbJob에만 해당하는 파라미터 이름 정의
    public static final String JOB_SAYS = "jobSays";
    public static final String EXECUTION_COUNT = "executionCount";

    // 작업 인스턴스(DumbJob 객체)는 execute 메소드 실행 후 계속 재생성되기 때문에
    // non-static 멤버 변수들은 상태를 유지하거나 유지하기 위해 사용할 수 없음
    float myFloatValue;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
      System.out.println("Tutorial Lesson 3 - Hello DumbJob");

      JobKey key = context.getJobDetail().getKey();

      // JobDetail에서 전달된 데이터맵(JobDataMap)을 가져옴
      JobDataMap dataMap = context.getJobDetail().getJobDataMap();

      // 데이터맵에서 전달된 데이터 추출
      int count = dataMap.getInt(EXECUTION_COUNT);
      String jobSays = dataMap.getString(JOB_SAYS);

      // 전달된 데이터 변경
      String newJobSays = jobSays + " ~ ";
      count++;

      // 변경된 데이터를 데이터맵에 적용
      dataMap.put(JOB_SAYS, newJobSays);
      dataMap.put(EXECUTION_COUNT, count);

      System.out.println("============================");
      System.out.println("Instance: " + key);
      System.out.println("jobSays: " + newJobSays);
      System.out.println("count: " + count);
    }
  }
  ```

  <details>

  <summary>
  실행 결과
  </summary>

  ```java
  ...

  Tutorial Lesson 3 - Hello DumbJob
  ============================
  Instance: dumbGroup1.dumbJob
  jobSays: HELLO ~ 
  count: 2
  Tutorial Lesson 3 - Hello DumbJob
  ============================
  Instance: dumbGroup1.dumbJob
  jobSays: HELLO ~ 
  count: 2

  ...
  ```

  </details>

<br>

#### 3.1.2. JobDetail과 Trigger의 JobDataMap 병합 객체

  <br>

- `JobExecutionContext`는 `JobDetail`과 `Trigger`에서 각각 입력된 `JobDataMap` 가 병합된 객체도 제공
  - 키 이름이 같은 경우 Trigger의 입력 데이터가 JobDetail의 입력 데이터를 대체함
  - JobDetail과 Trigger의 JobDataMap이 병합된 객체 접근 예시

    ```java
    ...

    // dumbJob에 초기화 파라미터 전달
    dumbJob.getJobDataMap().put(DumbJob.JOB_SAYS, "HELLO");
    dumbJob.getJobDataMap().put(DumbJob.EXECUTION_COUNT, 1);

    // dumbTrigger에 초기화 파라미터 전달
    dumbTrigger.getJobDataMap().put(DumbJob.JOB_SAYS, "HELLO DUMB TRIGGER");

    ...
    ```

    ```java
    // DumbJob.java
    package job;

    import org.quartz.DisallowConcurrentExecution;
    import org.quartz.Job;
    import org.quartz.JobDataMap;
    import org.quartz.JobExecutionContext;
    import org.quartz.JobExecutionException;
    import org.quartz.JobKey;

    //@PersistJobDataAfterExecution
    @DisallowConcurrentExecution
    public class DumbJob implements Job {

      // DumbJob에만 해당하는 파라미터 이름 정의
      public static final String JOB_SAYS = "jobSays";
      public static final String EXECUTION_COUNT = "executionCount";

      // 작업 인스턴스(DumbJob 객체)는 execute 메소드 실행 후 계속 재생성되기 때문에
      // non-static 멤버 변수들은 상태를 유지하거나 유지하기 위해 사용할 수 없음
      float myFloatValue;

      @Override
      public void execute(JobExecutionContext context) throws JobExecutionException {
        ...

        // JobExecutionContext에서 전달된 데이터맵들의 병합된 객체를 가져옴
        JobDataMap dataMap = context.getMergedJobDataMap();

        // 데이터맵에서 전달된 데이터 추출
        int count = dataMap.getInt(EXECUTION_COUNT);
        String jobSays = dataMap.getString(JOB_SAYS);

        ...
      }
    }
    ```

    <br>

    <details>

    <summary>
    실행 결과
    </summary>

    ```java
    ...

    Tutorial Lesson 3 - Hello DumbJob
    ============================
    Instance: dumbGroup1.dumbJob
    jobSays: HELLO DUMB TRIGGER ~ 
    count: 2

    ...
    ```

  </details>

<br>

#### 3.1.3. 필드 인젝션

<br>

- JobDataMap내에 입력된 키(key)의 이름에 맞게 Job 클래스에 setter 메소드 추가
  - JobFactory가 Job 인스턴스가 생성될 때 해당 setter를 호출해서 JobDataMap에서 키에 해당하는 값을 삽입
- ex) JobDataMap에 JobSays라는 이름의 키로 데이터를 입력한 경우 setter

    → setJobSays(String val)

- execute(...) 메소드 내에서 값을 명시적으로 가져올 필요가 없음
- 예시

    ```java
    package job;

    import java.util.ArrayList;
    import java.util.Date;
    import org.quartz.Job;
    import org.quartz.JobDataMap;
    import org.quartz.JobExecutionContext;
    import org.quartz.JobExecutionException;
    import org.quartz.JobKey;

    public class DumbJob implements Job {

      // JobDataMap으로 전달될 필드 정의
      String jobSays;

      @Override
      public void execute(JobExecutionContext context) throws JobExecutionException {
        System.out.println("Tutorial Lesson 3 - Hello DumbJob");

        JobKey key = context.getJobDetail().getKey();

        // JobDetail과 Trigger의 JobDataMap을 병합한 형태의 객체를 가져옴
        JobDataMap dataMap = context.getMergedJobDataMap();

        System.out.println("Instance " + key + " of DumbJob says: " + jobSays);
      }

      // 필드에 대한 Setter 정의
      public void setJobSays(String jobSays) {
        this.jobSays = jobSays;
      }
    }
    ```

<br>

#### 3.1.4. 직렬화 문제

<br>

- 직렬화로 인해 클래스의 버전에 따른 문제가 있을 수 있으므로 persistent JobStore를  사용할 때는 JobDataMap에 입력하는 데이터의 타입에 대한 주의 필요
  - 표준 자바 타입들은 안전
  - 표준 자바 타입이 아닌 경우 이미 직렬화된 데이터가 있을 경우 클래스 정의를 변경할 때 호환성에 주의할 것
  - JDBC-JobStore와 JobDataMap을 프리미티브와 String 타입만 허용하도록 하는  모드로 사용하는 것도 직렬화 문제를 방지하는 하나의 옵션

<br>

### 3.2. Job "Instances"

<br>

#### 3.2.1. 작업 상태와 동시성 관련 어노테이션

<br>

- @DisallowConcurrentExecution
  - 같은 작업 인스턴스(JobDetail)들이 동시에 실행되지 않도록 설정
  - 같은 작업 인스턴스의 기준은 Job의 인스턴스가 아닌 JobDetail)
  - ex) 하나의 JobDetail(작업)에 여러 개의 Trigger가 연결되어 있는 경우에 동시성 문제(race condition) 발생 방지
- @PersistJobDataAfterExecution
  - 예외상황 없이 작업(JobDetail) 실행 완료 이후에 JobDataMap내의 데이터를 업데이트하고, 동일한 작업의 다음 실행은 초기값이 아닌 업데이트된 값을 전달받도록 함
  - @PersistJobDataAfterExecution를 사용하는 경우 @DisallowConcurrentExecution을 사용하는 것을 권장
    - 동일한 작업(JobDetail)의 두 인스턴스가 동시에 실행되는 경우 저장된 데이터의 race condition 발생 방지를 위함
  - 예시
    - 실행 카운트(EXECUTION_COUNT)에 해당하는 파라미터가 작업의 실행마다 초기화돼서 증가하지 않았던 이전 예시코드에 `@PersistJobDataAfterExecution` 어노테이션만 추가

    ```java
    // DumbJob.java

    ...

    @PersistJobDataAfterExecution
    public class DumbJob implements Job {
      ...
    }
    ```

    - 실행 결과
      - 작업 실행 완료 시점마다 초기 jobSays의 전달값인 HELLO 문자열에 '~' 문자가 붙는 것을 확인할 수 있음
      - 작업 실행 완료 시점마다 초기 전달값인 2에서 값이 1씩 증가하는 것을 확인할 수 있음

      ```java
      Tutorial Lesson 3 - Hello DumbJob
      ============================
      Instance: dumbGroup1.dumbJob
      jobSays: HELLO ~ 
      count: 2
      Tutorial Lesson 3 - Hello DumbJob
      ============================
      Instance: dumbGroup1.dumbJob
      jobSays: HELLO ~  ~ 
      count: 3
      Tutorial Lesson 3 - Hello DumbJob
      ============================
      Instance: dumbGroup1.dumbJob
      jobSays: HELLO ~  ~  ~ 
      count: 4
      Tutorial Lesson 3 - Hello DumbJob
      ============================
      Instance: dumbGroup1.dumbJob
      jobSays: HELLO ~  ~  ~  ~ 
      count: 5
      Tutorial Lesson 3 - Hello DumbJob
      ============================
      Instance: dumbGroup1.dumbJob
      jobSays: HELLO ~  ~  ~  ~  ~ 
      count: 6
      ```

<br>

#### 3.2.2. 작업 인스턴스(JobDetail)에 설정 가능한 속성

<br>

- JobDetail 정의 시점에 설정 추가
- Durability
  - 별도로 설정하지 않으면 durable 설정의 default 값은 false
  - non-durable한 작업: 동작 가능한 트리거가 없어지면 스케줄러에서 제거됨
  - durable한 작업: 동작 가능한 트리거가 없어도 스케줄러에 유지
  - 설정 예시

      ```java
      ...

      // 작업 정의
      JobDetail dumbJob = JobBuilder.newJob(DumbJob.class)
          .withIdentity("dumbJob", "dumbGroup1")
          .storeDurably() // durable 하도록 설정
          .build();

      ...
      ```

<br>

- RequestsRecovery
  - 별도로 설정하지 않으면 RequestsRecovery 설정의 default 값은 false
  - 작업 실행 도중에 스케줄러의 강제 종료가 발생하면, 스케줄러가 다시 시작됐을 때 해당 작업을 재실행
    - 강제종료 예: 스케줄러가 속해있는 프로세스가 종료(crash)되거나 머신이 종료되는 상황
    - 재실행되는 경우 JobExecutionContext.isRecovering() 메소드가 true를 반환
  - 예시

      ```java
      ...

      // 작업 정의
      JobDetail dumbJob = JobBuilder.newJob(DumbJob.class)
          .withIdentity("dumbJob", "dumbGroup1")
          .requestRecovery() // requestRecovery 하도록 설정
          .build();

      ...
      ```

<br>

#### 3.2.3. JobExecutionException

<br>

- `Job.execute(...)` 메소드 내에서는 throw할 수 있는 예외 타입은 JobExecutionException 하나만 허용됨
  - 보통 execute 메소드 내용 전체를 try-catch 구문으로 묶어서 사용하는 것을 권장
  - 스케줄러에 예외 처리 방법을 지정하기 위해 JobExecutionException 도큐먼트 잘 읽어보고 사용하는 것을 권장
      ([http://www.quartz-scheduler.org/api/2.3.1-SNAPSHOT/](http://www.quartz-scheduler.org/api/2.3.1-SNAPSHOT/))

<br><br>

## 참고 링크

[http://www.quartz-scheduler.org/documentation/2.3.1-SNAPSHOT/tutorials/](http://www.quartz-scheduler.org/documentation/2.3.1-SNAPSHOT/tutorials/)
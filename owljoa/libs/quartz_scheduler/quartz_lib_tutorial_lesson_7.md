# Lesson 7: TriggerListeners and JobListeners

- [1. TriggerListener](#1-triggerlistener)
- [2. JobListener](#2-joblistener)
- [3. Listener 등록 예시](#3-listener-등록-예시)
  - [3.1. DumbJobListener](#31-dumbjoblistener)
  - [3.2. 스케줄러에 등록](#32-스케줄러에-등록)

<br><br>

# 1. TriggerListener

- 트리거에 관련된 이벤트 수신
  - ex) 트리거 발동, 트리거 불발(mis-firing), 트리거 완료(트리거에 의해 실행된 작업의 완료) 등
- TriggerListener 인터페이스

  ```java
  package org.quartz;

  import org.quartz.Trigger.CompletedExecutionInstruction;

  public interface TriggerListener {
  		// Listener의 이름을 얻어오는 메소드
      String getName();
  		// 트리거 발동 이벤트 처리 메소드
      void triggerFired(Trigger trigger, JobExecutionContext context);
  		// 트리거 발동 이벤트 처리 메소드인데, true를 반환하면 작업을 실행하지 않음
  		// (triggerFired 메소드가 실행된 이후에 실행됨)
      boolean vetoJobExecution(Trigger trigger, JobExecutionContext context);
  		// 트리거 불발 이벤트 처리 메소드
      void triggerMisfired(Trigger trigger);
  		// 트리거 완료 이벤트 처리 메소드
      void triggerComplete(Trigger trigger, JobExecutionContext context,
              CompletedExecutionInstruction triggerInstructionCode);
  }
  ```

<br>

- `TriggerListener` 인터페이스의 모든 메소드를 구현하지 않도록 `TriggerListenerSupport` 가 제공됨

  - `TriggerListener` 인터페이스 메소드들을 빈 껍데기로 구현해놓은 추상 클래스
  - `getName()` 메소드는 구현되어있지 않으므로 반드시 구현해야함

  ```java
  package org.quartz.listeners;

  import org.slf4j.Logger;
  import org.slf4j.LoggerFactory;
  import org.quartz.TriggerListener;
  import org.quartz.Trigger;
  import org.quartz.JobExecutionContext;
  import org.quartz.Trigger.CompletedExecutionInstruction;

  public abstract class TriggerListenerSupport implements TriggerListener {
      private final Logger log = LoggerFactory.getLogger(getClass());

      protected Logger getLog() {
          return log;
      }

      public void triggerFired(Trigger trigger, JobExecutionContext context) {
      }

      public boolean vetoJobExecution(Trigger trigger, JobExecutionContext context) {
          return false;
      }

      public void triggerMisfired(Trigger trigger) {
      }

      public void triggerComplete(
          Trigger trigger,
          JobExecutionContext context,
          CompletedExecutionInstruction triggerInstructionCode) {
      }
  }
  ```

<br><br>

# 2. JobListener

- 작업에 관련된 이벤트 수신
  - ex) 작업실행 직전 알림, 작업실행 직후 알림
- `JobListener` 인터페이스

  ```java
  package org.quartz;

  public interface JobListener {
  		// Listener의 이름을 얻어오는 메소드
      String getName();
  		// 작업실행 직전 알림 이벤트 처리 메소드
  		// TriggerListener에 의해 거부된 작업의 경우 호출되지 않음
      void jobToBeExecuted(JobExecutionContext context);
  		// TriggerListener에 의해 거부된 작업실행 직전 알림 이벤트 처리 메소드
      void jobExecutionVetoed(JobExecutionContext context);
  		// 작업실행 직후 알림 이벤트 처리 메소드
      void jobWasExecuted(JobExecutionContext context,
              JobExecutionException jobException);
  }
  ```

<br>

- `JobListener` 인터페이스의 모든 메소드를 구현하지 않도록 `JobListenerSupport` 가 제공됨

  - `JobListener` 인터페이스 메소드들을 빈 껍데기로 구현해놓은 추상 클래스
  - `getName()` 메소드는 구현되어있지 않으므로 반드시 구현해야함

  ```java
  package org.quartz.listeners;

  import org.slf4j.Logger;
  import org.slf4j.LoggerFactory;
  import org.quartz.JobListener;
  import org.quartz.JobExecutionContext;
  import org.quartz.JobExecutionException;

  public abstract class JobListenerSupport implements JobListener {
      private final Logger log = LoggerFactory.getLogger(getClass());

      protected Logger getLog() {
          return log;
      }

      public void jobToBeExecuted(JobExecutionContext context) {
      }

      public void jobExecutionVetoed(JobExecutionContext context) {
      }

      public void jobWasExecuted(JobExecutionContext context, JobExecutionException jobException) {
      }
  }
  ```

<br><br>

# 3. Listener 등록 예시

- Listener를 스케줄러에 등록하는 방법은 `JobListener`와 `TriggerListener`가 모두 동일하므로 `JobListener`에 대해서만 설명한다.

<br>

## 3.1. DumbJobListener

- `JobListenerSupport`를 상속하여 `DumbJobListener` 클래스 생성

```java
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.listeners.JobListenerSupport;

public class DumbJobListener extends JobListenerSupport {

  @Override
  public String getName() {
    return "dumbJobListener";
  }

  @Override
  public void jobToBeExecuted(JobExecutionContext context) {
    super.jobToBeExecuted(context);
    System.out.println("jobToBeExecuted");
  }

  @Override
  public void jobExecutionVetoed(JobExecutionContext context) {
    super.jobExecutionVetoed(context);
    System.out.println("jobExecutionVetoed");
  }

  @Override
  public void jobWasExecuted(JobExecutionContext context, JobExecutionException jobException) {
    super.jobWasExecuted(context, jobException);
    System.out.println("jobWasExecuted");
  }
}
```

<br>

## 3.2. 스케줄러에 등록

- 이벤트를 수신할 대상 작업에 대한 범위를 결정하기 위해 여러가지 조건을 입력할 수 있다.

```java
...

DumbJobListener dumbJobListener = new DumbJobListener();

// 작업을 JobKey(작업명, 작업그룹명)로 식별하여 특정 작업에 대해서만 이벤트를 수신하고 싶은 경우
scheduler.getListenerManager()
  .addJobListener(dumbJobListener, KeyMatcher.keyEquals(new JobKey("dumbJob", "dumbGroup1")));

// 작업그룹명으로 해당 그룹에 속한 작업(들)에 대해서만 이벤트를 수신하고 싶은 경우
scheduler.getListenerManager()
  .addJobListener(dumbJobListener, GroupMatcher.jobGroupEquals("dumbGroup1"));

// 작업그룹명 2개를 입력해서 해당 그룹들에 속한 작업(들)에 대해서만 이벤트를 수신하고 싶은 경우
scheduler.getListenerManager().addJobListener(dumbJobListener,
  OrMatcher.or(GroupMatcher.jobGroupEquals("dumbGroup1"),
    GroupMatcher.jobGroupEquals("dumbGroup2")));

// 모든 작업에 대해서 이벤트를 수신하고 싶은 경우
scheduler.getListenerManager().addJobListener(dumbJobListener, EverythingMatcher.allJobs());

...
```

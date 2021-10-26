# Lesson 8 : SchedulerListeners

- 스케줄러에 관련된 이벤트 수신
- 스케줄러 관련 이벤트 예시
  - 작업이나 트리거의 추가/제거
  - 스케줄러내의 심각한 에러
  - 스케줄러의 시작/종료 알림
  - ...

<br>

---

- [1. SchedulerListener 인터페이스](#1-schedulerlistener-인터페이스)
- [2. SchedulerListenerSupport 추상 클래스](#2-schedulerlistenersupport-추상-클래스)
- [3. 적용 방법 및 예시](#3-적용-방법-및-예시)
  - [3.1. DumbSchedulerListener 클래스 정의](#31-dumbschedulerlistener-클래스-정의)
  - [3.2. 스케줄러에 DumbSchedulerListener 등록](#32-스케줄러에-dumbschedulerlistener-등록)

<br><br>

# 1. SchedulerListener 인터페이스

- SchedulerListener를 구현하기 위해 필요한 메소드 집합

  ```java
  package org.quartz;

  public interface SchedulerListener {

  		// 작업이 스케줄러에 등록(스케줄링)되는 시점의 이벤트 처리
      void jobScheduled(Trigger trigger);
  		// 작업이 스케줄러에서 해제되는 시점의 이벤트 처리
      void jobUnscheduled(TriggerKey triggerKey);
  		// 특정 트리거가 조건을 만족해서 발동되는 시점의 이벤트 처리
      void triggerFinalized(Trigger trigger);
  		// 트리거가 일시정지되는 시점의 이벤트 처리
      void triggerPaused(TriggerKey triggerKey);
  		// 특정 트리거 그룹 내의 트리거들이 일시정지되는 시점의 이벤트 처리
      void triggersPaused(String triggerGroup);
  		// 특정 트리거가 일시정지 상태에서 벗어나는 시점의 이벤트 처리
      void triggerResumed(TriggerKey triggerKey);
  		// 특정 트리거 그룹 내의 트리거들이 일시정지 상태에서 벗어나는 시점의 이벤트 처리
      void triggersResumed(String triggerGroup);
  		// 작업이 추가되는 시점의 이벤트 처리
      void jobAdded(JobDetail jobDetail);
  		// 작업이 제거되는 시점의 이벤트 처리
      void jobDeleted(JobKey jobKey);
  		// 작업이 일시정지되는 시점의 이벤트 처리
      void jobPaused(JobKey jobKey);
  		// 특정 작업그룹이 일시정지되는 시점의 이벤트 처리
      void jobsPaused(String jobGroup);
  		// 특정 작업이 일시정지 상태에서 벗어나는 시점의 이벤트 처리
      void jobResumed(JobKey jobKey);
  		// 특정 작업그룹이 일시정지 상태에서 벗어나는 시점의 이벤트 처리
      void jobsResumed(String jobGroup);
  		// 스케줄러에 심각한 에러 발생 이벤트 처리
      void schedulerError(String msg, SchedulerException cause);
  		// 스케줄러의 스탠바이 모드로 돌입 알림 이벤트 처리
      void schedulerInStandbyMode();
  		// 스케줄러 시작 직후 알림 이벤트 처리
      void schedulerStarted();
  		// 스케줄러 시작절차의 시작에 대한 알림 이벤트 처리
      void schedulerStarting();
  		// 스케줄러 종료 직후 알림 이벤트 처리
      void schedulerShutdown();
  		// 스케줄러 종료절차의 시작에 대한 알림 이벤트 처리
      void schedulerShuttingdown();
  		// 모든 작업과 트리거, 캘린더가 제거되었음에 대한 알림 이벤트 처리
      void schedulingDataCleared();
  }
  ```

<br><br>

# 2. SchedulerListenerSupport 추상 클래스

- SchedulerListener 인터페이스 내의 메소드를 모두 구현하지 않아도 사용할 수 있도록 만든 추상 클래스

  - SchedulerListener 내의 메소드들을 빈 껍데기 메소드로 정의한 클래스
  - 상속받아서 SchedulerListener 구현체를 만들 수 있음

  <br>

  ```java
  package org.quartz.listeners;

  import org.quartz.JobDetail;
  import org.quartz.JobKey;
  import org.quartz.SchedulerException;
  import org.quartz.SchedulerListener;
  import org.quartz.Trigger;
  import org.quartz.TriggerKey;
  import org.slf4j.Logger;
  import org.slf4j.LoggerFactory;

  public abstract class SchedulerListenerSupport implements SchedulerListener {
      private final Logger log = LoggerFactory.getLogger(getClass());

      protected Logger getLog() {
          return log;
      }

      public void jobAdded(JobDetail jobDetail) {
      }

      public void jobDeleted(JobKey jobKey) {
      }

      public void jobPaused(JobKey jobKey) {
      }

      public void jobResumed(JobKey jobKey) {
      }

      public void jobScheduled(Trigger trigger) {
      }

      public void jobsPaused(String jobGroup) {
      }

      public void jobsResumed(String jobGroup) {
      }

      public void jobUnscheduled(TriggerKey triggerKey) {
      }

      public void schedulerError(String msg, SchedulerException cause) {
      }

      public void schedulerInStandbyMode() {
      }

      public void schedulerShutdown() {
      }

      public void schedulerShuttingdown() {
      }

      public void schedulerStarted() {
      }

      public void schedulerStarting() {
      }

      public void triggerFinalized(Trigger trigger) {
      }

      public void triggerPaused(TriggerKey triggerKey) {
      }

      public void triggerResumed(TriggerKey triggerKey) {
      }

      public void triggersPaused(String triggerGroup) {
      }

      public void triggersResumed(String triggerGroup) {
      }

      public void schedulingDataCleared() {
      }

  }
  ```

<br><br>

# 3. 적용 방법 및 예시

## 3.1. DumbSchedulerListener 클래스 정의

- SchedulerListenerSupport를 상속받아서 필요한 메소드만 재정의
- 여기서는 작업 추가/제거, 스케줄러 시작/종료 이벤트에 대한 처리에 대해서만 재정의 (간단한 알림용 문자열 출력)

```java
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.listeners.SchedulerListenerSupport;

public class DumbSchedulerListener extends SchedulerListenerSupport {

  @Override
  public void jobAdded(JobDetail jobDetail) {
    super.jobAdded(jobDetail);
    System.out.println("jobAdded");
  }

  @Override
  public void jobDeleted(JobKey jobKey) {
    super.jobDeleted(jobKey);
    System.out.println("jobDeleted");
  }

  @Override
  public void schedulerShutdown() {
    super.schedulerShutdown();
    System.out.println("schedulerShutdown");
  }

  @Override
  public void schedulerStarted() {
    super.schedulerStarted();
    System.out.println("schedulerStarted");
  }
}
```

<br>

## 3.2. 스케줄러에 DumbSchedulerListener 등록

```java
...

DumbSchedulerListener dumbSchedulerListener = new DumbSchedulerListener();
scheduler.getListenerManager().addSchedulerListener(dumbSchedulerListener);

...
```

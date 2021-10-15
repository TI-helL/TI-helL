# Quartz Lib Tutorial - Lesson 4: More About Trigger

<br>

## 4.1. 모든 Trigger 타입에서 사용되는 공통 속성들

<br>

- jobKey: 트리거가 발동하면 실행될 Job의 ID
- startTime: 트리거의 효력을 발생시킬 날짜 및 시간
- endTime: 트리거의 효력을 상실시킬 날짜 및 시간
- startTime, endTime 설정 예시

  ```java
  ...

  SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
  Date startDate;
  Date endDate;

  try {
    startDate = formatter.parse("2021/09/30");
  	endDate = formatter.parse("2021/10/02");
  } catch (ParseException pe) {
    ...
  }

  ...

  SimpleTrigger dumbTrigger = TriggerBuilder.newTrigger()
      .withIdentity("dumbTrigger", "dumbGroup1")
      .startNow()
      .startAt(startDate) // startTime 설정
      .endAt(endDate) // endTime 설정
      .withSchedule(SimpleScheduleBuilder.simpleSchedule()
          .withIntervalInSeconds(3)
          .withRepeatCount(4))
      .build();

  ...
  ```

<br>

## 4.2. 우선순위

- 작업 쓰레드보다 많은 수의 트리거가 **동시에 발동**되는 경우에 대비하여 우선순위를 지정할 수 있음
  - 트리거 정의 및 생성 시 `withPriority(int triggerPriority)` 메소드 사용하여 설정
  - 기본값: 5
  - 우선순위 값이 높으면 더 빨리 실행됨
  - '동시'에 발동되는 경우에만 적용됨 → 예를 들어 10:59과 11:00은 동시가 아님
- 강제 종료된 스케줄러 복구 후 재실행되는 작업의 우선 순위는 원본 작업과 동일
- 우선순위 설정 예시

  ```java
  ...

  // 작업이 바로 시작되고, 3초 간격으로 4회 반복하도록 트리거 정의
  SimpleTrigger dumbTrigger = TriggerBuilder.newTrigger()
      .withIdentity("dumbTrigger", "dumbGroup1")
      .startNow()
      .withPriority(8) // 우선순위 설정
      .withSchedule(SimpleScheduleBuilder.simpleSchedule()
          .withIntervalInSeconds(3)
          .withRepeatCount(4))
      .build();

  ...
  ```

<br>

## 4.3. Misfire Instructions

- 지정된 시간을 놓친(불발) 트리거에 대한 대응 방법을 트리거 정의 시 설정
- default는 smart policy 사용

  → 트리거의 타입과 설정에 따라 다르게 대응

- 스케줄러가 시작될 때 불발된 트리거를 찾아서 각각에 설정된 불발 대응 방법을 기반으로 해당 트리거를 업데이트함
- 더 자세한 사항은.. 각 트리거 타입의 상세 튜토리얼 참고

<br>

## 4.4. Calendar

- 트리거에 설정된 일정에서 특정 날짜, 요일 등 시간의 묶음을 제외해야하는 경우 유용

<br>

### 4.4.1. Calendar 인터페이스

- java.util.Calendar가 아님!

  ```java
  package org.quartz;

  public interface Calendar {

  	// 파라미터가 밀리세컨드 형태의 타임스탬프 (long 타입)
    public boolean isTimeIncluded(long timeStamp);

    public long getNextIncludedTime(long timeStamp);

  }
  ```

    <br>

- 여러 개의 구현체가 기본 제공됨 (자세한 설명은 [JavaDoc](http://www.quartz-scheduler.org/api/2.3.1-SNAPSHOT/index.html) 참고)
  - HolidayCalendar
  - CronCalendar
  - DailyCalendar
  - WeeklyCalendar
  - MonthlyCalendar
  - AnnualCalendar

<br>

### 4.4.2. 사용 예시 - HolidayCalendar

- 특정 날짜(전체 시간)를 제외하는 예

```java
// Calendar 구현체 인스턴스 생성 및 제외할 날짜 추가
HolidayCalendar cal = new HolidayCalendar();
cal.addExcludedDate( someDate );
cal.addExcludedDate( someOtherDate );

// holidays: calendar를 식별할 이름
// 3번째 파라미터: 같은 이름의 이미 등록된 calendar가 있다면 대체 여부
// 4번째 파라미터: 같은 이름의 이미 등록된 calendar를 참조하던 트리거들에 대한 업데이트 여부
sched.addCalendar("holidays", cal, false, false);

// 트리거 인스턴스 생성 시 캘린더 설정 추가 (modifiedByCalendar 메소드 이용)
SimpleTrigger dumbTrigger = TriggerBuilder.newTrigger()
    .withIdentity("dumbTrigger", "dumbGroup1")
    .forJob("dumbJob")
    .withSchedule(dailyAtHourAndMinute(9, 30)) // 매일 9시반에 발동
    .modifiedByCalendar("holidays") // 캘린더에 지정된 날짜는 제외
    .build();

...

// dumbJob 인스턴스 생성

...
```

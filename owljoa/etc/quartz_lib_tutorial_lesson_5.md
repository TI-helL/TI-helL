# Lesson 5. Simple Trigger

<br>

- [1. 소개](#1-소개)
- [2. 속성](#2-속성)
  - [2.1. start-time](#21-start-time)
  - [2.2. end-time](#22-end-time)
  - [2.3. repeat count](#23-repeat-count)
  - [2.4. repeat interval](#24-repeat-interval)
- [3. 생성 방법 예시](#3-생성-방법-예시)
  - [3.1. 반복 없이 특정 시간에 발동하는 트리거](#31-반복-없이-특정-시간에-발동하는-트리거)
  - [3.2. 특정 시간에 발동하고 작업을 10초마다 반복하여 10회를 실행하는 트리거](#32-특정-시간에-발동하고-작업을-10초마다-반복하여-10회를-실행하는-트리거)
  - [3.3. 5분 뒤 한 번만 발동하는 트리거](#33-5분-뒤-한-번만-발동하는-트리거)
  - [3.4. 즉시 발동하여 작업을 22시까지 5분마다 반복 실행하는 트리거](#34-즉시-발동하여-작업을-22시까지-5분마다-반복-실행하는-트리거)
  - [3.5. 다음 정각 시간에 발동하여 작업을 무기한으로 2시간마다 반복하는 트리거](#35-다음-정각-시간에-발동하여-작업을-무기한으로-2시간마다-반복하는-트리거)
- [4. 불발(Misfire) 대응 지침](#4-불발misfire-대응-지침)
- [5. 참고 링크](#5-참고-링크)

<br>

---

<br>

## 1. 소개

- 예약 개념의 트리거
- 특정 시점을 기준으로 작업을 한 번 실행하거나 여러 번 반복 혹은 일정 시간 간격을 두고 반복

<br>

## 2. 속성

<br>

### 2.1. start-time

- 트리거 발동 시간

<br>

### 2.2. end-time

- 트리거 발동 종료 시간
- end-time이 설정된 경우 repeat count를 설정된 시간에 맞게 재지정
  - 시작과 끝 시간 사이에 발동 횟수를 계산할 필요 없이, 반복 시간 간격에 따라 반복되다가 종료시간에 종료되도록 할 수 있음

<br>

### 2.3. repeat count

- 반복 횟수
- 범위: 0을 포함한 양의 정수(Integer), `SimpleTrigger.REPEAT_INDEFINITELY` (무기한 반복)

<br>

### 2.4. repeat interval

- 반복 시간 간격
- 0을 포함한 양의 정수(long)로 밀리초(ms)를 나타냄
  - 0이면 스케줄러가 관리할 수 있는 범위내에서 동시에 '가깝게' 반복

<br><br>

## 3. 생성 방법 예시

- `TriggerBuilder`, `SimpleScheduleBuilder` 사용하여 인스턴스 생성
- Date 객체 사용의 편의를 위해 `DateBuilder` 사용

<br>

### 3.1. 반복 없이 특정 시간에 발동하는 트리거

```java
SimpleTrigger dumbTrigger = TriggerBuilder.newTrigger()
    .withIdentity("dumbTrigger", "dumbGroup1")
    .startAt(startTime) // startTime: Date 타입의 변수
    .forJob("dumbJob", "dumbGroup1") // 연결할 작업(Job)을 그룹명, 이름으로 식별
    .build();
```

<br>

### 3.2. 특정 시간에 발동하고 작업을 10초마다 반복하여 10회를 실행하는 트리거

```java
SimpleTrigger dumbTrigger = TriggerBuilder.newTrigger()
    .withIdentity("dumbTrigger", "dumbGroup1")
    .startAt(startTime)  // 시작시간을 명시하지 않으면 (startAt(...) 생략 시) 디폴트로 현재 시간이 입력됨
    .withSchedule(SimpleScheduleBuilder.simpleSchedule()
        .withIntervalInSeconds(10)
        .withRepeatCount(10)) // 10회 반복하면 트리거 발동 시 한 번을 포함하여 총 11번 작업 수행
    .forJob(dumbJob) // JobDetail(작업) 인스턴스로 작업 식별
    .build();
```

<br>

### 3.3. 5분 뒤 한 번만 발동하는 트리거

```java
SimpleTrigger dumbTrigger = TriggerBuilder.newTrigger()
    .withIdentity("dumbTrigger", "dumbGroup1")
    .startAt(DateBuilder.futureDate(5, IntervalUnit.MINUTE)) // DateBuilder 사용해서 미래 시간의 Date 타입 변수 생성
    .forJob(dumbJob.getKey()) // JobDetail(작업) 인스턴스에서 추출한 키값으로 작업 식별
    .build();
```

<br>

### 3.4. 즉시 발동하여 작업을 22시까지 5분마다 반복 실행하는 트리거

```java
SimpleTrigger dumbTrigger = TriggerBuilder.newTrigger()
    .withIdentity("dumbTrigger", "dumbGroup1")
    .withSchedule(SimpleScheduleBuilder.simpleSchedule()
        .withIntervalInMinutes(5) // 5분마다 반복
        .repeatForever())
    .endAt(dateOf(22, 0, 0)) // 22시에 트리거 효과 종료
    .build();
```

<br>

### 3.5. 다음 정각 시간에 발동하여 작업을 무기한으로 2시간마다 반복하는 트리거

```java
SimpleTrigger dumbTrigger = TriggerBuilder.newTrigger()
    .withIdentity("dumbTrigger2") // 그룹이 지정되지 않았기 때문에 디폴트 그룹에 포함됨
    .startAt(DateBuilder.evenHourDate(null)) // 분초가 같은 다음 정각 시간에 발동
    .withSchedule(SimpleScheduleBuilder.simpleSchedule()
        .withIntervalInHours(2) // 2시간마다 반복
        .repeatForever())
    .build();

// 트리거 생성 시 forJob(...) 메소드를 이용한 속성 설정을 생략했기 때문에 스케줄러에 작업과 함께 등록해야함
scheduler.scheduleJob(dumbTrigger, dumbJob);
```

<br>

## 4. 불발(Misfire) 대응 지침

- 특정 상황이 발생하여 트리거가 예약된 시점에 발동하지 못한 경우의 대응 지침이 상수로 정의되어 있음 (각 상수별 설명은 JavaDoc 참고)

  ```java
  // SimpleTrigger 불발 대응 지침 상수 목록
  MISFIRE_INSTRUCTION_IGNORE_MISFIRE_POLICY
  MISFIRE_INSTRUCTION_FIRE_NOW
  MISFIRE_INSTRUCTION_RESCHEDULE_NOW_WITH_EXISTING_REPEAT_COUNT
  MISFIRE_INSTRUCTION_RESCHEDULE_NOW_WITH_REMAINING_REPEAT_COUNT
  MISFIRE_INSTRUCTION_RESCHEDULE_NEXT_WITH_REMAINING_COUNT
  MISFIRE_INSTRUCTION_RESCHEDULE_NEXT_WITH_EXISTING_COUNT
  ```

    <br>

- 모든 트리거의 디폴트 지침은 `Trigger.MISFIRE_INSTRUCTION_SMART_POLICY` 로 설정되며 이 지침 사용 시, 트리거의 설정과 상태에 따라 동적으로 해당 트리거 타입내의 지침을 선택함
- 지침 설정 방법
  - `SimpleTrigger` 생성 시 `SimpleScheduleBuilder.simpleSchedule()` 내에 설정
  ```java
  SimpleTrigger dumbTrigger = TriggerBuilder.newTrigger()
      .withIdentity("dumbTrigger", "dumbGroup1")
      .withSchedule(SimpleScheduleBuilder.simpleSchedule()
          .withIntervalInMinutes(5)
          .repeatForever()
          .withMisfireHandlingInstructionNextWithExistingCount()) // 지침 설정
      .build();
  ```

<br><br>

## 5. 참고 링크

http://www.quartz-scheduler.org/documentation/2.3.1-SNAPSHOT/tutorials/tutorial-lesson-05.html

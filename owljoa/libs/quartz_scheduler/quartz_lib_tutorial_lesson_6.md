# Lesson 6. CronTrigger

- 달력 기반의 반복되는 작업 스케줄이 필요한 경우 사용
- ex) 매주 금요일 정오, 매일 오전 9시반, 1월의 매주 월수금 오전 9시~10시 사이의 5분마다

<br>

---

- [1. Cron Expressions(표현식)](#1-cron-expressions표현식)
  - [1.1. 문법](#11-문법)
- [2. CronTrigger 생성](#2-crontrigger-생성)
- [3. CronTrigger 불발(Misfire) 처리](#3-crontrigger-불발misfire-처리)

---

<br>

# 1. Cron Expressions(표현식)

- 7개 하위 표현식(필드)으로 구성
- 각각의 하위 표현식은 공백(white-space)로 구분되며, 다음의 순서로 이루어져 있다.
  1. 초 (0 ~ 59)
  2. 분 (0~ 59)
  3. 시 (0 ~ 23)
  4. 일자 (1 ~ 31)
  5. 월 (0 ~ 11) or (JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC)
  6. 요일 (1 ~ 7 → 1이 일요일) or (SUN, MON, TUE, WED, THU, FRI, SAT)
  7. 연도 (optional)
- 예시
  - `"0 0 12 ? * WED"` → 매주 수요일 12시 0분 0초

<br>

## 1.1. 문법

- 기본 문법
  - {초} {분} {시} {일자} {월} {요일} {연도(optional)}
- 범위 및 리스트 형태 표현
  - ,(콤마) 사용하여 리스트 표현
    - `"0 0 12 ? * MON,WED,FRI"` → 매주 월수금 12시 0분 0초
  - -(하이픈) 사용하여 범위 표현
    - `"0 0 12 ? * MON-FRI"` → 매주 월~금 12시 0분 0초
  - ,(콤마), -(하이픈) 사용하여 범위와 리스트 표현
    - `"0 0 12 ? * MON-WED,SAT"` → 매주 월~수,토요일 12시 0분 0초
- \*(와일드카드)
  - 해당 필드의 전체 범위 선택
    - ex) 요일 자리에 와일드카드를 입력하면 모든 요일
  - 예시
    - `"0 0 12 ? * MON"` → 매월 월요일 12시 0분 0초
- '/' -> {시작}/{매번 더할 값}
  - "3/15"를 분(minutes) 자리에 입력하면, 3분에 시작해서 매 15분을 의미
- '?'
  - 일자와 요일 필드에만 사용 가능
  - 지정된 값이 없다는 것을 의미 → 일자와 요일 필드 중 한 필드에 대해서만 지정하기 위해 사용
    - 매주 수요일이라면 월에 해당하는 필드에는 ? 입력
    - 매월 23일이라면 요일에 해당하는 필드에는 ? 입력
- 'L'(last)
  - 일자와 요일 필드에만 사용 가능
  - 일자 필드에서는 해당 달의 마지막 일자 (ex. 1월 31일, 2월 28일)
  - 요일 필드
    - "L"만 사용 → 7 or SAT(토요일)을 의미
    - "FRIL" or "6L"과 같이 사용 → 그 달의 마지막 금요일을 의미
- ... 다른 옵션도 많으니 [JavaDoc](http://www.quartz-scheduler.org/api/2.4.0-SNAPSHOT/index.html) 참고

<br><br>

# 2. CronTrigger 생성

- `TriggerBuilder`, `CronScheduleBuilder` 사용하여 인스턴스 생성
- 예시 - 오전 8시 ~ 오후 5시 사이의 정각부터 매 짝수분마다 작업을 실행하는 `CronTrigger` 생성

  ```java
  ...

  import org.quartz.CronScheduleBuilder;
  import org.quartz.CronTrigger;
  import org.quartz.TriggerBuilder;

  ...

  CronTrigger cronTrigger = TriggerBuilder.newTrigger()
    .withIdentity("dumbTrigger", "dumbGroup1")
    .withSchedule(CronScheduleBuilder.cronSchedule("0 0/2 8-17 * * ?"))
    .forJob("dumbJob", "dumbGroup1")
    .build();

  ...
  ```

<br><br>

# 3. CronTrigger 불발(Misfire) 처리

- 처리 방법은 상수로 정의되어있음

  ```java
  CronTrigger.MISFIRE_INSTRUCTION_IGNORE_MISFIRE_POLICY;
  // smart policy가 디폴트로 동작하고 CronTrigger 기본 구현체의 smart policy는
  // -> MISFIRE_INSTRUCTION_FIRE_ONCE_NOW
  CronTrigger.MISFIRE_INSTRUCTION_SMART_POLICY;
  CronTrigger.MISFIRE_INSTRUCTION_FIRE_ONCE_NOW;
  CronTrigger.MISFIRE_INSTRUCTION_DO_NOTHING;
  ```

- 사용 예시
  ```java
  CronTrigger cronTrigger = TriggerBuilder.newTrigger()
    .withIdentity("dumbTrigger", "dumbGroup1")
    .withSchedule(CronScheduleBuilder.cronSchedule("0 0/2 8-17 * * ?")
      .withMisfireHandlingInstructionFireAndProceed()) // MISFIRE_INSTRUCTION_FIRE_ONCE_NOW 적용
    .forJob("dumbJob", "dumbGroup1")
    .build();
  ```

# java 지난주, 다음주의 특정 요일 구하기

TemporalAdjusters 클래스를 사용하여 간단하게 구할수가 있다.

```java
public LocalDate nextFriday(LocalDate date){
    return date.with(TemporalAdjusters.next(DayOfWeek.FRIDAY));
}

public LocalDate previousFriday(LocalDate date){
    return date.with(TemporalAdjusters.previous(DayOfWeek.FRIDAY));
}
```
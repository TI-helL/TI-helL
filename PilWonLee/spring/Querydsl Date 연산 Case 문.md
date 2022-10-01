# Querydsl Date 연산/Case 문

- **한 테이블에서 특정 일자의 값을 가져올 때**

```java
.and(etfDetailInfoKrx.date.goe(LocalDate.now().minusYears(1)))
```

- 데이터 베이스의 날짜와 JAVA의 Localdate로 비교할 수 있음
    - 엔티티에 선언된 날짜 변수가 LocalDate여야만 비교할 수 있음
- LocalDate
    - minusDays()
    - minusMonth()
    - minusYears()
    - 등 날짜 연산에 필요한 함수 제공

- **Select 문 안에서 조건에 따라 반환이 필요할 때**

```java
new CaseBuilder()
    .when(universeItem.tickerSymbol.eq(etfBaseInfo.tickerSymbol))
    .then(true)
    .otherwise(false)
    .as("isInUniverse")
```

- CaseBuilder 활용가능
- 조건에 따라 select문에서 작성할 수 있음
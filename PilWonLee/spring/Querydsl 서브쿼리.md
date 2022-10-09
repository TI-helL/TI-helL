# Querydsl 서브쿼리

- Select 문에 서브쿼리

```java
return queryFactory
                .select(Projections.fields(StudentCount.class,
                        academy.name.as("academyName"),
                        ExpressionUtils.as(
                                JPAExpressions.select(count(student.id))
                                        .from(student)
                                        .where(student.academy.eq(academy)),
                                "studentCount")
                ))
                .from(academy)
                .fetch();
```

- ExpressionUtils 와 JPAExpressions 를 사용하여 select 문에서 서브쿼리 조회 가능 (단일값)

- join 절에 서브쿼리

```java
.leftJoin(etfDetailInfoKrx)
                .on(
                        etfBaseInfo.tickerSymbol.eq(etfDetailInfoKrx.tickerSymbol)
                                .and(etfDetailInfoKrx.date.eq(
                                        JPAExpressions.
                                                select(etfDetailInfoKrx.date.max())
                                                .from(etfDetailInfoKrx)
                                                .where(etfDetailInfoKrx.tickerSymbol.eq(tickerSymbol))))
```

- 조건문에도 JPAExpressions를 통해 서브쿼리를 사용할 수 있음

- 조건문에도 서브쿼리 가능

```java
.where(etfPortfolio.etfTickerSymbol.eq(tickerSymbol),
                        etfPortfolio.date.eq(
                                JPAExpressions.
                                        select(etfPortfolio.date.max())
                                        .from(etfPortfolio)
                                        .where(etfPortfolio.etfTickerSymbol.eq(tickerSymbol))
                        ) //etfComponent. JPAExpressions.select()
```

- 동일 테이블에서 가장 최근의 date값만 가져오고 싶을 때 활용한 쿼리
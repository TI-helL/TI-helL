# JPA Batch Insert 시 GenerationType 사용법

## Batch Insert 란?

3건의 데이터를 insert 한다고 해보자.

### 개별 INSERT
```sql
INSERT INTO table1 (col1, col2) VALUES (val11, val12);
INSERT INTO table1 (col1, col2) VALUES (val21, val22);
INSERT INTO table1 (col1, col2) VALUES (val31, val32);
```

### BATCH INSERT
```sql
INSERT INTO table1 (col1, col2) VALUES
(val11, val12),
(val21, val22),
(val31, val32);
```

BATCH INSERT 가 효율적이다.
## GeneratedType.IDENTITY 가 동작하는 방식

이 방식은 PK 의 생성에 대해 DB에 모든 것을 위임시키는 형태이다.</br>
실제로는 NULL로 설정되어 사용하고 있는 데이터베이스의 전략에 따라 ID 를 생성한다. </br>
즉 JPA 가 ID 생성에 관여하지 않는다.
그러나 영속성 컨텍스트의 무결성을 유지하기 위해서, 데이터를 입력한 후 DB로 실제 쓰기 작업이 이루어 지고 나서, 데이터베이스가 생성한 ID 값이 무엇이었는지에 따라 영속성 컨텍스트와 동기화한다.

## GeneratedType.IDENTITY 를 Spring JPA Batch (Bulk data) 로 Insert 시 문제점

### Spring Batch 를 통해 IDENTITY 전략으로 벌크데이터를 인서트할 경우 JDBC 레벨에서 Batch Insert 를 비활성화 한다. </br>
그 이유는 앞서 설명한 대로 `IDENTITY` 방식은 할당할 ID를 미리 알 수가 없다. </br>
즉 Transaction 이 커밋 된 이후에야 ID 값을 알 수 있다.

실제 SQL 문이 실행되고 난 뒤에야 ID 가 할당되므로 만약 Batch 를 지원하게 되면 이 쓰기지연 방식과 충돌이 발생한다는 것이다.
그래서 실제로는 개별적으로 Insert 를 실행하게 되어 **벌크데이트 인서트 성능이 안좋아진다**



![](../../../../../Desktop/jpa-bulk.png)



> 하이버네이트의 Transactional Write Behind (SQL 쓰기 지연)
> - 트랜잭션을 커밋할 때까지 INSERT SQL을 모음
> - JDBC BATCH SQL 기능을 사용해서 한번에 SQL 전송


## 해결 방법?

### Sequence 방식 사용
단, MySQL 은 Sequence 방식을 사용할 수 없다. 그 대신 Table 방식을 사용할 수도 있는데, 
만약 이전에 IDENTITY 전략으로 Key 를 만들었던 테이블에 대해 적용하기 상당히 어려울 수 있다.

### Spring JDBC 사용

JdbcTemplate에는 Batch를 지원하는 `batchUpdate()` 메서드가 마련돼있다.
여러 가지로 Overloading 돼 있어서 편리한 메서드를 골라서 사용하면 된다.


## 참고 

- https://homoefficio.github.io/2020/01/25/Spring-Data%EC%97%90%EC%84%9C-Batch-Insert-%EC%B5%9C%EC%A0%81%ED%99%94/
- https://tech.yangs.kr/17
- https://stackoverflow.com/questions/27697810/why-does-hibernate-disable-insert-batching-when-using-an-identity-identifier-gen/27732138#27732138
- https://cheese10yun.github.io/jpa-batch-insert/

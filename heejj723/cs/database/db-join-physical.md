# 물리적 Join 의 종류

## Driving Table 과 Driven Table

### Join 시 먼저 액세스 되는 테이블과 아닌 테이블

- Driving Table: 먼저 액세스 됨
- Driven Table: 나중에 액세스 됨
- Driving Table 은 DB 옵티마이저가 결정한다.

## DB Join의 방식 (물리적)

# Nested Loop Join

- [https://coding-factory.tistory.com/756](https://coding-factory.tistory.com/756)
- 2개 이상의 테이블에서 Driving Table 을 기준으로 Driven Table 을 스캔하여 결과를 서칭하는 것.
- 인덱스에 의한 랜덤 액세스에 기반하고 있으므로, Driving Table 서치 결과가 많을 수록 성능이 나빠짐.
- Driven Table 에는 조인을 위한 인덱스가 있어야만 한다.
    - 이 때 Driven Table 에 인덱스가 없으면 테이블 full scan 을 하므로 성능에 영향이 크다.
- Driving Table 선택의 기준이 매우 중요함 (데이터 양이 적거나, where 절로 걸렀을 때 결과 수가 적거나_
- 일단 Driving Table 결과 수가 적고, Driven Table 에 인덱스만 있다면 적은 범위의 데이터를 서치할 때 매우 유리함.

### 성능 개선 방법

- 힌트를 사용한다

    ```java
    /*+ORDERED*/ -- FROM절에 기술한 테이블 순서대로 제어
    /*+LEADING (table명)*/ -- 힌트 내에 제시된 테이블이 드라이빙으로 처리됨
    ```

- 뷰를 사용한다. 뷰로 데이터를 읽은 결과로 다음 테이블 연결을 시도하면 조인 순서를 제어 가능하다.

---

# Merge Join

- 조회 범위가 매우 많을 때 사용한다.
- (1)두 테이블에 각각 접근해서 결과를 얻어내고, (2) 결과를 정렬한 후에, (3) 조건으로 조인한다.
- 대용량인데 인덱스가 없고 범위 서칭할 때 유리하다.

### 성능 개선 방법

1. Access 속도 개선
- 애초에 양쪽 테이블에 액세스 하는 과정에서, Index Range Scan 등 그 속도를 줄일 수 있다.
1. 정렬 속도 향상
- 조인 조건 컬럼이 이미 정렬되어 있다거나 한다면 정렬하는 시간을 줄일 수 있다.
1. 양쪽 결과의 정렬 속도를 비슷하게 한다.
- 한쪽 소팅 속도가 너무 느리게 되면 이미 정렬이 완료된 데이터 셋은 대기하게 된다. 두개의 속도가 비슷하면 좋을 것이다.
1. sort area size 최적화
- 두 테이블을 정렬 할 때 별도의 메모리스페이스를 사용하게 되는데, 이 때 메모리가 부족하다면 새로운 임시 테이블 스페이스를 할당받아야마 한다. 따라서 그 사이즈를 미리 적당히 크게 해두는 것이 좋겠다.

---

# Hash Join

[https://coding-factory.tistory.com/758?category=990785](https://coding-factory.tistory.com/758?category=990785)

- 두 테이블 중 하나를 해시테이블로 선정해서, 조인 될 조건의 키 값을 해싱으로  비교하여 결과를 찾는 방식이다.
- hash 는 범위 탐색에 매우 취약하므로, ‘==’ 조건에만 사용하애 한다.
- Join Access 량이 너무 많아서 Random Access 부하가 심할 때 (NL Join 불가)
- Sort Merge Join 을 하기에는 두 테이블의 조건 결과 값이 너무 커서 정렬이 힘들 때 (Merge Join 불가)
- 수행빈도가 낮고 쿼리 수행 시간이 너무 오래 걸리는 대용량 테이블을 조인할 때

### 동작 방식

1. 둘 중 작은 테이블을 Hash Area 에 해시테이블을 생성한다.
2. 큰 집합을 읽어서 해시테이블을 탐색하면서 Join 한다.
    1. 이 때 큰 집합에서의 hash(key) 값을 스캔하면서 데이터를 찾는다.

### 성능 개선 방법

- Hash Table 만드는 과정을 효율화 한다. (처음에 해시테이블 만드는 집합이 매우 작다)
- 기본적으로 큰 테이블들에 대해서 수행하고, HAsh TABLE 을 만드는 별도의 과정이 포함되므로, 서버 성능이 좋아야 한다...
# programmers-sql-problem-kit.md

---
### 조회
1. 특정 문자열을 잘라서 숫자로 변환 후 정렬하기 </br>
```sql
SELECT * 
FROM ANIMAL_INS
ORDER BY (SELECT right(ANIMAL_INS.ANIMAL_ID, 6)) ASC;
```

2. 이름 순으로 조회, 단, 이름이 같은 레코드의 경우 DATE TIME 이 늦은 순으로 정렬 
```sql
SELECT ANIMAL_ID, NAME, DATETIME
FROM ANIMAL_INS
ORDER BY NAME ASC, DATETIME DESC;
```

3. DATETIME 이 가장 늦은 하나의 레코드
```sql
SELECT MAX(DATETIME) as '시간'
FROM ANIMAL_INS;
```
---

### SQL Operations
4. 모든 레코드의 수  </br>
```sql
SELECT count(*) from ANIMAL_INS;
```

5. 중복 제거하기 (이름이 null 이 아닌 이름 종류의 개수를 세어라) </br>
```sql
SELECT COUNT(DISTINCT NAME)
FROM ANIMAL_INS 
WHERE NAME IS NOT NULL;
```

6. 필드가 특정 값인 경우 각각의 레코드 수 세기 </br>
```sql
SELECT ANIMAL_TYPE, count(ANIMAL_TYPE) as 'count'
FROM ANIMAL_INS
GROUP BY ANIMAL_TYPE
ORDER BY ANIMAL_TYPE ASC;
```

7. 이름 중 두번 이상 쓰인 이름과 쓰인 횟수 세기  </br>

```sql
SELECT NAME, count(*) as 'COUNT' 
FROM ANIMAL_INS 
GROUP BY NAME HAVING count(NAME) >= 2
ORDER BY NAME ASC;
```
8. 09:00부터 19:59까지, 각 시간대별로 입양이 몇 건이나 발생했는지 조회하는 SQL문을 작성해주세요. 이때 결과는 시간대 순으로 정렬해야 합니다. </br>

```sql
SELECT HOUR(DATETIME) HOUR, COUNT(DATETIME) COUNT
FROM ANIMAL_OUTS
GROUP BY HOUR
HAVING HOUR >= 9 AND HOUR <= 20
ORDER BY HOUR ASC;
```
---
### Null 처리 등

9. Null 처리 </br>

```sql
SELECT ANIMAL_TYPE, IFNULL(NAME, 'No name'), SEX_UPON_INTAKE
FROM ANIMAL_INS
ORDER BY (SELECT RIGHT(ANIMAL_ID, 6)) ASC;
```
---
### Join
10. Left Outer join </br>

- Left outer join on one.job = two.job 일 때,  </br>

    - Table one 을 기준으로 two 의 모든 컬럼을 붙인다.
    - 맞는 데이터가 없을 시 null 을 넣는다. 
- 문제풀이 </br>

    - 입양 간 기록은 존재하는데, 들어온 기록은 없을 수 있으므로, left table 을 왼쪽에 둔다.
    - ANIMAL_ID 가 같은 값이 ANIMAL_INS 테이블에 존재하지 않을 경우 null 로 처리 됨
- 풀이 </br>
```sql
SELECT ANIMAL_OUTS.ANIMAL_ID, ANIMAL_OUTS.NAME
FROM ANIMAL_OUTS
LEFT OUTER JOIN ANIMAL_INS
ON ANIMAL_OUTS.ANIMAL_ID = ANIMAL_INS.ANIMAL_ID
WHERE ANIMAL_INS.INTAKE_CONDITION IS NULL
ORDER BY ANIMAL_ID ASC;
```

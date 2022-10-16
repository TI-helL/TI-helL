# sqlarchemy

## sqlarchemy?

sqlachemy 는 python에서 사용 가능한 orm이다.

• ORM은 말그대로 객체(Object)와 관계(Relation)를 연결해주는것이다.

- 데이터베이스의 데이터를 <—매핑—> Object필드
- 장점
  1. 객체 지향적인 코드로 비즈니스 로직에 집중가능
  2. 재사용 및 유지보수 편리성이 증가
  3. DBMS에 대한 종속성이 줄어듬.
- 단점
  1. ORM 만으로 서비스를 구현하기 어려움.
  2. 프로시저가 많은 시스템에서는 장점을 가져가기 어려움.

## orm?

Object Relational Mapping, 객체-관계 매핑

객체와 관계형 데이터베이스의 데이터를 자동으로 매핑(연결)해주는 것을 말한다.
객체 지향 프로그래밍은 클래스를 사용하고, 관계형 데이터베이스는 테이블을 사용한다.
객체 모델과 관계형 모델 간에 불일치가 존재한다.
ORM을 통해 객체 간의 관계를 바탕으로 SQL을 자동으로 생성하여 불일치를 해결한다.
데이터베이스 데이터 <—매핑—> Object 필드
객체를 통해 간접적으로 데이터베이스 데이터를 다룬다.
Persistant API라고도 할 수 있다.
Ex) JPA, Hibernate 등

설치

```jsx
pip3 install sqlalchemy
pip3 install sqlacodegen
pip3 install pymysql
```

## add, insert, update, delete

```bash
from sqlalchemy import select,update,delete

db:AsyncSession = Depends(get_db)
```

### add

```bash
item = db_table(**{
'key1':value1,
'key2':value2,
'key3':value3,
})

db.add(item)
await self.db.commit()
```

### insert

(데이터 프레임으로 데이터 가공후 딕셔너리로 변환해서 사용함)

```bash
await self.db.execute(insert(db_table).values(dictionary))
await self.db.commit()
```

### update

```bash
q = update(db_table)\
        .where(db_table.id == self.user.id)\
        .values(
          key1=value4,
          key2=value5
        )
await self.db.execute(q)
await self.db.commit()
```

### delete

```bash

q=delete(db_table)\
        .where(db_table.key3 == value3)

await self.db.execute(q)
await self.db.commit()
```

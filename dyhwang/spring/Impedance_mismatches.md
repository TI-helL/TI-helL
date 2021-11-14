# 객체 관계형 임피던스 불일치
### Granularity(세분성)
- 경우에 따라서 하나의 테이블이 많은 수의 객체모델과 매핑될 수도 있다.
- Coarse Granularity
- Fine Granularity
### Inheritance(상속)
- RDBMS는 객체지향의 패러디임인 상속의 개념이 없다
### Identity(일치)
- RDBMS는 sameness라는 개념을 정의하는데 이것이 바로 기본키이다.
- 자바에서는 객체의 식별, 객체의 동일성을 모두 정의한다
- 관계형에서는 PK가 같으면 동일한 record로 정의하지만 자바에서는 주소가 같거나 내용이 같은 경우를 구분하여 정의한다
### Associations(연관성)
- 객체지향에서는 객체참조(reference)를 사용하여 연관성을 나타내고, RDBMS에서는 외래키를 사용하여 나타낸다
### Navigation(탐색/순회)
- java는 하나의 연결에서 다른 연결로 이동하며 탐색/순회 하는 반면
- RDBMS에서는 join을통해 여러 엔터티를 로드하고 원하는 엔터티를 select하는 식으로 탐색, 순회 한다
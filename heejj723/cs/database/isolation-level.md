## db 에서 Isolation level 에 따라 발생할 수 있는 이상 현상

- **Dirty Read**
    - 변경 후 아직 Commit 되지 않은 값 읽고, Rollback 후의 값을 다시 읽어 최종 결과 값이 상이한 현상
    - 공유 Lock 을 걸어서 T1 이 A 에 접근하는 동안 다른 트랜잭션은 접근 불가하도록 함
<img width="649" alt="스크린샷 2021-11-20 오후 4 39 31" src="https://user-images.githubusercontent.com/45758481/142718681-34c544f0-b0e7-43b0-a4f7-2b6644513c88.png">

- **Non Repeatable Read**
    - 같은 트랜젝션 내에서 읽기를 두번 했는데 그 값이 다른 현상
    - 트랜잭션 하나가 완료될 때까지 수정/삭제를 제한한다
    - 이 때 삽입은 허용한다.
- **Phantom Read**
    - 트랜잭션 하나가 같은 쿼리를 두번 했는데 처음엔 없던 레코드가 갑자기 튀어나오는 경우
    - T1 이 읽은 데이터에 대해서는 트랜잭션이 갱신/삭제/삽입 도 불허한다.
    - Non-Repeatable-Read 에서 삽입도 제한하도록 함


### DB 의 고립수준 유형

- **Read Uncommitted**
    - 트랜잭션1이 커밋안한 데이터를 다른 트랜잭션이 읽기를 허용
    - Dirty Read 발생 가능성
- **Read Commited**
    - T1 이 commit 한 데이터만 Read 가능
    - Non Repeatable Read 와 Phantom Read 발생 가능성
    - 대부분 DBMS 가 채택
- **Repeatable Read**
    - Phantom Read 못막음
- **Serializable**
    - T1 이 읽은 데이터는 트랜잭션 종료시까지 수정/삭제/삽입 모두 허용 안함
    - 완벽하긴 하지만 현실성이 없음

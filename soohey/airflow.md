## Airflow란?

- Python 코드로 워크플로우(workflow)를 작성하고, 스케쥴링, 모니터링 하는 플랫폼
- 배치 : 일괄처리, 한꺼번에 대량의 프로세스를 처리
    - 대량의 데이터 처리
    - 특정 시간에 실행
    - 일괄 처리
- OLTP : 사용자와 DB가 지속적으로 상호작용
    - DB에 CRUD 트랜잭션 작업

## DAG

- 비순환 그래프 / 사이클 x
- 노드와 노드가 단방향 연결

버킷플레이스 airflow 적용기

## 참고

dags tag

통계 데이터

[https://docs.astronomer.io/learn/airflow-scaling-workers](https://docs.astronomer.io/learn/airflow-scaling-workers)
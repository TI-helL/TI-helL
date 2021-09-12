## DAGs 작성
python operator
- take_id : 각 Task를 구분하기 위한 Unique한 Task 명
- python_callable : 실제 호출된 python 함수명
- provide_context : python 함수 사용 시 해당 함수에서 사용될 수 있는 기본적인 argument값을 넘겨줄 지 여부
- op_kwargs : 기본 args외에 추가로 넘겨줄 파라미터
- dag : default dag 명
## Airflow 명명법
- airflow dag는 task로 구성
- 각 task는 operator class 를 인스턴스화 하여 만든다.
- dag가 시작되면 airflow는 데이터베이승 dag run 항목을 만든다.
- 특정 dag run context에서 task를 실행하면 task instance 가 만들어진다.
- AIRFLOW_HOME은 DAG 정의 파일과 Airflow 플러그인을 저장하는 디렉터리이다.
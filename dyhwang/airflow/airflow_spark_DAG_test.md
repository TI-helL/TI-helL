# airflow에 spark-submit DAG 작성
## airflow DAG
```python
from airflow import DAG
from airflow.operators.dummy_operator import DummyOperator
from airflow.contrib.operators.spark_submit_operator import SparkSubmitOperator
from datetime import datetime, timedelta

###############################################
# Parameter
###############################################
spark_master = f"spark://{Host_IP}:7077"
spark_app_name = "Spark Hello World"

###############################################
# DAG Definition
###############################################
now = datetime.now()

default_args = {
    "owner": "airflow",
    "depends_on_past": False,
    "start_date": datetime(now.year, now.month, now.day),
    "retries": 1,
    "retry_delay": timedelta(minutes=1)
}

dag = DAG(
        "spark-test", 
        default_args=default_args, 
        schedule_interval=timedelta(1)
    )

start = DummyOperator(task_id="start", dag=dag)

spark_job = SparkSubmitOperator(
    task_id="spark_job",
    application="/home/dyhwang/airflow/srcs/hello-world.py",
    name=spark_app_name,
    conn_id="spark_default",
    verbose=1,
    conf={"spark.master":spark_master},
    dag=dag)

end = DummyOperator(task_id="end", dag=dag)

start >> spark_job >> end
```
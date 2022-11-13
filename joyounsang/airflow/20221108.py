titleList = ['test1','test2']

def dump():
    return 'test 함수'

tasks= []
for i in range(len(titleList)):
    temp_task = PythonOperator(task_id=f"test_{i}",python_callable=dump,op_kwargs={'data':titleList[i]})
    tasks.append(temp_task)

# 위 와같이 DAGS에서 operator을 pythonoperator로 정하면 파이썬 스크립트를 사용 가능함
#for문을 사용하여 task의 병렬화를 진행 간능하다.
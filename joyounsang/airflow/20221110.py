@task(task_id='intersection_point')    
def intersection_point(**kwargs):
    data = ['1','2'] 
    kwargs['task_instance'].xcom_push(key='data_price',value=data)


@task(task_id='print_end')
def print_end(**kwargs):
    data = kwargs['task_instance'].xcom_pull(key='data_price')
    return 'print_end'

#첫 번째 함수에서는 xcom_pudh를 통해 Dags안에서의 글로벌 값을 만들수 있다.
#이는 {key:value}형태로 딕셔너리 형태로 구성되어있다.
# xcom_push를 사용하여 값을 만들고 xcom_pull를 사용하여 키를 통행 저장된 값들을 불러올수있다.
#이러한 방법은 현재 데이터검증에 필요한 분기처리를 하는데 사용 되고 있다.
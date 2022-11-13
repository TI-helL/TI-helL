
@task(task_id='start')
def start(**kwargs):
    print('start')
    return 'start'


@task.branch(task_id='first_check')
def first_check(**kwargs):
    if None not in  dataSetList:
        return 'seccond_check'
    else:
        return 'return_start_1'


# 첫번쨰는 DAgs에서의 일반적인 task를 사용 하는 방법이다.
# (airflow version 2.4.2)예전과의 task의 작성방법이 다르다.

# 두번째는 분기를 나누는 task작성 방법이다.
# resturn 값으로 넘겨주는 것은 task_id를 넘겨 주는 것이다.
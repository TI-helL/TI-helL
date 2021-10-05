# Job
job은 실행된 후 종료해야 하는 성격의 작업을 실행시킬 때 사용하는 컨트롤러이다. 특정 개수만큼의 파드를 정상적으로 실행 및 종료함을 보장한다.

## Job 사용해보기
job을 사용하는 가장 단순한 상황은 job이 파드 하나를 실행하고 파드가 정상적으로 종료됐는지 확인하는 것이다. perl 이미지를 사용해서 간단하게 원주율을 계산하는 파드를 생성하고 바로 종료해보도록 하자. 먼저 다음의 job.yaml 파일을 작성한다.
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi
spec:
  template:
    spec:
      containers:
      - name: pi
        image: perl
        command: ["perl", "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
  backoffLimit: 4
```
- job 실행
  > $ kubectl apply -f job.yaml

- job 상태 확인
  > $ kubectl describe job

- job 로그 확인
  > $ kubectl logs {파드 이름}
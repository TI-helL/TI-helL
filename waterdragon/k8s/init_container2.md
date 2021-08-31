# Init Container (초기화 컨테이너) 2탄

- 지난 init container til([k8s init container](./k8s/init_container.md))에서 init container를 지정하여 순차적으로 pod를 실행 시킴
- 그러나 init container 실행과정에서 error 문이 출력됨(CrashLoopBackOff)
    ![image](https://user-images.githubusercontent.com/24540286/130756045-eb474ea8-0b40-4ecc-9168-31cab5c7f976.png)
- 오류 출력 문제를 해결하기 위해 init container를 다음과 같이 수정
  - service가 생성됐는지 확인하는 init container
    ```yaml
    initContainers:
    - name: service-check
      image: busybox:1.28
      command: ['sh', '-c', "until nslookup crawl-data-svc.fairi.svc.cluster.local; do echo waiting for crawl-data-svc; sleep 2; done"]
    ```
  - pod가 시작했는지 확인하는 init container
    ```yaml
    initContainers:
    - name: pos-start-check
      image: nicolaka/netshoot
      command: ['sh', '-c', "until curl {servcie}; do echo waiting fairi-gateway; sleep 2; done"]
    ```

- init container를 목적에 따라 지정하면 에러 대신 Init:0/3 과 같은식으로 출력되어 훨씬 보기 편함
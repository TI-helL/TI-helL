# PersistentVolume
- 쿠버네티스에서 볼륨을 사용하는 방법에는 PV(persistentVolume)과 PVC(PersistentVolume Claim) 두가지가 있음
- PV는 볼륨 그 자체를 의미하며 Kuberentes 내부에서 자원으로 취급됨
- PVC는 Kubernetes 관리자가 PV에 요청하는 볼륨을 의미함(용량, 읽기모드, 쓰기모드, 읽기/쓰기모드)
- 볼륨을 사용하기 위해서는 먼저 PV를 생성해야 하고 PV를 생성하는 단계를 프로비저닝(provisioning)이라고 함

# Provisioning의 두가지 방법
- Provisioning에는 Kubernetes 관리자가 일정 용량의 PV를 만들어 놓고 사용자의 요청에 따라 할당하는 방식(정적방식)과 PVC의 요청이 있을때 PV를 생성하는 방식(동적방식)이 있음
- 정적방식으로 만약게 100GB의 PV가 생성되어 있다면 150GB의 요청은 실패함
- 동정방식을 사용하면 150GB의 요청이 발생하는 순간 150GB의 PV를 생성함
- PV와 PVC를 연결하는 것을 바인딩이라고 함
- PVC의 사용이 끝나면 PVC는 삭제되고 사용중이던 PV를 reclaim(초기화)하여 다른 곳에서 사용할 수 있도록함

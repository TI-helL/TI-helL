# K8s 가 가능하게한 GitOps 정리
https://devocean.sk.com/vlog/view.do?id=211&vcode=A03

## 첫 GitOps
- Ansible을 사용하여 OS, OpenStack 설정을 하고 Local Git Repository로 관리 변경 내용 저장을 강제하는 방식으로 처음에 사용함
- 무의미한 commit의 증가, Ansible을 사용하지 않는 경우 서버의 설정파일과 Git Repository 설정의 차이가 생김, 히스토리 파악 불가
- Cloud 트랜드가 OpenStack -> Docker, k8s로 변화 됨
- Docker, k8s 가볍고 빠르고 확장성 있고 관리가 편함
  
## k8s
- Container Scheduling, Service Scaling, Self-healing
- 모든 리소스를 선언적 방법으로 관리 가능(.yaml 파일로)

## ArgoCD
- kubernetes의 리소스(.yaml)을 Git에 저장하면 k8s에 배포
- 현재 k8s의 리소스와 git에 저장된 리소스를 지속적으로 비교하여 내용의 차이가 있을 경우 "git"에 있는 리소스로 Sync
- Git revert를 통해 roll back 가능
- diff 기능으로 현재 k8s의 리소스와 git yaml의 차이를 확인 할 수 있음

# 아 발표 재미없다 그냥 튜토리얼 해보자
## ArgoCD에서 sample app을 제공하고 있음

https://github.com/argoproj/argocd-example-apps

<img width="505" alt="스크린샷 2021-08-24 오전 11 20 11" src="https://user-images.githubusercontent.com/24540286/130545638-91059a17-d506-4bb1-9d7c-3712909abd13.png">

### 1. sample app fork
<img width="449" alt="스크린샷 2021-08-24 오전 11 23 05" src="https://user-images.githubusercontent.com/24540286/130546659-016372b3-0b3c-446e-918c-63890d4c2e52.png">

### 2. ArgroCD 설치
- helm 설치
    > $ brew install helm

- argo repo add
    > $ helm repo add argo https://argoproj.github.io/argo-helm

- argo 설치
    > $ helm install argo argo/argo-cd

- argo 비밀 번호 확인
    > $ kubectl -n default get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d 

- argo 접속용 port-forward
    > $ kubectl port-forward service/argo-argocd-server -n default 8080:443

- web browser 접속(localhost:8080) 및 로그인 (ID : admin PW : {위에서 확인한 비밀번호})
  
  <img width="444" alt="스크린샷 2021-08-24 오전 11 43 56" src="https://user-images.githubusercontent.com/24540286/130547520-b838db51-a11f-4d87-8ac9-3bbdab8fae28.png">

- 초기 화면

    ![스크린샷 2021-08-24 오후 1 38 31](https://user-images.githubusercontent.com/24540286/130559023-9eef5e59-8b41-49fe-a1ab-4aabd1fb4eee.png)


- k8s의 상태

    ![스크린샷 2021-08-24 오후 1 38 55](https://user-images.githubusercontent.com/24540286/130559026-0ffe7f7a-43cb-43d9-9639-d27fc9095746.png)



# k8s domain
k8s는 도메인 서비스를 제공한다. 실행중인 파드 또는 서비스들에 대해서 도메인으로 검색 또는 http 요청을 보낼수 있다. k8s의 기본이 되는 pod는 임시적이기 때문에 쉽게 중지, 파괴 또는 재시작 할 수 있고 이 과정에서 ip가 새로이 할당될수 있다. domain을 사용하면 ip가 변경되어도 domain을 사용하면 되기 때문에 서비스를 보다 안정적으로 운영할 수 있다.

## 클러스터 안에서 도메인 사용하기
k8s에서 사용하는 도메인은 Service와 Pod를 대상으로 하며 일정한 패턴이 있다. 
> 서비스이름.네임스페이스이름.svc.cluster.local
>podIP주소,네임스페이스이름.pod.cluster.local(이때 pod ip 주소의 "."은 "-:로 변경된다. ex.10-10-10-10)

## pod 내부에 호스트네임과 서브 도메인 설정하기

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kubernetes-domain-demo
  labels:
    app: kubernetes-domain-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kubernetes-domain-demo
  template:
    metadata:
      labels:
        app: kubernetes-domain-demo
    spec:
      hostname: appname //호스트네임 설정
      subdomain: default-subdomain //도메인 네임 설정
      containers:
      - name: kubernetes-domain-demo
        image: something-image
        ports:
        - containerPort: 8080
```

위와 같이 설정하면 파드에 접근할수 있는 도메인은 다음과 같다.
> appname.default-subdomain.default.svc.cluster.local
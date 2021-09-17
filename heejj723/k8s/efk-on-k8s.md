# efk-on-k8s

## EFK?

`EFK`란 `E`lasticserach, `F`luentd, `K`ibana 3가지 오픈소스의 조합으로
log를 통합하여 관리감독하기 위해 사용되고 있다. </br>


- `E`lasticsearch - 검색 및 분석 엔진
- `F`luentd - 여러 서비스에서 동시에 데이터(로그 등)를 수집하여 Elasticsearch 같은 곳으로 전송한다.
- `K`ibana - Elasticsearch 의 데이터를 차트를 통해 시각화


## Logstash vs Fluentd vs Fluentbit

Fluentd 같은 데이터 수집 파이프라인으로 `Logstash`, `Fluentd`, `Fluentbit` 가 많이 쓰이는데, </br>
그 셋의 장단점을 비교해보자.

- Logstash
    - Elastic Stack
    - Elastic Stack으로
      ES에 대한 지원이 빠름
    - JRuby 기반
      (Java 런타임 필요)
    - if-else 기반 라우팅
    - 20개 고정된 메모리큐
    - 재시작을 위한
      외부메시지큐에 의존
      (Redis, Kafka)
    - 시스템의 메트릭을
      수집하고 전달하는 Metricbeat지원
- Fluentd
    - CNCF Stack
    - CNCF의 프로젝트
      (k8s, OpenTascing,
      Prometheus ..) 적합
    - CRuby 기반
      (Java 런타임 불필요)
    - tag 기반 라우팅
    - 자체 버퍼링 시스템
    - 외부메시지큐에 의존X
    - Logstash보다
      상대적으로 적은
      메모리를 사용
      (~40MB)
    - 주기능은 Aggregator
    - 각 클라이언트에서
      수집된 데이터를
      ES로 전송을 담당
    - 분산환경에 특화
    - Metricbeat 지원X
- Fluentbit
    - CNCF Stack
    - CNCF의 프로젝트
      (k8s, OpenTascing,
      Prometheus ..) 적합
    - C 기반
    - tag 기반 라우팅
    - Fluentd의 경량버전
      (서브 컴포넌트)
    - Fluentd보다
      적은 메모리를 사용
      (~650KB)
    - 주기능은 Forwarder
    - 클라이언트의 로그를 수집하는데 특화 됨
    
[출처]: @moonjuhyeon 님 

## 개발 서버에 k8s와 함께 띄워보자

EFK stack 은, `Elasticsearch` -> `Kibana` -> `Fluentd` 순으로 설치 진행 함

### 0. 사전 작업

먼저 efk 스택을 띄울 네임스페이스를 따로 지정한다. </br>
나는 `logging` 으로 진행했는데, helm 차트를 이용해서 설치할 경우 namespace 가 일치하지 않으면 설치하면서 에러가 날 수도 있다고 한다.
나 같은 경우 yaml 로 설치 예정이므로 해당 사항이 없었다.
```commandline
kubectl create namespace logging
```

참고로 watch -d 옵션을 이용하면 해당 namespace 에 파드가 생성되고 사라지는 변화를 계속 볼 수 있다.
```commandline
watch -d kubectl get all -n logging
```

현재 개발 서버는 150, 151 서버이며, 151을 워커노드로 사용 하고 있었다. </br>
워커노드에는 이미 띄워져있는 파드들이 많았고, 로그는 `/var/log/docker/containers/{container-name}.log` 에 파일 형태로 쌓이고 있었다.

### 1. Elasticsearch

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: elasticsearch
  namespace: logging
  labels:
    app: elasticsearch
spec:
  replicas: 1
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      labels:
        app: elasticsearch
    spec:
      containers:
        - name: elasticsearch
          // 주의: kibana 와 image 버전 정보가 맞지 않으면 연동이 실패함
          image: docker.elastic.co/elasticsearch/elasticsearch-oss:7.10.2
          env:
            - name: discovery.type
              value: single-node
          ports:
            - containerPort: 9200
            - containerPort: 9300
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: elasticsearch
  name: elasticsearch-svc
  namespace: logging
spec:
  ports:
    - name: elasticsearch-rest
      nodePort: 30920
      port: 9200
      protocol: TCP
      targetPort: 9200
    - name: elasticsearch-nodecom
      nodePort: 30930
      port: 9300
      protocol: TCP
      targetPort: 9300
  selector:
    app: elasticsearch
  type: NodePort

```
Deployment, Service 중에서도 Nodeport 로 이루어져 있다. </br>
우선 싱글노드로만 구성 하였다. </br>
kibana와 fluentd 는 9200 포트를 통해 접근 하게 된다. </br>


```commandline
kubectl port-forward pod {elasticsearch-pod-name} -n logging 9200:9200 --address 0.0.0.0&
```

9200번 포트를 포워딩 해준 후, `localhost:9200` 에 잘 떠있는지 확인한다.

```commandline
curl -X GET localhost:9200
```

### 2. Kibana

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kibana
  namespace: logging
  labels:
    app: kibana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kibana
  template:
    metadata:
      labels:
        app: kibana
    spec:
      containers:
        - name: kibana
          // 버전 주의
          image: docker.elastic.co/kibana/kibana-oss:7.10.2
          env:
            - name: SERVER_NAME
              value: kibana.kubenetes.example.com
            - name: ELASTICSEARCH_HOSTS
              value: { k8s cluster 내부 elastic search ip }
          ports:
            - containerPort: 5601
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: kibana
  name: kibana-svc
  namespace: logging
spec:
  ports:
    - nodePort: 30561
      port: 5601
      protocol: TCP
      targetPort: 5601
  selector:
    app: kibana
  type: NodePort

```

마찬가지로 포트 포워딩 후 5601을 포트를 통해 kibana Web UI에 접근 가능하다.

여기서 `ELASTICSEARCH_HOSTS` 의 value 는 k8s cluster 내부 ip 로 지정한다. </br>
기본적으로 k8s 파드 끼리 통신하기 위해서는 다음 명령어로 ip 를 알안낸다.
```commandline
kubectl get pod/elasticsearch-pod -n logging -o wide
```

```commandline
NAME                READY   STATUS    RESTARTS   AGE   IP            NODE    NOMINATED NODE   READINESS GATES
elasticsearch-pod   1/1     Running   0          8h    some-es-ip1   node1   <none>           <none>
```

### 3. Fluentd

```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: fluentd
  namespace: logging

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: fluentd
rules:
  - apiGroups:
      - ""
    resources:
      - pods
      - namespaces
    verbs:
      - get
      - list
      - watch

---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: fluentd
roleRef:
  kind: ClusterRole
  name: fluentd
  apiGroup: rbac.authorization.k8s.io
subjects:
  - kind: ServiceAccount
    name: fluentd
    namespace: logging
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
  namespace: logging
  labels:
    k8s-app: fluentd-logging
    version: v1
spec:
  selector:
    matchLabels:
      k8s-app: fluentd-logging
      version: v1
  template:
    metadata:
      labels:
        k8s-app: fluentd-logging
        version: v1
    spec:
      serviceAccount: fluentd
      serviceAccountName: fluentd
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
      containers:
        - name: fluentd
          image: fluent/fluentd-kubernetes-daemonset:v1.3-debian-elasticsearch
          env:
            - name: FLUENT_ELASTICSEARCH_HOST
              value: "elasticsearch-host"
            - name: FLUENT_ELASTICSEARCH_PORT
              value: "9200"
            - name: FLUENT_ELASTICSEARCH_SCHEME
              value: "http"
          resources:
            limits:
              memory: 200Mi
            requests:
              cpu: 100m
              memory: 200Mi
          volumeMounts:
            - name: varlog
              mountPath: /var/log
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
      terminationGracePeriodSeconds: 30
      volumes:
        - name: varlog
          hostPath:
            path: /var/log
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers

```

> Fluentd 는 모든 node 에 생성되어야 모든 노드에 대해 로그 수집이 가능하다. </br>
> 따라서 Daemonset 으로 배포되어야 한다.

<img width="1326" alt="스크린샷 2021-09-17 오후 11 25 57" src="https://user-images.githubusercontent.com/45758481/133799107-bb5fe8f0-cd1a-4f04-9fe0-ccb80413263d.png">

연동 성공하면 kibana 에서는 이런 화면을 볼 수 있다.

왼쪽 메뉴 클릭 -> Management -> StackManagement -> Index Patterns -> Create index pattern
<img width="1327" alt="스크린샷 2021-09-17 오후 11 27 30" src="https://user-images.githubusercontent.com/45758481/133799382-5570588d-187d-4092-90da-b0f232b38ccb.png">

이후 index name 지정 후, @timestamp 로 설정하면, Discover 메뉴에서 시간대에 따라 로그가 얼마나 찍히는지 볼 수 있다.

<img width="1070" alt="스크린샷 2021-09-17 오후 11 29 41" src="https://user-images.githubusercontent.com/45758481/133800012-6d910900-fb51-413c-b21b-2333934e85c2.png">


index 를 어떻게 지정하느냐에 따라 다양한 시각화 도구를 제공해준다.

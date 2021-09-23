# Service Endpoint
k8s를 사용하다 보면 k8s의 리소스가 아닌 외부의 리소스(ex.database, zookeeper)등에 접근해야 할때가 있다. 그때는 k8s에서 서비스를 생성하고 그 서비스에 endpoint를 지정하면 domain name으로 그 서비스에 접근했을때 외부로 연결 할 수 있다.

```yaml
kind: Service
apiVersion: v1
metadata:
  name: {service-name}
  namespace: {service-namespace}
spec:
  type: ClusterIP
  ports:
  - port: {port}
    targetPort: {port}
---
kind: Endpoints
apiVersion: v1
metadata:
  name: {service-name}
  namespace: {service-namespace}
subsets:
 - addresses:
     - ip: {외부 접근 ip}
   ports:
     - port: {port}
```

위 yaml 파일과 같이 서비스를 생성할 경우 service-name으로 접근할때 연결된 외부 IP로 포워딩 된다.
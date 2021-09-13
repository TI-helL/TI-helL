# kubectl-command.md


## 자주 쓰는 kubectl 명령어 정리
---
1. namespace pod, service, deployment 상태 지속적 확인
```
kubectl get all -n {namespace}
```

2. yaml 파일로 배포하기 
```
kubectl apply -f {configuration file name}
```

3. target port 로 포트 포워딩
```
kubectl port-forward {component-name} -n {namespaces} {target-port}:{node-port} --address=0.0.0.0 &
```

4. 특정 노드, 파드 등 정보 출력 
```
kubectl describe {node}|{pod}
```

5. 특정 pod의 컨테이너에 접근
```
kubectl -n {namespace-name} exec -it {pod-name} /bin/bash
```

6. 모든 namespace 의 pods 정보 확인
```
kubectl get pods -o wide --all-namespaces
```

7. 특정 pod 의 메타데이터 설정 확인
```
kubectl get pod {pod-name} -o yaml
```


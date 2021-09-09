# helm
k8s를 사용하다 보면 수많은 템플릿을 관리해야 한다. helm은 이런 템플릿 파일들을 관리하는 k8s 패키지 매니저 도구이다.  
helm은 차트와 차트 압축파일(tgz)를 만들 수 있다. 그리고 차트가 저장된 차트 저장소(chart repository)와 연결해 k8s 클러스터에 차트를 설치하거나 삭제 할 수 있다.  

## helm의 3가지 주요 개념
- chart : k8s에서 실행할 애플리케이션을 만드는데 필요한 정보 묶음
- config : 패키지한 chart에 넣어서 배포 가능한 오브젝트를 만들 때 사용할 수 있는 설정
- release : 특정 컨피그를 이용하여 실행중인 차트의 인스턴스

## helm 차트 생성 및 구조

### helm 차트 생성 명령어
> helm create sample

### helm 차트의 구조
```
sample
├── Chart.yaml
├── charts
├── templates
│   ├── NOTES.txt
│   ├── _helpers.tpl
│   ├── deployment.yaml
│   ├── hpa.yaml
│   ├── ingress.yaml
│   ├── service.yaml
│   ├── serviceaccount.yaml
│   └── tests
│       └── test-connection.yaml
└── values.yaml
```

value.yaml 안에 있는 데이터들이 templates 디렉터리의 yaml 안에서 매핑되어 사용된다. argocd에서 사용할 때는 argocd가 알아서 helm 차트로 인식한다.
# pod 구성 패턴

## 사이트카 패턴
사이트카 패턴은 원래 사용하려던 기본 컨테이너의 기능을 확장시키거나 강화하는 용도의 컨테이너를 추가하는 것을 의미한다. 기본 컨테이너는 원래의 목적에만 충실하도록 구성하고 나머지 고통 부가 기능들은 사이드카 컨테이너를 추가해서 사용한다. 하나의 파드에 웹서버 컨테이너와 로그수집 컨테이너가 같이 있는 경우를 생각해 볼 수 있다.

## 앰배서더 패턴
앰배서더 패턴은 파드 안에서 프록시 역할을 하는 컨테이너를 추가하는 패턴이다. 파드 안에서 외부 서버에 접근할 때 내부 프록시에 접근하도록 설정하고 실제 외부와의 연결은 프록시에서 알아서 처리하도록 구성한다. Istio에서 사용하는 pod 구성 패턴이다.

## 어댑터 패턴
어댑터 패턴은 파드 외부로 노출되는 정보를 표준화하는 어댑터 컨테이너를 의미한다. 어댑터 컨테이너(모니터링 컨테이너)로 파드의 리소스 지표를 표준화한 형식으로 노출시키고 외부의 시스템에서 해당 데이터를 주기적으로 가져가서 모니터링하는데 사용한다. 프로메테우스에서 사용하는 pod 구성 패턴이다.
# Multi Container
하나의 pod에 다수의 컨테이너를 사용
- 하나의 pod를 사용하는 경우 *같은 네트워크 인터페이스와 IPC, Volume 등을 공유
- pod는 데이터의 지역성을 보장하고 여러개의 응용프로그램이 결합된 형태로 하나의 포드를 구성할 수 있음

# 컨테이너 리소스 정책 설정 LimitRange
- CPU와 메모리는 집합적으로 컴퓨팅 리소스라고 함
- CPU 및 메모리는 각각 자원 유형을 지니면 자원 유형에는 기본 단위를 사용
- 리소스 요청 설정하기
  > spec.containers[].resources.requests.cpu
  > spec.containers[].resources.requests.memory
- 리소스 제한 설정하기
  > spec.containers[].resources.limits.cpu
  > spec.containers[].resources.limits.memory

## 컨테이너 리소스 요구사항
- CPU는 코어 단위로 지정되며 메모리는 바이트 단위로 지정
  |자원 유형|단위|
  |:-------:|:---:|
  |CPU|m(millicpu)|
  |Memory|....Ti, Gi, Mi, Ki, T, G, M, K|
  - CPU 0.1은 100m과 동일
  - K, M, G의 단위는 1000씩 증가
  - Ki, Mi, Gi의 단위는 1024씩 증가
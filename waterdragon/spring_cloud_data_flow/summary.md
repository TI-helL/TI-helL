# Spring Cloud Data Flow 간단 정리

https://dataflow.spring.io/docs/installation/local 

- Cloud Foundry, kubernetes를 위한 micro service 기반 스트리밍 및 일괄 데이터 처리
- 다양한 프로그래밍 언어로 stream, batch 처리를 할수 있음
- 메시징 미들웨어 사용가능 ex)kafka stream, Kinesis
- web UI 제공, drag and drop으로 파이프라인 작성 가능
- https://github.com/spring-cloud/spring-cloud-stream-samples를 참고하여 custom stream Spring boot application 작성 가능
- batch성 작업도 작성 가능(Spring batch 사용)
- pipeline은 source, processor, sink 로 구성되어 있고 이들 각각은 Spring boot application 임


# kafka

### 이벤트 스트리밍
- 이벤트 스트림의 형태로 실시간 데이터를 캡쳐
- 이후 검색할 수 있도록 이벤트 스트림을 영구 저장

### 작동
- 카프카는 TCP 통신하는 서버/클라이언트로 구성된 분산 시스템
- 서버 
    - 하나 이상의 서버 클러스터로 실행됨
    - 서버 중 일부는 브로크(스토리지 계층)을 형성
    - 서버 중 하나가 장애 발생시 다른 서버가 이어 받아 데이터 손실이 없음
- 클라이언트
    - 오류가 발생시 이벤트 스트림을 병렬/대규모/내결함성(시스템 일부구성요소가 작동하지 않아도 계속 작동하는 기능)으로 처리하여 MSA

### 이벤트
- 비즈니스에서 "발생한 무언가"를 기록한 것
- 키/값/타임스탬프 및 메타데이터 헤더로 구성
```
Event key: "Alice"
Event value: "Made a payment of $200 to Bob"
Event timestamp: "Jun. 25, 2020 at 2:06 p.m.
```
- 주제로 구성되고 파일 시스템의 폴더와 유사함 (주제 : 지불)
- 이벤트는 소비후 삭제되지 않음
- 주제별 설정으로 이벤트 유지 기간 정의후 이전 이벤트 삭제
- 장기간 저장하는 것이 완벽
- 주제는 분할되어 있음. 


### 생산자
- 이벤트를 쓰는 클라이언트 프로그램

### 소비자
- 이벤트를 구독(읽기/처리)하는 프로그램


### kafka 설치
```
$ tar -xzf kafka_2.13-3.3.1.tgz
$ cd kafka_2.13-3.3.1
```

### kafka 서버 시작
```
# 1. 주키퍼
# jokeeper service
$ bin/zookeeper-server-start.sh config/zookeeper.
properties
# kafka broker service
$ bin/kafka-server-start.sh config/server.properties

```

### 주제 생성
- 이벤트는 주제에 저장된다.
- 매우 단순화된 주제는 파일 시스템의 폴더와 유사함. 이벤트는 해당 폴더의 파일이다.
```
$ bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092

$ bin/kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092
Topic: quickstart-events        TopicId: NPmZHyhbR9y00wMglMH2sg PartitionCount: 1       ReplicationFactor: 1	Configs:
    Topic: quickstart-events Partition: 0    Leader: 0   Replicas: 0 Isr: 0

```

### 주제에 이벤트 생성
- 이벤트 쓰기/읽기를 위해 카프카 브로커와 통신
- 수신되면 내구성/내결함성 방식으로 이벤트 저장
```
$ bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
This is my first event
This is my second event
```

### 이벤트 읽기
```
$ bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --booㅇtstrap-server localhost:9092
This is my first event
This is my second event
```

### 카프카 connect로 데이터를 이벤트 스트림으로 가져오기

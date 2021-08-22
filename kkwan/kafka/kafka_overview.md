# **Kafka**

> Updated on July 22, 2021 by kkwan

Kafka는 대용량, 대규모 메시지 데이터를 신속하게 처리하기 위해 개발된 분산 메시징 시스템이다. 대용량 실시간 로그 처리에 특화되어 있는 시스템으로써 데이터 유실 없이 안전한 전달을 요구하는 환경에서 사용되며 Fault-Tolerant와 높은 TPS(Transaction per Second)를 보장한다.

현재 빅데이터 분석 시 다수의 스토리지와 분석 시스템에 연결하기 위해 필수 도구로 인식되고 있으며, Netflix, Airbnb, Microsoft, Kakao 등에서 사용하고 있다.

Kafka를 사용함에 있어 필수 구성요소인 Zookeeper는 Kafka의 외부 Metadata 관리 시스템 역할을 했었으나 데이터 중복, 시스템 복잡성 증가 등 다양한 문제점을 유발하였다. 작성 시점(21.07.22) 기준 2.8.0이 Release 되었으며, Zookeeper를 제거한 KRaft(Kafka Raft Metadata) Mode가 Early Access로 해당 Release에 포함되어 있다.

## **Kafka Terminology**

- Kafka Broker
- Kafka Topics
- Kafka Partitions
- Kafka Producers
- Kafka Consumers
- Offset in Kafka
- Kafka Consumer Group
- Kafka Log Anatom
- Kafka Message Ordering and Client Acknowledgments
- Node in Kafka
- Kafka Cluster
- Kafka Replicas
- Kafka Message
- Kafka Leader
- Follower in Kafka
- Kafka Data Log
- Kafka Connector API

## **Kafka Features**

- Scalability
  > 4개의 Dimension(event producers, event processors, event consumers and event connectors)에서 중단없이 확장성을 보장할 수 있다.
- High-Volume
  > 빅데이터 수집 시 방대한 양의 데이터 스트림을 처리할 수 있다.
- Data Transformations
  > Producer의 데이터 스트림 과정에서 데이터를 핸들링할 수 있다.
- Fault Tolerance
  > Master Brocker 및 Database에 장애가 발생해도 서비스를 지속할 수 있다.
- Reliability
  > Distributed, partitioned, replicated and fault tolerant를 보장하기 때문에 매우 안정적이다.
- Durability
  > Distributed commit log를 통해 내구성을 보장한다.
- Performance
  > TB단위의 데이터(Producing and Subscribing 메시지)를 저장해도 안정성을 보장한다.
- Zero Downtime
  > 시스템 무중단 및 데이터 안정성을 보장한다.
- Extensibility
  > 다양한 방법을 통해 Kafka에 연결 가능하며, 필요에 따라 새로운 Connector 개발이 가능하다.
- Replication
  > 데이터 수집 파이프라인을 통해 이벤트를 복제할 수 있다.

## **Kafka Architecture**

![Kafka Architecture](assets/images/Kafka-Architecture.png)

## **Reference**

- Epic Developer, [**[Apache Kafka] 1.소개 및 아키텍처 정리**](https://epicdevs.com/17?category=460351), 2015

- 새로비, [**[Kafka, 카프카] 아파치 카프카(Apache Kafka) 아키텍처 및 동작방식, 파티션 읽기 쓰기(Partition Read and Write)**](https://engkimbs.tistory.com/691), 2018

- Data-Flair, [**Apache Kafka Tutorials**](https://data-flair.training/blogs/category/kafka/), 2018

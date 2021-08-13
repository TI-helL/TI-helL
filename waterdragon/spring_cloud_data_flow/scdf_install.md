# Spring Cloud Data Flow 설치

document에 나와 있는 설치는 docker-compose에서 kafka 이미지를 사용하고 아래 설치방법은 외부의 kafka를 사용하는 방법임

## kafka, zookeeper 실행
> $ git clone https://github.com/wurstmeister/kafka-docker.git

docker-compose-single-broker.yaml 파일 수정
```yaml
version: '2'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    ports:
      - "2181:2181"
  kafka:
    build: .
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: {localhost:10.100.2.74}
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

> $ docker-compose -f docker-compose-single-broker.yaml up

## scdf docker-compose file 다운로드
> $ wget -O docker-compose.yml https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/main/src/docker-compose/docker-compose.yml; 
> \$ DATAFLOW_VERSION=2.8.1 SKIPPER_VERSION=2.7.1 
- docker-compose.yaml 파일 수정 (ip 부분 수정)
```yaml
version: '3'

services:
  mysql:
    image: mysql:5.7.25
    container_name: dataflow-mysql
    environment:
      MYSQL_DATABASE: dataflow
      MYSQL_USER: root
      MYSQL_ROOT_PASSWORD: rootpw
    expose:
      - 3306

  kafka-broker:
    image: confluentinc/cp-kafka:5.5.2
    container_name: dataflow-kafka
    expose:
      - "9092"
    environment:
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://{localhost:10.100.2.74}:9092
      - KAFKA_ZOOKEEPER_CONNECT={localhost:10.100.2.74}:2181
      - KAFKA_ADVERTISED_HOST_NAME=kafka-broker
      - KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
      - KAFKA_LOG4J_ROOT_LOGLEVEL=ERROR
      - KAFKA_LOG4J_LOGGERS=org.apache.zookeeper=ERROR,org.apache.kafka=ERROR,kafka=ERROR,kafka.cluster=ERROR,kafka.controller=ERROR,kafka.coordinator=ERROR,kafka.log=ERROR,kafka.server=ERROR,kafka.zookeeper=ERROR,state.change.logger=ERROR
    depends_on:
      - zookeeper

  zookeeper:
    image: confluentinc/cp-zookeeper:5.5.2
    container_name: dataflow-kafka-zookeeper
    expose:
      - "2181"
    environment:
      - ZOOKEEPER_CLIENT_PORT=2181

  dataflow-server:
    image: springcloud/spring-cloud-dataflow-server:${DATAFLOW_VERSION:-2.9.0-SNAPSHOT}
    container_name: dataflow-server
    ports:
      - "9393:9393"
    environment:
      - SPRING_CLOUD_DATAFLOW_APPLICATIONPROPERTIES_STREAM_SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS=PLAINTEXT://{localhost:10.100.2.74}:9092
      - SPRING_CLOUD_DATAFLOW_APPLICATIONPROPERTIES_STREAM_SPRING_CLOUD_STREAM_KAFKA_STREAMS_BINDER_BROKERS=PLAINTEXT://{localhost:10.100.2.74}:9092
      - SPRING_CLOUD_DATAFLOW_APPLICATIONPROPERTIES_STREAM_SPRING_CLOUD_STREAM_KAFKA_BINDER_ZKNODES=10.100.2.74:2181
      - SPRING_CLOUD_DATAFLOW_APPLICATIONPROPERTIES_STREAM_SPRING_CLOUD_STREAM_KAFKA_STREAMS_BINDER_ZKNODES=10.100.2.74:2181

      - SPRING_CLOUD_DATAFLOW_APPLICATIONPROPERTIES_STREAM_SPRING_KAFKA_STREAMS_PROPERTIES_METRICS_RECORDING_LEVEL=DEBUG

      - SPRING_CLOUD_SKIPPER_CLIENT_SERVER_URI=${SKIPPER_URI:-http://{localhost:10.100.2.74}:7577}/api

      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/dataflow
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=rootpw
      - SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.mariadb.jdbc.Driver
      # (Optionally) authenticate the default Docker Hub access for the App Metadata access.
      - SPRING_CLOUD_DATAFLOW_CONTAINER_REGISTRY_CONFIGURATIONS_DEFAULT_USER=${METADATA_DEFAULT_DOCKERHUB_USER}
      - SPRING_CLOUD_DATAFLOW_CONTAINER_REGISTRY_CONFIGURATIONS_DEFAULT_SECRET=${METADATA_DEFAULT_DOCKERHUB_PASSWORD}
    depends_on:
      - kafka-broker
      - skipper-server
    restart: always
    volumes:
      - ${HOST_MOUNT_PATH:-.}:${DOCKER_MOUNT_PATH:-/home/cnb/scdf}

  skipper-server:
    image: springcloud/spring-cloud-skipper-server:${SKIPPER_VERSION:-2.8.0-SNAPSHOT}
    container_name: skipper
    ports:
      - "7577:7577"
      - ${APPS_PORT_RANGE:-20000-20195:20000-20195}
    environment:
      - SPRING_CLOUD_SKIPPER_SERVER_PLATFORM_LOCAL_ACCOUNTS_DEFAULT_PORTRANGE_LOW=20000
      - SPRING_CLOUD_SKIPPER_SERVER_PLATFORM_LOCAL_ACCOUNTS_DEFAULT_PORTRANGE_HIGH=20190
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/dataflow
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=rootpw
      - SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.mariadb.jdbc.Driver
      - LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_CLOUD_SKIPPER_SERVER_DEPLOYER=ERROR
    restart: always
    volumes:
      - ${HOST_MOUNT_PATH:-.}:${DOCKER_MOUNT_PATH:-/home/cnb/scdf}

```

> $ docker-compose up

## 브라우저 접속
- localhost:9393/dashboard

![스크린샷 2021-08-12 오후 5 49 18](https://user-images.githubusercontent.com/24540286/129167942-d706dcf4-251f-4a4d-b780-37308600d014.png)

# kafka lag monitoring
kafka burrow, telegraf, elastic search, kibana, grafana를 사용한 lag 모니터링

## kafka burrow docker 환경에서 실행
### 1. kafka burrow 실행

> $ git clone https://github.com/linkedin/Burrow.git

- docker-compose.yml 파일 수정 -> KAFKA_ADVERTISED_HOST_NAME:10.100.2.74(localhost)

    ```yaml
    version: "2"
    services:
    burrow:
        build: .
        volumes:
        - ${PWD}/docker-config:/etc/burrow/
        - ${PWD}/tmp:/var/tmp/burrow
        ports:
        - 8000:8000
        depends_on:
        - zookeeper
        - kafka
        restart: always

    zookeeper:
        image: wurstmeister/zookeeper
        ports:
        - 2181:2181

    kafka:
        image: wurstmeister/kafka
        ports:
        - 9092:9092
        environment:
        KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181/local
        KAFKA_ADVERTISED_HOST_NAME: 10.100.2.74
        KAFKA_ADVERTISED_PORT: 9092
        KAFKA_CREATE_TOPICS: "test-topic:2:1,test-topic2:1:1,test-topic3:1:1"
    ```

> $ docker build . && docker-compose up

### 2. elastic search 실행 

> $ docker pull docker.elastic.co/elasticsearch/elasticsearch:7.14.0

> $ docker run -it --name elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.14.0

### 3. kibana 실행

> $ docker pull docker.elastic.co/kibana/kibana:7.14.0

> docker run -it --name kibana -p 5601:5601 -e "ELASTICSEARCH_HOSTS=http://{localhost:10.100.2.74}:9200" docker.elastic.co/kibana/kibana:7.14.0

`localhost:5601/app/home#/` 으로 접속

### 4. telegraf 실행
> $ brew install telegraf
- telegraf.conf 파일 작성
    ```
    [[inputs.burrow]]
    servers = ["http://{localhost:10.100.2.}74:8000"]
    topics_exclude = [ "__consumer_offsets" ]
    groups_exclude = ["console-*"]

    [[outputs.elasticsearch]]
    urls = [ "http://{localhost:10.100.2.74}:9200" ]
    timeout = "5s"
    enable_sniffer = false
    health_check_interval = "10s"
    index_name = "burrow-%Y.%m.%d"
    manage_template = false
    ```
- telegraf로 elastic에 데이터 전송 전에 consumer를 하나 만들어서 데이터 수신 테스트를 해야 lag 정보까지 elastic에 저장 할 수 있음
> $ telegraf --config telegraf.conf

### 5. kibana index pattern 설정

![스크린샷 2021-08-06 오후 3 39 53](https://user-images.githubusercontent.com/24540286/128467370-2ac2393d-4b57-48ad-9673-9c7f39aba602.png)


![스크린샷 2021-08-06 오후 3 41 04](https://user-images.githubusercontent.com/24540286/128467487-3c66f80c-53ab-400f-bad3-61fbd873437b.png)

### 6. grafana 실행
> docker run -it --name grafana -p 3000:3000 grafana/grafana
- 초기 id/pw -> admin/admin

### 7. grafana datasource 추가
![스크린샷 2021-08-06 오후 3 45 49](https://user-images.githubusercontent.com/24540286/128468138-4c2a5091-3aa5-4110-8532-65c5f1dac20e.png)

- elastic search version을 꼭 7.0+로 설정할 것
![스크린샷 2021-08-06 오후 3 52 00](https://user-images.githubusercontent.com/24540286/128468783-7313bd1e-353a-4c4e-a8d4-a4d90e343a7f.png)


### 8. grafana graph 생성
![스크린샷 2021-08-06 오후 4 16 52](https://user-images.githubusercontent.com/24540286/128471774-6ca0d252-573b-4d02-bf90-ba74dbf5bf78.png)
![스크린샷 2021-08-06 오후 4 17 53](https://user-images.githubusercontent.com/24540286/128471919-3f3512a5-f56c-4b72-b1fb-8dc1c6b03af0.png)


### 9. 고의로 lag 발생
![스크린샷 2021-08-06 오후 4 32 59](https://user-images.githubusercontent.com/24540286/128474012-4c278299-bcb4-4b75-9b4e-3c1f06ea2be5.png)

#### 후기
일단은 어떤식으로 동작하는지 모르고 그냥 구축만 한것이기 때문에 더 효율적으로 사용하기 위해 동작과정과 설정에 대해 추가적인 스터디가 필요해 보임
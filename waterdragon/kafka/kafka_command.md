# 자주 사용하는 kafka 명령어 및 burrow 경로
## kafka command
### topic

- topic list
> ./kafka-topics.sh --list --bootstrap-server localhost:9092

- describe topic
> ./kafka-topics.sh --topic test-topic --describe --bootstrap-server localhost:9092



### producer

- producer
> ./kafka-console-producer.sh --bootstrap-server localhost:9092 --toipc test-topic

### consumer

- consumer
> ./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test-topic --group test-group --from-beginning

- consumer group list
> ./kafka-consumer-groups.sh --list --bootstrap-server localhost:9092

- consumer group describe
> ./kafka-consumer-groups.sh --describe --group test-group --bootstrap-server localhost:9092

## burrow 경로
- health check
> /burrow/admin

- list clusters
> /v3/kafka

- cluster detail
> /v3/kafka/{cluster:local}

- list consumers
> /v3/kafka/{cluster:lcoal}/consumer

- list topic
> /v3/kafka/{cluster:local}/topic

- consumer detail
> /v3/kafka/{cluster:local}/consumer/{group:test-group}

> /v3/kafka/{cluster:local}/consumer/{consumer-group:test-group}/status

> /v3/kafka/{cluster:local}/consumer/{consumer-group:test-group}/lag
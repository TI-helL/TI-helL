# kafka partitioner
카프카는 partition에 데이터를 넣을 때 기본적으로 round robin 방식으로 데이터를 저장한다. org.apache.kafka.clients.producer.Partitioner 인터페이스를 구현하여 원하는 파티션에 데이터를 저장할 수 있다.

## bootstrap.yml
```yaml
server:
  port: 9999

spring:
  kafka:
    producer:
      bootstrap-servers: localhost:9092
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      properties:
        #custom partitioner 지정
        partitioner.class: airi.kr.kafkademo.partitioner.CustomPartitioner
    consumer:
      bootstrap-servers: localhost:9092
      auto-offset-reset: earliest
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      enable-auto-commit: false
```

## Consumer
```java
package airi.kr.kafkademo.consumer;

import java.io.IOException;
import java.lang.reflect.InaccessibleObjectException;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.TopicPartition;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

  @KafkaListener(topicPartitions = @TopicPartition(topic = "test01", partitions = {"0"}), groupId = "group1")
  public void consume(String msg) throws IOException{
    System.out.println(String.format("partition 0(msg.length is even) : %s", msg));
  }

  @KafkaListener(topicPartitions = @TopicPartition(topic = "test01", partitions = {"1"}), groupId = "group1")
  public void consume2(String msg) throws IOException{
    System.out.println(String.format("partition 1(msg.length is odd) : %s", msg));
  }
}

```

## producer

```java
package airi.kr.kafkademo.producer;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {
  private static final String topic = "test01";
  private final KafkaTemplate<String, String> kafkaTemplate;

  public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
    this.kafkaTemplate = kafkaTemplate;
  }

  public void sendMessage(String msg){
    this.kafkaTemplate.send(topic, msg);
  }

}

```

## partitioner
```java
package airi.kr.kafkademo.partitioner;

import java.util.Map;
import org.apache.kafka.clients.producer.Partitioner;
import org.apache.kafka.common.Cluster;

public class CustomPartitioner implements Partitioner {

  @Override //파티션의 번호를 지정
  public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
    int numPartition = cluster.partitionCountForTopic(topic);
    return value.toString().length() % numPartition;
  }

  @Override //This is called when partitioner is closed
  public void close() {

  }

  /**
  org.apache.kafka.common.Configure 인터페이스의 구현체
  Configure this class with the given key-value pairs
  */
  @Override 
  public void configure(Map<String, ?> configs) {

  }
}

```
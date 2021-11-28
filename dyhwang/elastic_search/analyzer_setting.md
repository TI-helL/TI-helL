# index setting
## nori tokenizer 설치
```Dockerfile
FROM docker.elastic.co/elasticsearch/elasticsearch:7.15.2
WORKDIR /usr/share/elasticsearch
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-nori
```
## index setting
```json
"settings" : {
  "analysis" : {
    "analyzer" : {
      "my_analyzer" : {
        "filter" : [
          "nori_readingform"
        ],
        "type" : "custom",
        "tokenizer" : "my_tokenizer"
      }
    },
    "tokenizer" : {
      "my_tokenizer" : {
        "type" : "nori_tokenizer"
      }
    }
  }
}
```
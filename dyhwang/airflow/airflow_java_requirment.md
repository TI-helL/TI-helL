# airflow 에서 spark-submit을 사용하기
pyspark를 지원하기 위해 spark_provider를 설치하여 spark-submit을 사용하는데도
java_home이 필요하다란 에러가 발생한다.<br>
그래서 아래와 같이 dockerfile을 설정해 주어야 한다.<br>

```yml
FROM apache/airflow:2.0.2

USER root

# Install OpenJDK-11
RUN apt update && \
    apt-get install -y openjdk-11-jdk && \
    apt-get install -y ant && \
    apt-get clean;

# Set JAVA_HOME
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64/
RUN export JAVA_HOME

USER airflow

WORKDIR /app

COPY requirements.txt /app

RUN pip install --trusted-host pypi.python.org -r requirements.txt
```
[출처](https://stackoverflow.com/questions/67268054/how-to-install-java-in-an-airflow-container-using-docker-compose-yaml/67561942#67561942)
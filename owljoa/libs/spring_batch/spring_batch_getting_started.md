# Spring Batch Getting Started

- [1. Spring Initializr 로 프로젝트 생성](#1-spring-initializr-로-프로젝트-생성)
- [2. 비즈니스 클래스 추가](#2-비즈니스-클래스-추가)
- [3. 데이터 처리 용도의 프로세서 클래스 추가](#3-데이터-처리-용도의-프로세서-클래스-추가)
- [4. 배치 환경 설정](#4-배치-환경-설정)
  - [4.1. 배치 작업에 사용될 도구 설정](#41-배치-작업에-사용될-도구-설정)
    - [4.1.1. reader()](#411-reader--)
    - [4.1.2. processor()](#412-processor--)
    - [4.1.3. writer(DataSource)](#413-writer-datasource-)
  - [4.2. 배치 작업과 작업을 구성하는 스탭 설정](#42-배치-작업과-작업을-구성하는-스탭-설정)
    - [4.2.1. 작업과 스탭 인스턴스를 생성할 빌더팩토리 삽입](#421-작업과-스탭-인스턴스를-생성할-빌더팩토리-삽입)
    - [4.2.2. 작업과 스탭 추가](#422-작업과-스탭-추가)
    - [4.2.3. 작업 완료 알림 용도의 클래스](#423-작업-완료-알림-용도의-클래스)
- [5. 실행](#5-실행)
- [[참고]](#참고)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

<br>

# 1. Spring Initializr 로 프로젝트 생성

- [Spring Initializr](https://start.spring.io)
- 원하는 빌더, 언어, spring boot 버전 선택
- Dependencies
  - Spring Batch
  - HyperSQL Database
  - (optional) Lombok

<br>

# 2. 비즈니스 클래스 추가

- input/output 데이터 형태를 정의

  - input: 배치 실행 이전의 데이터 (변형 이전의 데이터)
  - output: 배치 실행 이후 변형된 데이터

    <br>

- Person 클래스

  - 성과 이름으로 구성된 형태
  - 프로젝트 생성 시 dependencies에 Lombok을 추가하지 않은 경우

    ```java
    package com.owljoa.myspringbatch;

    public class Person {

      private String lastName;
      private String firstName;

      public Person() {
      }

      public Person(String lastName, String firstName) {
        this.lastName = lastName;
        this.firstName = firstName;
      }

      public String getLastName() {
        return lastName;
      }

      public void setLastName(String lastName) {
        this.lastName = lastName;
      }

      public String getFirstName() {
        return firstName;
      }

      public void setFirstName(String firstName) {
        this.firstName = firstName;
      }

      @Override
      public String toString() {
        return "Person{" +
            "lastName='" + lastName + '\'' +
            ", firstName='" + firstName + '\'' +
            '}';
      }
    }
    ```

    <br>

  - 프로젝트 생성 시 dependencies에 Lombok을 추가해둔 경우

    ```java
    package com.owljoa.myspringbatch;

    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import lombok.ToString;

    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    @Setter
    @Getter
    public class Person {

      private String lastName;
      private String firstName;
    }
    ```

<br><br>

# 3. 데이터 처리 용도의 프로세서 클래스 추가

- 데이터의 변형을 담당
- Spring Batch의 `ItemProcessor` 인터페이스를 구현

  - `implements ItemProcessor<Person, Person>` 에서 `<Person, Person>` 의 앞 타입은 변형 이전에 입력 받을 타입, 뒷 타입은 변형 이후 출력할 타입을 명시 → 이에 따라 오버라이드하는 메소드의 파라미터와 리턴 타입이 달라짐

  <br>

- Person 데이터 구조내의 이름들(lastName, firstName)을 모두 대문자로 변경하는 프로세서

  ```java
  package com.owljoa.myspringbatch;

  import org.slf4j.Logger;
  import org.slf4j.LoggerFactory;
  import org.springframework.batch.item.ItemProcessor;

  public class PersonItemProcessor implements ItemProcessor<Person, Person> {

    private static final Logger log = LoggerFactory.getLogger(PersonItemProcessor.class);

  	// ItemProcessor<Person, Person> 인터페이스를 구현하기 때문에
  	// process 메소드의 파라미터와 리턴 타입을 모두 Person으로 정의하여 구현해야함
    @Override
    public Person process(final Person person) throws Exception {
      final String firstName = person.getFirstName().toUpperCase();
      final String lastName = person.getLastName().toUpperCase();

      final Person transformedPerson = new Person(firstName, lastName);

      log.info("Converting ({}) into ({})", person, transformedPerson);

      return transformedPerson;
    }
  }
  ```

  <br><br>

# 4. 배치 환경 설정

## 4.1. 배치 작업에 사용될 도구 설정

- 배치 작업은 일반적으로 데이터를 (어딘가에서) 읽어와서, 변형하고, 변형된 데이터를 (어딘가로) 내보내는 과정으로 구성됨

### 4.1.1. reader()

- 데이터를 class path의 resource내의 sample-data.csv 파일로부터 읽어와서, csv파일의 각 row를 `Person` 객체에 맞게 파싱하는 `ItemReader` 인스턴스 생성

  ```java
  @Bean
  public FlatFileItemReader<Person> reader() {
    return new FlatFileItemReaderBuilder<Person>()
        .name("personItemReader")
        .resource(new ClassPathResource("sample-data.csv"))
        .delimited()
        .names("firstName", "lastName")
        .fieldSetMapper(new BeanWrapperFieldSetMapper<Person>() {{
          setTargetType(Person.class);
        }})
        .build();
  }
  ```

<br>

### 4.1.2. processor()

- 데이터를 변형하는 [PersonItemProcessor](https://www.notion.so/Spring-Batch-Getting-Started-e5519f531234424cb8461d080bcbf6ce)를 생성

  ```java
  import org.springframework.context.annotation.Bean;
  import org.springframework.batch.item.file.FlatFileItemReader;

  @Bean
  public PersonItemProcessor processor() {
    return new PersonItemProcessor();
  }
  ```

<br>

### 4.1.3. writer(DataSource)

- 변형된 데이터를 (어딘가로) 내보내는 `ItemWriter` 인스턴스 생성
- `@EnableBatchProcessing` 어노테이션이 제공하는 메모리 DB에 대한 DataSource를 자동으로 가져옴
- Person 데이터를 저장하는 쿼리도 포함됨

  ```java
  @Bean
  public JdbcBatchItemWriter<Person> writer(DataSource dataSource) {
    return new JdbcBatchItemWriterBuilder<Person>()
        .itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
        .sql("INSERT INTO people (first_name, last_name) VALUES (:firstName, :lastName)")
        .dataSource(dataSource)
        .build();
  }
  ```

<br>

## 4.2. 배치 작업과 작업을 구성하는 스탭 설정

<br>

### 4.2.1. 작업과 스탭 인스턴스를 생성할 빌더팩토리 삽입

- `JobBuilderFactory`, `StepBuilderFactory` 삽입
- `@EnableBatchProcessing` 어노테이션은 배치 작업을 위해 필요한 bean들을 추가해줌

```java
package com.owljoa.myspringbatch;

...

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

...

@Configuration
@EnableBatchProcessing
public class BatchConfiguration {

  @Autowired
  public JobBuilderFactory jobBuilderFactory;

  @Autowired
  public StepBuilderFactory stepBuilderFactory;

	...

}
```

<br>

### 4.2.2. 작업과 스탭 추가

- Job을 정의 (`importUserJob`)

  - 작업 실행상태를 유지하기 위해 DB를 사용하기 때문에 incrementer 필요
  - 작업에 포함할 스탭 지정 (여러 개도 가능)
  - JobCompletionNotificationListener 는 아래에서 다시 설명

  <br>

- Job을 구성하는 Step 정의 (`step1`)
  - 한 번에 처리할 데이터 갯수 지정
    - `<Person, Person>chunk(10)`
      - 한 번에 10개 데이터 처리
      - `<Person, Person>chunk(10)` 의 `<Person, Person>` 는 각 chunk의 input, output 타입을 나타냄
  - Step에서 사용할 reader, processor, writer를 지정

```java
@Bean
public Job importUserJob(JobCompletionNotificationListener listner, Step step1) {
  return jobBuilderFactory.get("importUserJob")
      .incrementer(new RunIdIncrementer())
      .listener(listner)
      .flow(step1)
      .end()
      .build();
}

@Bean
public Step step1(JdbcBatchItemWriter<Person> writer) {
  return stepBuilderFactory.get("step1")
      .<Person, Person>chunk(10)
      .reader(reader())
      .processor(processor())
      .writer(writer)
      .build();
}
```

<br>

### 4.2.3. 작업 완료 알림 용도의 클래스

- `JobExecutionListenerSupport`를 상속받아 `afterJob` 메소드를 오버라이드해서 작업 종료 이후 작업 상태가 완료인 경우 작업 완료 및 검증 로그 출력
  - `JobExecutionListenerSupport` : JobExecutionListener의 구현체로 작업 시작 직전과 작업 종료 직후 시점의 콜백 메소드 제공
  - `afterJob` : 작업 종료 직후 시점의 콜백 메소드

```java
package com.owljoa.myspringbatch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

  private static final Logger log = LoggerFactory.getLogger(
      JobCompletionNotificationListener.class);

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public void afterJob(JobExecution jobExecution) {
    if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
      log.info("!!! JOB FINISHED! Time to verify the results");

      jdbcTemplate.query("SELECT first_name, last_name FROM people",
          (rs, row) -> new Person(
              rs.getString(1),
              rs.getString(2))
      ).forEach(person -> log.info("Found <{}> in the database.", person));
    }
  }
}
```

<br><br>

# 5. 실행

- `System.exit` 메소드와 `SpringApplication.exit` 메소드는 작업 완료 이후에 JVM이 종료되도록 함

  - 가이드에는 이렇게 나와있는데 초기 프로젝트 세팅 상태로 실행해도 작업 완료 이후에 앱이 종료된다.. Jar로 빌드해서 실행해도 같은 결과가 나온다.

  ```java
  package com.owljoa.myspringbatch;

  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;

  @SpringBootApplication
  public class MyspringbatchApplication {

    public static void main(String[] args) {
      System.exit(
          SpringApplication.exit(SpringApplication.run(MyspringbatchApplication.class, args)));
    }

  }
  ```

- 실행 결과
  ```java
  Running default command line with: []
  Job: [FlowJob: [name=importUserJob]] launched with the following parameters: [{run.id=1}]
  Executing step: [step1]
  Converting (Person(lastName=Doe, firstName=Jill)) into (Person(lastName=JILL, firstName=DOE))
  Converting (Person(lastName=Doe, firstName=Joe)) into (Person(lastName=JOE, firstName=DOE))
  Converting (Person(lastName=Doe, firstName=Justin)) into (Person(lastName=JUSTIN, firstName=DOE))
  Converting (Person(lastName=Doe, firstName=Jane)) into (Person(lastName=JANE, firstName=DOE))
  Converting (Person(lastName=Doe, firstName=John)) into (Person(lastName=JOHN, firstName=DOE))
  Step: [step1] executed in 50ms
  !!! JOB FINISHED! Time to verify the results
  Found <Person(lastName=DOE, firstName=JILL)> in the database.
  Found <Person(lastName=DOE, firstName=JOE)> in the database.
  Found <Person(lastName=DOE, firstName=JUSTIN)> in the database.
  Found <Person(lastName=DOE, firstName=JANE)> in the database.
  Found <Person(lastName=DOE, firstName=JOHN)> in the database.
  Job: [FlowJob: [name=importUserJob]] completed with the following parameters: [{run.id=1}] and the following status: [COMPLETED] in 66ms
  ```

# [참고]

Spring Batch Getting Started - [https://spring.io/guides/gs/batch-processing/](https://spring.io/guides/gs/batch-processing/)

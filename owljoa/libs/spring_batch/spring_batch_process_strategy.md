# 스프링 배치 프로세스 전략

배치 시스템 설계 및 구현을 돕기 위해 기본적인 배치 어플리케이션 빌딩 블록과 패턴들이 샘플 구조와 코드 조각 형태로 설계자나 프로그래머들에게 제공되어야한다.

<br>

- [1. 배치 작업의 구성](#1-배치-작업의-구성)
  - [1.1. 표준 빌딩 블록 (구성 요소)](#11-표준-빌딩-블록-구성-요소)
  - [1.2. 그 외 구성 요소](#12-그-외-구성-요소)
    - [1.2.1. 기본 어플리케이션 쉘](#121-기본-어플리케이션-쉘)
    - [1.2.2. 유틸리티](#122-유틸리티)
- [2. 입력 소스에 따른 분류](#2-입력-소스에-따른-분류)
- [3. 배치 전략](#3-배치-전략)
  - [3.1. 전략 선택 요인](#31-전략-선택-요인)
  - [3.2. 배치 프로세싱 옵션](#32-배치-프로세싱-옵션)

<br><br>

# 1. 배치 작업의 구성

<br>

## 1.1. 표준 빌딩 블록 (구성 요소)

배치 작업을 설계할 때, 비즈니스 로직은 다음의 표준 빌딩 블록들을 사용해서 구현할 수 있도록 여러 스탭으로 분리되어야한다.

- 전환 어플리케이션
  - 외부 시스템에 의해 생성되거나 제공되는 여러 타입의 파일들에 대해, 제공된 트랜잭션 레코드들을 처리에 알맞은 형태로 전환하는 어플리케이션이 반드시 필요하다.
  - 보통 타입간의 변형을 제공하는 유틸리티 모듈로 구성된다.
- 검증 어플리케이션
  - 모든 입출력 레코드의 일관성과 정확성을 검증한다.
  - 보통 파일의 헤더와 트레일러, checksum, 유효성 검사 알고리즘, 레코드 수준의 크로스 체크에 기반하여 검증한다.
- 추출 어플리케이션
  - DB나 파일에서 레코드를 읽어(**read**)들이고, 미리 정해진 규칙에 따라 레코드를 선택(**select**)하고, 선택된 레코드를 파일 등의 형태로 출력(**write**)한다.
- 추출/갱신 어플리케이션
  - DB나 파일에서 레코드를 읽어들이고, 입력 레코드의 데이터를 바탕으로 DB나 출력파일을 변경한다.
  - (데이터를 읽어들이고 그 데이터를 기반으로 기존 데이터를 변경한다.)
- 프로세싱/갱신 어플리케이션
  - 추출 혹은 검증 어플리케이션으로부터 입력된 트랜잭션에서 데이터 프로세싱을 수행한다.
  - 프로세싱에는 보통 DB에서 데이터를 읽어들이는 과정과 DB를 갱신하고 출력 프로세싱을 위한 새 레코드를 생성하는 과정이 포함된다.
- 출력/포멧팅 어플리케이션
  - 입력된 파일을 읽어서 표준 포멧으로 데이터를 재구축하고, 출력하거나 다른 프로그램이나 시스템에 전송하기 위해 출력 파일을 제공한다.

<br>

## 1.2. 그 외 구성 요소

<br>

### 1.2.1. 기본 어플리케이션 쉘

표준 빌딩 블록들로 만들 수 없는 비즈니스 로직을 위한 기본 어플리케이션 쉘도 제공되어야 한다.

<br>

### 1.2.2. 유틸리티

주요 빌딩 블록들 외에 각 어플리케이션들은 표준 유틸리티를 사용할 수도 있다.

- Sort
  - 파일을 읽고 데이터를 재정렬해서 파일로 출력
  - 보통 표준 시스템 유틸리티로 수행된다.
- Split
  - 파일을 읽어서 필드 값을 기반으로 하나 혹은 몇개의 파일로 출력
  - 파라미터 기반의 표준 시스템 유틸리티로 수행될 수 있다.
- Merge
  - 여러 개의 파일을 읽어서 합쳐진 데이터를 하나의 파일로 출력
  - 파라미터 기반의 표준 시스템 유틸리티로 수행될 수 있다.

<br><br>

# 2. 입력 소스에 따른 분류

배치 어플리케이션 입력 소스에 따라 분류될 수 있다.

- Database-driven application
  - DB로부터 값이나 행을 전달받음
- File-driven application
  - 파일로부터 값이나 레코드를 전달받음
- Message-driven application
  - 메시지 큐로부터 메시지를 전달받음

<br><br>

# 3. 배치 전략

모든 배치 시스템의 기본은 전략이다.

<br>

## 3.1. 전략 선택 요인

전략 선택에 영향을 미치는 요인은 다음과 같다.

- 추정되는 배치 시스템 볼륨
- 온라인 시스템이나 다른 배치 시스템과의 동시성
- 이용 가능한 배치 윈도우 (더 많은 기업들이 24x7 실행되기를 원하면서 분명한 배치 윈도우는 사라지고 있다.)
  - 배치 윈도우는 배치를 할 수 있는 기간 혹은 시간으로, 시스템이 어떤 대화형 온라인 시스템으로부터 방해받지 않고 배치 작업을 실행할 수 있는 시간/기간 ([위키](https://en.wikipedia.org/wiki/Batch_processing#Batch_window))

<br>

## 3.2. 배치 프로세싱 옵션

전형적인 배치 프로세싱 옵션들을 다음과 같다. (구현 복잡도를 기준으로 오름차순)

- 오프라인 모드에서 배치 윈도우 시간 동안의 일반적인 프로세싱
- 동시 배치나 온라인 프로세싱
- 서로 다른 배치 실행이나 동시 작업의 병렬 프로세싱
- 파티셔닝(동일 시간 동일 작업에 대한 인스턴스들의 프로세싱)
- 위 옵션들의 조합

→ 이런 몇몇 혹은 전체 옵션은 상업적인 스케줄러에의해 지원된다.

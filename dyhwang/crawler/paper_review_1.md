# 고성능 웹크롤러의 설계 및 구현
## 초록
웹크롤러는 인터넷 검색엔진을 포함한 다양한 웹 응용프로그램에 활용되는 중요한 인터넷 소프트웨어 기술이다. 인터넷의 급격한 성장에 따라 고성능 웹크롤러의 구현이 시급히 요구되고 있다. 이를 위해서는 웹크롤러에 대한 성능확장성에 초점을 둔 연구가 수행되어야 한다. 본 논문에서는 병렬 프로세스 기반 웹크롤러(Crawler)의 성능향상에 필수적인 동적 스케줄링의 구현 기법을 제안한다. 웹크롤러는 웹문서의 수집 성능요구를 만족시키기 위하여 일반적으로 다중 프로세스 기반으로 설계되고 있다. 이러한 다중 프로세스 기반의 설계에서 프로세스 별로 문서수집 대상을 적정하게 선택하여 할당하는 크롤 스케줄링(Crawl Scheduling)은 시스템의 성능향상에 매우 중요한 요소이라. 본 논문에서는 먼저 크롤 스케줄링에 있어 중요한 문제점들에 대한 연구 결과를 제시한 후 공유메모리 기반 동적 스케줄링 지원 기법을 고안, 이를 구현하는 웹 크롤러 시스템 구조(Architecture)를 제안한다. 본 논문에서는 동적 스케줄링 지원 기능을 갖는 웹크롤러의 설계 및 구현에 대하여 기술한다.

## 리뷰
 - 수집속도 향상을 위해 대상 URL을 큐에 저장하고 각 프로세스가 큐에 접근하여 하나씩 패치 하는 분산 형식의 크롤러를 제안하였다.

- 논문은 크롤러 성능 판단 기준으로 수집속도의 최대화와 함께 상대 시스템 부하 최소화를 제시하였는데, 상대시스템 부하 최소화를 위해 동적 부하분산 알고리즘을 제안하였다.

- 동적부하분산 알고리즘은 대상 URL을 큐에서 패치하기 전 URL의 호스트가 스케쥴에 존재하는지 여부를 검사 후 존재하지 않는 경우 패치하여 크롤링을 수행하는 방식인데, 한정된 사이트를 대상으로 크롤링을 수행하는 금융 정보 크롤러같은 경우 호스트에 접속 중인 프로세스의 숫자를 제한하는 방식으로 응용 가능할 것으로 생각된다.
### Hash key 생성 알고리즘
```
url[strlen(url)*1/11]+(128-url[strlen(url)*1/11])+
url[strlen(url)*3/11]+(128-url[strlen(url)*4/11])+
url[strlen(url)*5/11]+(128-url[strlen(url)*6/11])+
url[strlen(url)*7/11]+(128-url[strlen(url)*8/11])+
url[strlen(url)*9/11]+(128-url[strlen(url)*10/11])
```
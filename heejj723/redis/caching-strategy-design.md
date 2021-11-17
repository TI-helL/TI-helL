# Cache & Data Store 배치 전략

### 1. Cache Aside 패턴
![img1 daumcdn](https://user-images.githubusercontent.com/45758481/142165631-47369f16-ffc6-4f6b-8b11-00da6ca5a8c1.png)

**특징**
- 읽기에 적합함
- 반복적 호출에 적합함
- 데이터 정합성 문제가 발생
- 초기 호출 시 Cache miss 율이 매우 높음

### 2. Write Back 패턴
![img1 daumcdn-1](https://user-images.githubusercontent.com/45758481/142165681-bd54da6f-aa06-40f0-8d3f-0e4023128d91.png)

**특징**
- 먼저 캐시스토어에 저장 후 나중에 DB 에 Write 를 하는 방식
- DB 의 일시적인 장애를 허용함
- 정합성이 확보 됨
- 캐시 장애시 데이터가 유실됨
- 불필요한 리소스 저장

### 3. Read Through
![img1 daumcdn-2](https://user-images.githubusercontent.com/45758481/142165763-5b010a5c-adef-40cd-a54b-ef4a2c0d193b.png)

- 데이터를 캐시에 저장하는 주체가 서버가 아닌 데이터베이스임
- 초기 캐시 미스율을 줄이기 위해서 캐시 대상에 대해 쿼리를 캐시, 디비에 동시에 해주는 것도 방법

### 4. Write Through
![img1 daumcdn-3](https://user-images.githubusercontent.com/45758481/142165746-3ac36143-e2cb-4c66-bee7-61d9cbeb9338.png)
- Write Back 과 저장하는 방식은 동일하지만, 캐시스토어를 통해 데이터스토어에 저장한다.
- 항상 동기화가 되어있다. 
- 캐시에 저장 안해도 되는 데이터도 저장되어 리소스 낭비가 심하다.
- TTL 활용이 필수 

# 생존형 Docker 학습

## Dockerfile

docker 실행을 위한 환경 및 실행 순서 등을 작성하는 파일

### Sample 1

```Dockerfile
# nginx 이미지를 사용. 뒤에 tag가 따로 없으면 latest를 사용함
FROM nginx:1.19.10-alpine

# mkdir 명령어 실행
RUN mkdir /app

# 작업 디렉토리 설정
WORKDIR /app

# 호스트의 파일 추가
ADD ./dist/b2c-angular /usr/share/nginx/html

```

### Sample 2

```Dockerfile
# alpine은 보통 최소한의 기능만 가진 이미지 파일이라 생각하면 좋음
# AS 뒤의 네이밍은 이미지에 alias를 붙여준다 생각하면 좋음 
FROM node:16.7-alpine AS builder

RUN mkdir /app

WORKDIR /app

# 현재 디렉토리의 내용을 복사
COPY . /app/

# node 기반의 project인 경우 npm install
RUN npm install
RUN npm run build

---
FROM node:16.7-alpine

WORKDIR /app

# 위에 선언한 alias 이미지를 기준으로 데이터를 복사한다
COPY --from=builder /app ./

# 명령어 실행
CMD ["npm", "run", "start:prod"]
```

## docker-compose.yml

Docker 기반 이미지들을 묶고 Docker 기반 환경 세팅을 용이하게 해주는 설정 파일? 정도로 생각하면 좋을 것 같다.

```yml
# docker-compose 버전에 따라 호환되는 부분이 다르다. 보통 3을 많이 사용
# 소수점까지 붙이면 타겟 버전 특화이고, 그렇지 않으면 latest
version: "3"

# Docker 에서 사용될 이미지들을 Services 아래에 정의한다 
services:
  frontend: # Image Name은 제멋대로 ㅎ
    build: b2c-angular  # Docker Build 에 대한 처리
    ports:  # docker run -p와 동일하게 inbound / outbound의 처리를 담당한다
      - "80:80"
    volumes: # host와 docker의 Volume을 정의한다. 
      - ./b2c-angular/dist/b2c-angular:/usr/share/nginx/html

  backend:
    build: b2c-server
    ports:
      - "3000:3000"
```


이정도만 알고있으면 최소한의 작업은 할 수 있더라.

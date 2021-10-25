# 생존형 Docker 학습 2

Nx로 작성된 Monorepo 에서 프로젝트 Dockerize 하는 방법

## 1. 전체 프로젝트 빌드 이미지 Dockerfile

Monorepo가 빌드 되기 위해서는 전체 Project가 필요함.  
왜냐하면 모든 종속성이 한 프로젝트 디렉토리내에 있으므로  
어떤 application을 빌드 하더라도 전체 Project가 필요해지는 것!

때문에 전체 프로젝트의 Docker 이미지를 우선 만들어 dependency를 설치 해두는게 중요하다

그리고 그걸 바탕으로 이미지를 만들어야 한다

```Dockerfile
FROM node:16-alpine as Builder

# Production / Dev 구분을 위함
ARG NODE_ENV   
# 혹시 모를 추가 빌드 플래그를 위해
ARG BUILD_FLAG 

# 작업 Directory를 세팅한다
WORKDIR /app/builder  

# 모든 프로젝트 내용을 작업 디렉토리로 전달
COPY . .

# 종속성 실행
RUN npm i

```

모든 프로젝트 내용을 작업 디렉토리로 전달하다보니 불필요한 항목들도 전달 가능성이 있음

때문에 .dockerignore 파일을 만들어 불필요한 파일들은 전달하지 않도록 한다.  
이건 상황에 따라 다르게 작성하면 된다

```.dockerignore
node_modules
dist
.vscode
.husky
.storybook
```

## 2. 개별 어플리케이션 Dockerfile 작성 

위의 이미지를 바탕으로 각 어플리케이션을 추가 빌드 해주자

### Frontend

Dockerfile은 빌드가 필요한 어플리케이션 루트에 작성해준다

```Dockerfile
# IMAGE_FILE_NAME은 추후 docker-compose에 작성된 이미지 명을 사용한다
FROM IMAGE_FILE_NAME AS builder

ARG NODE_ENV
ARG BUILD_FLAG

# 작업 디렉토리를 전체 디렉토리와 동일하게 작성 한다
WORKDIR /app/builder
# 현 프로젝트 
COPY . .

# 빌드 플래그 넣어서 빌드
RUN npx nx build vep ${BUILD_FLAG}

# 웹 서빙을 위한 nginx 세팅
FROM nginx:1.21.3

# nginx working directory
WORKDIR /usr/share/nginx/html

# nginx에 세팅 전달
COPY --from=builder /app/builder/dist/apps/vep ./
COPY --from=builder /app/builder/apps/vep/nginx.conf /etc/nginx/nginx.conf
```

nginx.conf 파일 역시 프론트엔드 루트 디렉토리에 미리 작성한다.

```
user root;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;

events {
  worker_connections 1024;
}

http {
  # Configuration specific to HTTP and affecting all virtual servers

  log_format  main    '$remote_addr - $remote_user [$time_local] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';

  access_log  /var/log/nginx/access.log  main;
  sendfile            on;
  tcp_nopush          on;
  tcp_nodelay         on;
  keepalive_timeout   65;
  types_hash_max_size 2048;
  include             /etc/nginx/mime.types;
  default_type        application/octet-stream;

  server {
    listen      80      default_server;
    gzip on;
    gzip_disable "MSIE [1-6]\.(?!.*SV1)";
    gzip_proxied any;
    gzip_buffers 16 8k;
    gzip_types   in application/javascript application/x-javascript text/javascript text/xml text/css;
    gzip_vary on;
    access_log /var/log/nginx/app.access.log;
    error_log /var/log/nginx/app.error.log;
    root /usr/share/nginx/html;

    location / {
      try_files $uri /index.html;
    }

    # configuration of HTTP virtual server 1
    # frontend에서 프록시 처리를 위한
#     location /api {
    location /demo {
      # configuration for processing URIs starting with '/api'
#       proxy_pass http://api-server:8987/api;
      proxy_pass http://localhost:3000/demo;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-NginX-Proxy true;
      proxy_ssl_session_reuse off;
      proxy_set_header Host $http_host;
      proxy_redirect off;
    }
  }
}

```

### Backend

서버쪽 Dockerfile은 서버 호출 환경에 따라 달라진다.  
여기서 작성한 서버는 Nestjs 기반으로 작성한 서버 이므로 node 기반에서 작동한다.  
Dockerfile도 이를 기반으로 작성했다

```Dockerfile
# IMAGE_FILE_NAME은 추후 docker-compose에 작성된 이미지 명을 사용한다
FROM IMAGE_FILE_NAME AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder

COPY . .

# 서버 빌드를 미리 해둔다.
RUN npx nx build demo-server ${BUILD_FLAG}

# 서버를 실행시킬 node 이미지를 사용하고
FROM node:16-alpine

WORKDIR /app
COPY --from=builder /app/builder ./
ENV NODE_ENV=$NODE_ENV

# 단순히 node로 서버 빌드 결과물을 실행시켜준다
CMD ["node", "./dist/apps/demo-server/main.js"]
```

### Docker Compose

위의 모든 Dockerfile을 하나의 Container에 묶어 사용하기 위해 docker-compose.yml 파일을 작성한다.  
다만 Monorepo 프로젝트상 어떤 컨테이너에 어떻게 띄워야 할 지 모르므로 docker-compose시 yml을 선택할 수 있도록 처리 해준다.

나는 vep 프로젝트를 기준으로 `docker-compose.vep.yml` 파일로 작성했다

```Dockerfile
version: "3.8"

# 컨테이너간 통신을 bridge 모드로 작성
# corp는 네트워크 네임으로 아무렇게나 설정 가능하고 밑에서는 해당 이름으로 사용하면 된다.
networks:
  corp:
    driver: bridge

services:
  # Frontend / Backend 에서 사용할 전체 프로젝트 이미지
  # 이때 사용하는 이미지 네임을 각 Frontend / Backend Dockerfile에서 사용하게 된다
  Nx-project:
    build: .
    image: nx-fairi-front:dev

  # Backend Service
  demo-server:
    container_name: VEP-demo-server
    # Nx 전체 프로젝트가 필요하므로 의존성에 Nx-project (전체 이미지) 를 추가한다
    depends_on:
      - Nx-project
    build:
      context: ./
      cache_from:
        - nx-fairi-front:dev
        # 빌드시 사용될 Dockerfile
      dockerfile: ./apps/demo-server/Dockerfile
      # 빌드에서 사용되는 Argument는 알아서 ~
      args:
        NODE_ENV: "development"
        BUILD_FLAG: ""
    image: demo-server:nx-dev
    ports:
      - 3333:3333
    environment:
      NODE_ENV: "development"
      PORT: 3333
    networks:
      - corp
    restart: on-failure

  vep:
    container_name: VEP-frontend
    depends_on:
      - Nx-project
    build:
      context: ./
      cache_from:
        - nx-fairi-front:dev
      dockerfile: ./apps/vep/Dockerfile
      args:
        NODE_ENV: "production"
        BUILD_FLAG: ""
    image: vep-client:demo
    ports:
      - 4200:80
    environment:
      NODE_ENV: "development"
      PORT: 4200
    networks:
      - corp
    restart: on-failure
```

## 3. 빌드 & 배포

위의 작업이 모두 끝났으면 이제 docker-compose를 이용해서 실제 Container를 띄워주면 된다.

위의 docker-compose 파일의 이름을 `docker-compose.vep.yml`로 작성했으므로 아래와 같은 명령어로 실행한다.

`docker-compose -f docker-compose.vep.yml -d up`

이후 `localhost:3333` 으로 서버접속과 `localhost:4200` 으로 클라이언트 접속을 할 수 있다.



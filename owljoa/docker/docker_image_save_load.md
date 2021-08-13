# 도커 이미지 <-> 파일 변환

- 원격 이미지 저장소를 사용할 수 없는 환경에서 필요..

<br>

## 1. 도커 이미지 -> 파일

- `docker save [--output, -o] IMAGE [IMAGE...]`

  - 하나 이상의 이미지(들)을 tar 형태로 아카이브하여 저장
  - default로는 STDOUT으로 출력됨
  - output 옵션: STDOUT이 아닌 파일로 출력 (--out, -o)

  ```bash
  # zookeeper 이미지를 로컬에 가지고 있다고 가정
  $ docker images
  REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
  zookeeper     latest    7a2d3eefab5a   3 weeks ago    270MB

  # 기본 명령어
  $ docker save zookeeper:latest > zookeeper_image.tar

  # output 옵션 사용
  $ docker save --output zookeeper.tar zookeeper:latest
  ```

<br>

## 2. 파일 -> 도커 이미지

- `docker load [OPTIONS]`
- tar 형태나 STDIN으로 들어오는 이미지를 로컬 이미지 저장소에 적재
- OPTIONS
  - --input, -i: STDIN이 아닌 tar 형태의 파일을 입력으로 받음
  - --quiet, -q: 명령의 결과를 출력하지 않음

```bash
# 로컬 이미지 저장소에 zookeeper 이미지가 없는 상태
$ docker images
REPOSITORY         TAG            IMAGE ID       CREATED        SIZE
mariadb/server     10.4           f8649b9b05af   6 months ago   357MB
kindest/node       <none>         094599011731   6 months ago   1.17GB
openjdk            8-jre-alpine   f7a292bbb70c   2 years ago    84.9MB
goodguide/zk-web   latest         a272b970cd23   6 years ago    994MB

# STDIN을 이용한 이미지 적재
$ docker load < zookeeper.tar
764055ebc9a7: Loading layer [==================================================>]  72.53MB/72.53MB
aa7d6f60014a: Loading layer [==================================================>]  9.141MB/9.141MB
2fd6f7b9077a: Loading layer [==================================================>]  3.584kB/3.584kB
72bb3b86d69b: Loading layer [==================================================>]  142.8MB/142.8MB
15d7bad226f4: Loading layer [==================================================>]  342.5kB/342.5kB
b3c7eef0de1e: Loading layer [==================================================>]  12.51MB/12.51MB
8017b29ce3e2: Loading layer [==================================================>]  37.65MB/37.65MB
5294eaff8399: Loading layer [==================================================>]  3.072kB/3.072kB
Loaded image: zookeeper:latest

# --input 옵션을 이용한 이미지 적재
docker load --input zookeeper.tar
764055ebc9a7: Loading layer [==================================================>]  72.53MB/72.53MB
aa7d6f60014a: Loading layer [==================================================>]  9.141MB/9.141MB
2fd6f7b9077a: Loading layer [==================================================>]  3.584kB/3.584kB
72bb3b86d69b: Loading layer [==================================================>]  142.8MB/142.8MB
15d7bad226f4: Loading layer [==================================================>]  342.5kB/342.5kB
b3c7eef0de1e: Loading layer [==================================================>]  12.51MB/12.51MB
8017b29ce3e2: Loading layer [==================================================>]  37.65MB/37.65MB
5294eaff8399: Loading layer [==================================================>]  3.072kB/3.072kB
Loaded image: zookeeper:latest

```

## 참고

- [docker save](https://docs.docker.com/engine/reference/commandline/save/)
- [docker load](https://docs.docker.com/engine/reference/commandline/load/)

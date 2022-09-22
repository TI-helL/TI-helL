# Dockerfile 만들기

Dockerfile은 Docker 이미지(image)가 어떤 단계를 거쳐 빌드(build)되야 하는지를 담고있는 텍스트 파일입니다. Docker는 Dockerfile에 나열된 명령문을 차례대로 수행하여 이미지를 생성해줍니다.

```docker
# base 이미지 설정
FROM <이미지>
FROM <이미지>:<태그>


#WORKDIR 명령문으로 작업 디렉터리를 전환하면 그 이후에 등장하는 모든 RUN, CMD, ENTRYPOINT, COPY, ADD 명령문은 해당 디렉터리를 기준으로 실행됩니다.
WORKDIR <이동할 경로>

#RUN 명령문은 마치 쉘(shell)에서 커맨드를 실행하는 것 처럼 이미지 빌드 과정에서 필요한 커맨드를 실행하기 위해서 사용됩니다. 쉘(shell)을 통해 거의 못하는 작업이 없는 것 처럼 RUN 명령문으로 할 수 있는 작업은 무궁무진하지만 보통 이미지 안에 특정 소트트웨어를 설치하기 위해서 많이 사용됩니다.
RUN <전체 커맨드>


#ENTRYPOINT 명령문은 이미지를 컨테이너로 띄울 때 항상 실행되야 하는 커맨드를 지정할 때 사용합니다. ENTRYPOINT 명령문은 Docker 이미지를 마치 하나의 실행 파일처럼 사용할 때 유용합니다. 왜냐하면 컨테이너가 뜰 때 ENTRYPOINT 명령문으로 지정된 커맨드가 실행되고, 이 커맨드로 실행된 프로세스가 죽을 때, 컨테이너로 따라서 종료되기 때문입니다.
ENTRYPOINT <전체 커맨드>

#EXPOSE 명령문은 네트워크 상에서 컨테이너로 들어오는 트래픽(traffic)을 리스닝(listening)하는 포트와 프로토콜를 지정하기 위해서 사용됩니다. 프로토콜은 TCP와 UDP 중 선택할 수 있는데 지정하지 않으면 TCP가 기본값으로 사용됩니다.
EXPOSE <포트>

#COPY 명령문은 호스트 컴퓨터에 있는 디렉터리나 파일을 Docker 이미지의 파일 시스템으로 복사하기 위해서 사용됩니다. 절대 경로와 상대 경로를 모두 지원하며, 상대 경로를 사용할 때는 이 전에 등장하는 WORKDIR 명령문으로 작업 디렉터리를 어디로 전환을 해놨는지 고려해야 합니다.
COPY <src>... <dest>
```



내가 작성한 Dockerfile (FastAPI)

```docker
1. FROM python as build
#python을 베이스 이미지로 하고 bulid라는 이름을 붙임

2. WORKDIR /install
#작업 디렉토리를 install로 한다

3. COPY ./requirements.txt /requirements.txt
#requirements.txt파일 복사

4. RUN pip install --prefix=/install -r /requirements.txt
#--prefix /install 디렉토리에다가 /requirements.txt 설치할거임

5. FROM python:slim
#파이썬이 용량이 크기 때문에 최소의 필요한 것 만 다운 받는다. 
 
6. WORKDIR /app
#작업디렉토리를 app으로 할꺼

7. COPY --from=build /install /usr/local
#bulid라는 도커 이미지에 있는 install 디렉토리를 local로 복사
 
8. COPY ./*.py ./
#.py 가 들어간 파이썬 전체 파일을 작업디렉토리에 복사

9. COPY ./routers ./routers
#./rotuers디렉토리를 routers디렉토리로 복사

10. EXPOSE 8000
#컨네이너가 리스닝할 포트설정 번호는 8000, 이 도커 이미지는 8000번 포트를 외부에 공개함 
#docker-cmopse.yml 파일을 만들어 컨테이너로 관리하는 경우 이 문장은 필요없으나 효율적인 포트 관리를 위해 명시해주는게 좋다. 누가 이 파일을 봤을때 포트번호를 알수있게 하자

11. ENTRYPOINT ["python", "main.py"]
#커맨드에 python main.py입력되어 fastapi가 실행됨
```

### Dockerfile의 명령어 정리

명령어 : 용도

FROM : base 이미지 설정

RUN	: 이미지 빌드 시 커맨드 실행

ENTRYPOINT :	이미지 실행 시 항상 실행되야 하는 커맨드 설정

CMD	: 이미지 실행 시 디폴트 커맨드 또는 파라미터 설정

EXPOSE	: 컨테이너가 리스닝할 포트 및 프로토콜 설정

COPY/ADD : 이미지의 파일 시스템으로 파일 또는 디렉터리 복사

ENV	: 환경 변수 설정

ARG	: 빌드 시 넘어올 수 있는 인자 설정

++docker-compse.yml은 다음주에 작성하자
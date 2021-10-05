# jupyter-spark 도커이미지 실행
```bash
docker run -p 38888:8888 -e JUPYTER_ENABLE_LAB=yes -v /home/dyhwang/jupyter:/home/jupyter --name dyhwang-jupyter jupyter/pyspark-notebook
```

- d	detached mode 흔히 말하는 백그라운드 모드
- p	호스트와 컨테이너의 포트를 연결 (포워딩)
- v	호스트와 컨테이너의 디렉토리를 연결 (마운트)
- e	컨테이너 내에서 사용할 환경변수 설정
– name	컨테이너 이름 설정
– rm	프로세스 종료시 컨테이너 자동 제거
- it	-i와 -t를 동시에 사용한 것으로 터미널 입력을 위한 옵션
– link	컨테이너 연결 [컨테이너명:별칭]

# Jovyan root 문제 해결
jovyan에서 제공하는 jupyter 도커 이미지에서는 모종의 이유로 루트권한 비밀번호를 제공하지 않는다 한다.<br>
그래서 GRANT_SUDO를 활성화 하여 root계정에서 sudo를 무한으로 즐길 수 있다.
```bash
GRANT_SUDO="yes" --user root
```
exec할때는 아래와 같이 계정을 명시해준다
```bash
docker -it -u root {docker_id} bash
```
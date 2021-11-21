# Docker Attach

`docker attach`는 실행되고 있는 컨테이너에 접속할 때 사용한다.

```bash
docker attach {conatiner-id}
```

웹서버같이 백그라운드에서 실행되는 container에 attach로 접속하면 커맨드는 입력할 수 없고 로그만 볼 수 있다.

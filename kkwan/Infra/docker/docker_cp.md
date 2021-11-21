# Docker File Copy

`docker cp`는 컨테이너에서 호스트(혹은 호스트에서 컨테이너)로 원하는 파일을 전송할 수 있는 명령어이다. 사용법은 다음과 같다.

```bash
# host -> conatiner
docker cp /path/file {container-name}:/path/file

# container -> host
docker cp {container-name}:/path/file /path/file
```

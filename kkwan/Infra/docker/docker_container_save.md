# Docker Container Save

## Docker Container -> .tar

```sh
# 현재 동작 중인 컨테이너를 .tar로 저장
docker export [container_name or container_id] > [filename]

# example
docker export backup > backup.tar
```

## .tar -> Docker Container Image

```sh
# 위에서 만든 .tar를 컨테이너 이미지로 저장
docker import [option] [filename] [imagename:tag]

# example
docker import backup.tar bakup:latest
```

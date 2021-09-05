# 컨테이너 기반 데이터베이스 백업

## 백업하는 방법

```sh
#!/bin/sh

backupPath='[백업 위치]'

if [ ! -d $backupPath/$(date +%Y%m)/$(date +%d) ]
then
mkdir -p $backupPath/$(date +%Y%m)/$(date +%d)
fi

sudo docker exec [컨테이너명] /usr/bin/mysqldump \
-u [유저명] --password=[유저 비밀번호] \
[데이터베이스명] > $backupPath//$(date +%Y%m)/$(date +%d)/ \
[데이터베이스명]_$(date +%Y%m%d)_$(date +%H%M%S).sql
```

## 복구하는 방법

```sh
#!/bin/sh

# 백업 파일 이름
bk_file=$1
# 컨테이너 이름
container_name=$2

echo '.sql file path to insert : ' $1
echo 'Target container name or id : ' $2

cat $bk_file | docker exec -i $container_name /usr/bin/mysql -u [유저명] --password=[유저 비밀번호]] [데이터베이스명]

```

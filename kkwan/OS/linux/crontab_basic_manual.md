# crontab 기본 메뉴얼

## How to install

```sh
# ubuntu
apt-get install cron
```

## How to use

### crontab options

```sh
# crontab 설정을 위한 editor
crontab -e

# 현재 crontab 등록 현황
crontab -l

# crontab 삭제
crontab -r
```

### crontab setting

`crontab -e`를 통해 editor를 실행 후 주기를 정의한다.

```sh
# crontab editor
* * * * * [command]
```

주기는 다음과 같이 정의할 수 있으며, 아무 값도 입력하지 않고 `* * * * *`로 구성하게 되면 매분마다 해당되는 명령어를 실행한다.

|   `*`    |    `*`     |     `*`      |      `*`       |    `*`    |
| :------: | :--------: | :----------: | :------------: | :-------: |
| 분(0~59) | 시간(0~23) | 일(1~31)　　 | 월(1~12)　　　 | 요일(0~7) |

## 🍯 TIP

### crontab logging

crontab을 통해 실행된 명령어의 실행 결과를 로깅하는 방법은 다음과 같다.

```sh
* * * * * [command] > / [logging_path]/[log_file_name] 2>&1
```

### crontab setting backup

`crontab -r` 혹은 crontab 디렉토리 삭제로 정의한 crontab 설정들이 지워졌을 때 방지하기 위해 다음과 같이 백업을 수행한다.

```sh
* * * * * crontab -l > [backup_path]/[filename]
```

## Reference

- [**JDM's Blog**](https://jdm.kr/blog/2) : 리눅스 크론탭(Linux Crontab) 사용법

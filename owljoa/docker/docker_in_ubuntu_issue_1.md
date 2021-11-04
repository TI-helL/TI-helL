# 도커가 갑자기 꺼짐,, 우분투 apt 자동 업그레이드가 원인..

어느 날 테스트용 DB 컨테이너에 접속되지 않는다는 연락을 받았고, 확인해보니 테스트용 컨테이너들이 다운됐고 재시작 옵션이 포함되지 않은 컨테이너는 다시 시작되지 않고있었다. 시스템 로그를 확인해보니 도커 서비스가 재시작된 흔적이 있었다. 더 자세히 보니 아래처럼 "Daily apt upgrade" 라는 문구가 포함된 로그가 보였다.

```bash
sudo cat /var/log/syslog
...

Nov  4 06:06:09 user-X299-WU8 systemd[1]: Starting Daily apt upgrade and clean activities...

...

Nov  4 06:06:15 user-X299-WU8 systemd[1]: Started Daily apt upgrade and clean activities.

...
```

<br>

패키지를 매일 업그레이드 하나,, 검색해서 찾아보니 역시나,, 도커 관련 패키지를 업그레이드하면서 도커 서비스를 재시작 시킨 것으로 보인다.

타이머 서비스들의 리스트를 출력해보니 apt-daily-upgrade.timer라는 유닛이 오전 6시 6분 9초에 실행된 흔적이 있다.

```bash
sudo systemctl list-timers

# 위 명령 결과
NEXT                         LEFT          LAST                         PASSED       UNIT                         ACTIVATES
...

Fri 2021-11-05 06:14:23 KST  12h left      Thu 2021-11-04 06:06:09 KST  11h ago      apt-daily-upgrade.timer      apt-daily-

...
```

<br>

해결방법은 간단하다.

매일 apt 패키지를 업그레이드하는 서비스를 비활성화 하면 된다.

```bash
sudo systemctl stop apt-daily-upgrade.timer
sudo systemctl disable apt-daily-upgrade.timer
sudo systemctl daemon-reload
```

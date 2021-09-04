# 로그인 이력 확인 방법 (ubuntu 기준)

<br>

## last 명령

<br>

### 성공한 로그인 기록 조회

- `last`
- lastb가 조회하는 파일: /var/log/wtmp

- pts/0: ssh 통한 접근
  - root와 utmp 유저그룹이 소유
  - root나 utmp 그룹에 속해있지 않아도 읽기 권한이 있음

```bash
needshield@mycomputer:~$ last
needshie   pts/0        192.168.0.12     Wed Sep  1 11:28   still logged in
owljoa     pts/0        192.168.0.12     Wed Sep  1 11:22 - 11:28  (00:05)
needshie   pts/0        192.168.0.12     Wed Sep  1 10:22 - 11:22  (01:00)

wtmp begins Wed Sep  1 10:22:04 2021

```

<br>

### 특정 사용자의 로그인 기록

- `last [유저명] `
- w 옵션: 유저명 전체를 출력

```bash
needshield@mycomputer:~$ last -w needshield
needshield   pts/0        192.168.0.12     Wed Sep  1 11:28   still logged in
needshield   pts/0        192.168.0.12     Wed Sep  1 10:22 - 11:22  (01:00)

wtmp begins Wed Sep  1 10:22:04 2021

```

<br>

### 최근 N개의 로그인 기록 조회

- `last -N`

```bash
needshield@mycomputer:~$ last -2
needshie   pts/0        192.168.0.12     Wed Sep  1 11:28   still logged in
owljoa     pts/0        192.168.0.12     Wed Sep  1 11:22 - 11:28  (00:05)

wtmp begins Wed Sep  1 10:22:04 2021

```

<br>

### 비정상 로그인 시도 조회

- `lastb`
- lastb가 조회하는 파일: /var/log/btmp

  - root와 utmp 유저그룹이 소유
  - root나 utmp 그룹에 속해있지 않으면 접근 권한이 없음 (예제에서는 sudo 명령 이용)

  ```bash
  # same with "sudo last -f /var/log/btmp"
  needshield@mycomputer:~$ sudo lastb
  user01   ssh:notty    192.168.0.12     Sat Sep  4 09:46 - 09:46  (00:00)
  needshie ssh:notty    192.168.0.13     Sat Sep  4 08:40 - 08:40  (00:00)
  needshie ssh:notty    192.168.0.13     Sat Sep  4 08:40 - 08:40  (00:00)
  needshie ssh:notty    192.168.0.13     Sat Sep  4 08:40 - 08:40  (00:00)
  needshie ssh:notty    192.168.0.13     Sat Sep  4 08:40 - 08:40  (00:00)
  needshie ssh:notty    192.168.0.13     Sat Sep  4 08:36 - 08:36  (00:00)
  needshie ssh:notty    192.168.0.13     Sat Sep  4 08:36 - 08:36  (00:00)
  needshie ssh:notty    192.168.0.13     Sat Sep  4 08:36 - 08:36  (00:00)
  needshie ssh:notty    192.168.0.13     Sat Sep  4 08:36 - 08:36  (00:00)
  user01   ssh:notty    192.168.0.12     Sat Sep  4 08:17 - 08:17  (00:00)

  btmp begins Wed Sep  1 10:21:59 2021

  ```

# tty vs pts

- 시스템에 직접 연결해서 입력하거나 원격으로 연결해서 입력하거나의 차이..로 느껴짐

<br>

## Console

- 서버의 로컬 장치에서 직접 명령어를 작성할 수 있는 입출력 장치
- 전기 신호로 전송된 데이터를 문자열로 바꾸어 출력해주는 물리적 장치
- 시스템에 직접 연결하는 터미널

<br>

## Terminal

- 서버의 로컬 또는 원격으로 접속할 수 있는 콘솔을 구현한 소프트웨어

<br>

## tty

- TeleTYpewriter(전신 타자기)에서 유래한 이름이지만, 리눅스/유닉스 시스템의 터미널을 의미하기도 하고 리눅스/유닉스 시스템의 모든 시리얼 포트를 의미하기도 함
- 보통의 터미널 장치 (ex. 서버의 콘솔)
- 레드햇 리눅스에서는 systemd에 의해 관리됨
- 시스템에 접근 즉시 생성됨
- /etc/systemd/logind.conf 파일에서 콘솔 최대 허용 갯수를 지정 (default로 6개)
- tty 명령으로 현재 사용중인 터미널 확인 가능
  ```bash
  # 로컬 머신을 직접 사용중인 경우
  user@mycomputer:~$ tty
  /dev/tty1
  ```

<br>

## pts

- Pseudo TTY Slave
- pty의 슬레이브 부분
- pty: 다른 프로그램으로 만들어낸 터미널 장치
  - 다른 프로그램: xterm, screen, ssh 등
- 원격으로 연결하는 터미널
- pts/0, pts/1 등으로 숫자를 붙여 나타냄
  ```bash
  # 원격 접속한 경우
  user@mycomputer:~$ tty
  /dev/pts/2
  ```

# 원격 쉘 명령 방법 (우분투 18.04 기준)

- `ssh [username]@[hostname|ip_address] 'command'`
- 하나의 쉘 명령만 실행하고 세션을 종료해야하는 경우 사용
- example

  ```bash
  ssh user01@server01 'pwd'
  /home/user01

  ssh user01@192.168.0.23 'date'
  2021. 09. 07. (화) 10:31:21 KST
  ```

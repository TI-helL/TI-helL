# 한번쯤 볼 Shell 명령어

> ls [-a -A -l -h]

현재 위치 파일 / 디렉토리 조회

> cat, less, more

파일 내용 확인 용도

> touch [filename]

파일이 없으면 신규 생성<br>
파일이 있으면 수정일자 갱신

> which

명령어 위치 확인

> alias

명령어에 별칭짓기

```shell
alias ls='ls -G'
```

> dpcopy

명령어의 결과를 클립보드에 복사 (MAC 전용)
```shell
$ echo $PATH | pbcopy
```

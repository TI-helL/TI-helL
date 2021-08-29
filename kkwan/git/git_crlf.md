# CRLF error

CRLF는 줄바꿈(newline)을 입력하는 문자를 칭하는 표현이다.
이는 line break, EOL(end-of-line)으로 표현되기도 한다.
CRLF는 운영체제, 디바이스 종류마다 다를 수 있기 때문에, 이기종 시스템 간의 text-based transfer를 할 때 변환이 필요할 수 있다.

CRLF는 CR과 LF가 합쳐진 것으로 각각 다음과 같은 의미를 가진다.

- CR(Carriage Reture): 현재 라인에서 커서의 위치를 가장 앞으로 옮기는 동작을 의미함
- LF(Line Feed): 커서의 위치는 그대로 두고 종이를 한 라인 위로 올리는 동작을 의미함

## issue

MacOS와 같은 Unix 계열 시스템에서는 한 줄의 끝이 LF로 처리되고, Windows 계열 시스템에서는 한 줄의 끝이 CRLF로 이루어져있다.

이로인해 Unix 계열 시스템을 사용하고 있다면 `CRLF will be replaced by LF in ...` error 메시지가 출력되고, Windows 계열 시스템을 사용하고 있다면 `LF will be replaced by CRLF in ...` error 메시지가 출력된다.

## solution

다음 명령어로 해당 error에 대해 경고 메시지를 주는 `core.autocrlf`를 끈다.

```sh
git config --global core.autocrlf false
```

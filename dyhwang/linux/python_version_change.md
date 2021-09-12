# python 버전 바꾸기
우분투에서 파이썬 버전이 여러개 깔린경우, 특히 2버전이 먼저 깔려 default가 2로 설정된 경우에
Alternatives를 이용해 버젼을 바꾸어 주어야 한다.
## Alternatives
기본 커맨드의 심볼릭 링크를 관리해주는 리눅스 프로그램이다.
데비안 계열의 리눅스에서는 update-alternatives가 제고된다
## 파이썬 실행 위치
아래 명령어로 현재 run 중인 파이썬이 어디 깔렸는지 볼 수 있다.
해당 위치는 실제 위치가 아니라 심볼링 링크이다.
```bash
which python
```
심볼릭 링크가 실제로 어디를 참조하는지 아래 명령어를 통해 알아 볼 수 있다.
```bash
ls -al /usr/bin/python
```
그리고 다음으로 현재 설치된 파이썬의 다양한 버전을 볼 수 있다.
```bash
ls /usr/bin | grep python
```
## update-alternatives로 파이썬 버전 등록 및 변경
먼저 이미 등록된 버전이 있는지 확인해보자
<br>
```bash
update-alternatives --config python
```
<br>
update-alternatives: error: no alternatives for python 같은 메시지가 출력되면 alternatives에 등록된 버전이 없다는 뜻이다.<br>
다음으로 update-alternatives --install [symbolic link path] python [real path] number 명령어를 사용하여 실행파일을 등록해보자.
<br>

```bash
update-alternatives --install /usr/bin/python python /usr/bin/python2.7 2
update-alternatives --install /usr/bin/python python /usr/bin/python3.6 1
```

<br>
뒤에 1, 2는 우선순위를 나타낸다.<br>
그리고 다시 config를 확인하면 등록된 파이썬 버전이 출력된다.<br>
이어 등록한 버전을 선택하는 메뉴가 나오는데 위에서 함께 입력해준 순서에 해당하는 번호를 입력하여 버전을 선택해주면 설정이 끝이난다.<br>
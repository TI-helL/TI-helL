# .bash_aliases 만들기 

도커의 긴명령어를 터미널에 타이핑하기 귀찮으니 별칭을 정해서 명렁어를 줄여 써보자

root디렉토리에 파일을 만들어줌

```bash
nano .bash_aliases
```

### .bash_aliases에 원하는 별칭을 설정해보자 

예시 

docker-compose up -d → dcu

dcu만 커맨드에 입력해주면 자동으로 docker-compose up -d 실행됨 

```bash
alias dcu='docker-compose up -d'
alias dcd='docker-compose down'
alias dp='docker ps'
alias di='docker images'
```

```bash
터미널에 ll을 입력해서 파일이 만들어졌는지 확인
ll
```

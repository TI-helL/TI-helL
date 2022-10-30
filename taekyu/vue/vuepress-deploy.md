# Vuepress Github action으로 자동 배포하기

VuePress로 웹사이트를 만들었다. 이제 배포해보자

## Step 1: Github Pages 만들기

나는 deploy.sh 파일을 만들어서 배포했다.
[deploy.sh](https://github.com/ptq124/TIL/blob/main/docs/deploy.sh) 참고

1.deploy.sh를 루트에 생성한후 docs디렉토리로 이동하자

```bash
cd docs
```

2.그다음 아래 명령어를 입력해주면 끝

```bash
sh deploy.sh
```

## Step 2: Github action으로 자동화 하기

사이트를 업데이트 할때마다 매번 배포를 해줘야하기 때문에 귀찮다... 자동화를 시켜보자

1.workflow폴더 생성

루트에 `.github/workflows/main.yml` 파일을 만든다.

아래주소를 참고하여 만들었다.

https://github.com/marketplace/actions/vuepress-deploy

[main.yml](https://github.com/ptq124/TIL/blob/main/.github/workflows/main.yml) 참고

2.Github 저장소에 환경변수 세팅

yaml파일을 보면 ACCESS_TOKEN을 사용하는데 Github에 들어가 이 환경변수를 세팅해 줘야한다.

https://github.com/settings/profile 으로 들어가 맨아래에 Developer settings을 클릭한다.

Personal access tokens에서 토큰을 생성하고 토큰키를 복사한다.

그다음 TIL저장소의 Setting으로 가서 Secrets의 ACtion에서 키를 등록해준다. 이름은 ACCESS_TOKEN으로 value는 아까 복사한 키를 붙어넣자!

## Step 3: 끝~!

이제 푸쉬를 하면 자동으로 main.yml파일을 읽어 action이 실행된다. 저장소에 action에서 확인 가능하다!

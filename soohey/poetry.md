## 요구사항

- python 3.7 이상

## poetry를 쓰면 뭐가 좋을까?

- **종속성 관리**
- **자체 환경 분리**
- 직관적인 CLI

## 종속성 관리

- .toml 파일
    
    ![스크린샷 2022-11-02 오후 6.30.26.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/60599186-b1b1-42b6-9567-6b3b00faab23/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-11-02_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.30.26.png)
    
    - tool.poetry.depencies 에 직접 추가
    - `poetry add` 로 추가

## 환경 관리

- 종속성 그룹 관리
    - `poetry add pytest --group test`

![스크린샷 2022-11-02 오후 6.48.25.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/998d5e1c-7bf2-4602-86c3-190953527e88/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-11-02_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.48.25.png)

 

## Virtualenv VS Poetry

### 1. 프로젝트 재배치

- virtrualenv
    - 프로젝트 폴더를 이동하거나 이름 변경시 경로가 변경되지 않음.
- Poetry
    - $HOME 에 환경을 자동으로 생성함
    - 프로젝트를 재배치할 때 동일한 환경을 사용하도록 지시 가능하다. → 테스트 목적으로 유용함 (파이썬 버전도 바꾸기 가능)
    
    <aside>
    💡 poetry env use <env location>
    
    poetry env use python3.8
    poetry env use python3.6
    
    </aside>
    

### 2. 개발 종속성

- virstualenv
    - 격리된 환경에서 종속성 관리
    - 프로덕션 환경과 개발 환경을 구분하기 위해 requestment.txt를 두개이상으로 관리 → 보안 누출의 위험성
- poetry
    
    <aside>
    💡 poetry add -D black
    
    </aside>
    
    - -D 프로젝트에 새 패키지 추가시 플래그를 사용해 개발 전용으로 지정함
    
    `poetry install --no-dev`
    
    - 프로덕션 서버에 종속성 설치시 ‘no-dev’ 플래그로 개발 종속성 필터링
    
    `poetry install --remove-untracked`
    
    - ‘remove-untracked’ 과거에 사용했던 중복 패키지 제거

### 3. 구성원과의 일관된 버전 관리

버전의 불일치를 해결하고 싶다면? 

- virtualenv
    - pip freeze → 패키지 버전 불일치, python 버전을 잡지 못함, requestment 파일에 수동으로 추가하고 버전 지정해야함
- poetry
    - .toml → virtualenv의 requestment.txt
    - 다른점
        - poetry는 패키지 설치시 poetry.lock이 있는지 확인 → 있으면 lock 파일에서 종속성 가져옴. lock 파일은 poetry만이 edit/create 가능
        - lock 파일을 커밋하고 공유

### 요약

- 개발 / 프로덕션 종속성 구별이 어려움
- 프로젝트 폴더 재배치 및 이름 바꾸는 어려움
- 팀 간의 일관된 환경 유지의 어려움
- python용 npm 같은 패키지 도구 = poetry

## 프로젝트 생성

- virtualenv
    - 프로젝트 파일 생성 → env 생성
- poetry
    
    <aside>
    💡 poetry new myproject
    
    </aside>
    

## 설치시 오류 사항

<aside>
⚠️ ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1122)

</aside>

- application > python 3.9 > install certificate … 실행 후

<aside>
⚠️ Poetry 명령어가 없을 때

</aside>

- ./zshrc 파일에 `export PATH="/etc/poetry/bin/:$PATH"` 추가

## Docker build시 고려사항

- poetry update시 빌드가 멈추는 오류 대비 → POETRY_VERSION : poetry 버전 고정하기

<aside>
💡 pip install ‘poetry==$POETRY_VERSION’

</aside>

- .toml

<aside>
💡

```
[build-system]
# Should be the same as `$POETRY_VERSION`:
requires = ["poetry>=1.0"]
build-backend = "poetry.masonry.api"
```

</aside>

- `pyproject.toml`요구 사항을 캐시 하고 `poetry.lock`파일이 변경될때만 다시 설치 → 빌드가 느려짐을 방지

<aside>
💡 `COPY poetry.lock pyproject.toml /code/`

</aside>

```python
FROM python:3.6.6-alpine3.7

ARG YOUR_ENV

ENV YOUR_ENV=${YOUR_ENV} \
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.0.0

# System deps:
RUN pip install "poetry==$POETRY_VERSION"

# Copy only requirements to cache them in docker layer
WORKDIR /code
COPY poetry.lock pyproject.toml /code/

# Project initialization:
RUN poetry config virtualenvs.create false \
  && poetry install $(test "$YOUR_ENV" == production && echo "--no-dev") --no-interaction --no-ansi

# Creating folders, and files for a project:
COPY . /code
```

[https://stackoverflow.com/questions/53835198/integrating-python-poetry-with-docker](https://stackoverflow.com/questions/53835198/integrating-python-poetry-with-docker)

### 참고

- [https://www.the-analytics.club/virtualenv-alternative-for-python-dependency-management](https://www.the-analytics.club/virtualenv-alternative-for-python-dependency-management)
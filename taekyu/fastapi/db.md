# Fast API 로 DB 세팅

## 폴더구조

```bash
-root
	|-routers
	|	|-test.py 
	|-db.py
	|-main.py
	|-models.py
```

## main.py
maim.py는 fastapi 공식문서보고 만들면됨

```python
main.py

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import database

tags_metadata = [
  {
	'name': #스웨거 부제목 api목록으로 여러개 만들수 있음
    'description': #name 간단 설명
  },
]

app = FastAPI(
	title=#"스웨거에 제목이 표시됨"
	openapi_tags=tags_metadata,
)

#cors처리 공식문서 보면 자세한 설명이 나옴
app.add_middleware(
  CORSMiddleware,
  allow_origins=[
    'http://localhost:8080',
  ],
  allow_credentials=True,
  allow_methods=['*'],
  allow_headers=['*'],
)

#@app.get("/")
#async def root():
    #return {"message": "Hello World"}

#uvicon main:app --reload 명령어 말고 python main.py로 실행할 수 있음
if __name__ == '__main__': 
  uvicorn.run(app='main:app', host='0.0.0.0', reload=True, debug=True)
```

## db.py

```python
db.py

import databases
import os
from asyncio import current_task
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_scoped_session
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = os.getenv('DB_URL',
  'mysql+aiomysql://<user>:<password>@<host>:<port>/<db> ?charset=utf8')
 
database = databases.Database(SQLALCHEMY_DATABASE_URL)
engine = create_async_engine(SQLALCHEMY_DATABASE_URL, pool_recycle=3600)
async_session_factory = sessionmaker(bind=engine, class_=AsyncSession)

# Dependency
async def get_db():
  db = async_scoped_session(session_factory=async_session_factory, scopefunc=current_task)
  try:
    yield db #db연결 성공했으면 시작
  finally:
    await db.remove() #세션이 시작된 후, api호출이 끝나면 db세션을 닫아줌
```

### 메소드 정리

**create_engine** :  인자값으로 **DB URL**을 추가하면 **DB Host에 DB 연결을 생성**한다. 이 함수가 DB연결의 출발점이다.

**sessionmaker**: 호출되었을 때, 세션을 생성해준다

**bind** : **어떤 엔진을 통해 DB연결을 할지 결정하는 부분**이다. MySQL, PostgreSQL 등 여러 SQL의 DB URL 중 어느 SQL제품으로 연결을 진행할지 선택하는 부분이다. 위의 부분에서는 engine변수가 하나밖에 선언되어있지 않지만, SQL을 여러 종류 쓰는 경우, 각 SQL에 맞게 해당 부분이 여러종류로 나뉠 수 있다.

## models.py

models.py는 간단함 먼저 dbeaver설치하고 데이터테이블 만들어라 

그리고 스크립트 파일을 만들자 

ORM 모델 클래스 생성 스크립트 파일 추출
```bash
sqlacodegen mysql+pymysql://<user>:<password>@<host>:<port>/<db> > "./models.py"
```
폴더에 models.py가 생성되고 dbeaver 생성했던 테이블이 그대로 파이썬 파일로 저장된다. 
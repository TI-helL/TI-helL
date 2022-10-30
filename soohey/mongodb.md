
### DB 연결 
- MongoClient
```
from pymongo import MongoClient

DB_HOST = settings.DB_HOST
DB_PORT = settings.DB_PORT
DB_NAME = settings.DB_NAME
DB_USERNAME = settings.DB_USERNAME
DB_PASSWORD = settings.DB_PASSWORD

client = MongoClient(host = DB_HOST, port = DB_PORT)

```

### DB 접근
- db명으로 접근
- dictionary 인덱싱
```
db = client['db_name']
collecion = db['conlletion_name']
```

### Document 추가
```
# collection 접근
posts = db.posts

# post 추가
posts.insert_one(post)
```

### Document 여러개 추가
- insert_many() : 복수개의 document 추가
```
result = posts.insert_many(new_posts)
```

### Document 단일 조회
```
posts.find_one()
posts.find_one({"_id":"12345"})
```

### Collection 내의 모든 Documents 조회
```
for post in posts.find({"user_name":"12345"}):
    print(post)
```



서버에서 크리티컬한 정보를 관리하기 위한 모듈

npm i dotenv 를 통해 설치

.env에 키, 밸류 형식으로 정보를 작성하고

필요한 곳에 적용하여 치환되는 방식

```jsx
//.env
COOKIE_SECRET=nodevirdsecret
DB_PASSWORD=123123**
```

```jsx
//app.js
const dotenv = require('dotenv');

dotenv.config();

secret: process.env.COOKIE_SECRET
```
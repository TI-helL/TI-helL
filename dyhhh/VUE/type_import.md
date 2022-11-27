# type import

타입스크립트 3.8 이상부터 타입을 임포트 하려면 타입전용 import를 사용해야한다

```log
is a type and must be imported using a type-only import when 'preserveValueImports' and 'isolatedModules' are both enabled. (ts 1444)
```

```js
import axios, {
  AxiosError,
  type AxiosResponse,
  type AxiosRequestConfig,
} from "axios";
```

axios 타입을 사용할 때 갑자기 오류가 날 수 있는데, 타입스크립트 버전이 올라가며 생긴 오류이니 type임을 명시하고 import 해주자

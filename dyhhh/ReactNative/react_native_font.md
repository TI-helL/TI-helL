# 커스텀 폰트 추가

- 커스텀 폰트를 추가하기 위해선 안드로이드, ios에 각각 추가해 주어야 한다.
- 그래서 rn에선 react-native-assets이란걸 만들었다
- 먼저 src/assets/fonts에 원하는 폰트를 추가하고
- 루트 디렉터리에 react-native.config.js 파일을 생성한다

```js
module.exports = {
  assets: ["./src/assets/fonts"],
};
```

- 그리고 아래 명령을 실행하면 ios와 안드로이드 에셋에 자동으로 연동된다

```bash
npx react-native-assets
```

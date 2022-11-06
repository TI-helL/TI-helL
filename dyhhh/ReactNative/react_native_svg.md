# rn에서 svg 로딩하기

- rn에서는 로컬 svg 이미지를 사용하기 위해선 몇가지 과정을 거쳐야한다
- react-native-svg와 react-native-svg-transformer를 설치한다
- ios의 경우 cd ./ios && pod install 를 해준다
- 몇 가지 설정을 해준다

```js
// metro.config.js
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
})();
```

```ts
// declarations.d.ts
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
```

## 사용

- svg를 컴포넌트로 로딩해 주면 된다
- android처럼 tint 속성을 이용하여 svg의 색을 변경하고 싶으면 svg컴포넌트에 fill이나 color 속성에 색값을 전달하면 된다
- 만약 fill이나 color가 먹히지 않는다면
- svg의 color나 fill로 받은 속성이 path속성으로 적용되도록 path안의 속성의 값을 currentColor 등으로 바꾸어 주면 된다.

# rn의 장점

- 코도바, 아이오닉과 같은 크로스플랫폼 앱과 차이가 있음
- 대상 플랫폼의 표준 랜더링 api를 사용한다는게 그것임
- 웹뷰 방식로 랜더링 하느 방식은 성능이 떨어진다는 단점이 있음
- 거기다 대상 플랫폼의 ui컴포넌트들을 거의 활용하지 않음
- rn은 우리가 작성한 마크업을 플랫폼에 따라 진짜 네이티브 요소로 전환함
- 메인 ui스레드와 분리되어 실행되기때문에 앱의 역량을 줄이지 않고 빠른 성능을 유지
- 즉 대상 플랫폼의 ui라이브러리를 이용해 랜더링 함
- CodePush 기술을 이용해 앱 스토어 검수없이 배포가능

- 개발 경험도 좋은편임
- 기존 웹 개발자가 rn으로 개발 시 기존에 사용하던 도구와 언어를 그대로 사용하면 되고
- react등 웹 프레임워크의 장점인 핫리로딩도 그대로 적용되기에 빠른 개발이 가능함

# rn의 단점

- 네이티브 위에 추가적인 레이어가 있는 방식이라 디버깅이 좀 어려울 수 있음
- 특히 리액트와 플랫폼간 발생하는 문제는 더욱 어려움
- 대상 플랫폼에서 새로운 버전을 릴리즈 했을 때 지원에 시간이 좀 걸릴 수 있다

# 프로젝트 빌드

## ReactNativeCLI

- 어떤 툴도 사용하지 않고 RN만 사용하여 개발하는 방식
- 초기 설정이 까다롭고, android studio, xcode등 각 플랫폼마다 설치하고 빌드해줘야함
- 개발자가 원하는 기능이나 라이브러리들을 자유롭게 제어가능

## Expo-CLI

- 초기설정이 간단하고, 개발을 쉽게 시작할 수 있으며 각 플랫폼 IDE를 설치하지 않고 시뮬레이터를 사용가능함
- 네이티브파일을 제어할 수 없고 모든 라이브러리를 사용할 수도 없으며 Expo에서 제공하는 기능만 사용가능함

## 리디에서 쓰는 RN

- typeScript
- React Navigation
- Redux and ContextApi

## 리디에서 쓰는 버저닝 전략

- Major, native code change(스토어 업데이트 필수), javascript code change(스토어 업데이트 불필요)

## 내가 고려해 볼 것

- react-query
- flipper
- codepush

## 상태관리

Flux (Redux, Zusstand)
Proxy (Mobx, Valtio)
Atomic (Jotai, Recoil)

1. Proxy 패턴 - Mobx, Valtio

Proxy 패턴의 대표적인 라이브러리는 전통적으로 애용되었던 Mobx 이다.

전체 상태들을 모아놓고 엑세스를 제공하며, 컴포넌트에서 사용되는 일부 상태를 자동으로 감지하고 업데이트를 인지하는 패턴이다.

단순한 패턴인만큼 디버깅은 어렵지만, Store 데이터에 바로 엑세스하여 변경하는 편의성이 있다고 한다.

2. Flux 패턴 - Redux, Zustand

현재까지 가장 많이 사용된 Redux가 대표적으로 보이는 패턴이다.

Store라는 상태 저장소를 기반으로, Action 타입을 Reducer에 전달하면 해당 타입에 맞는 동작에 따라 상태값을 갱신한다.

또한, 컴포넌트는 Selector를 사용해 Store에서 필요한 상태값을 구독(subscribing)하는 형태를 보인다.

상태가 분리되어 있으며 플로우가 일방적인 점이 유지보수에 용이하지만, 그만큼 보일러 플레이트와 작성할 코드가 방대해진다는 단점이 있었다.

3. Atomic 패턴 - Recoil, Jotai

React의 state와 비슷하게, 컴포넌트 트리 안에 상태들이 존재하며 이들이 상향식(bottom-up)으로 수집 및 공유되는 패턴이다.

상태들은 atom이라고 불리는 객체에서 설정하며, 값의 참조와 조작은 React.useState와 유사하게 [state, setState] 튜플로 수행한다.

Store에서 하향식(top-down)으로 관리되던 기존 패턴과 매우 다르기에, 다른 라이브러리보단 React의 Hooks 및 Context API와 많이 비교된다.

## 참조

https://ridicorp.com/story/react-native-1year-review/

https://abangpa1ace.tistory.com/241?category=905014
https://jotai.org/docs/introduction
https://ridicorp.com/story/how-to-use-redux-in-ridi/

    "@react-navigation/native": "^6.0.13",
    "@react-navigation/native-stack": "^6.9.1",
    "jotai": "^1.9.1",
    "react": "18.1.0",
    "react-native": "0.70.4",
    "react-query": "^3.39.2"
npx react-native init AwesomeTSProject --template react-native-template-typescript
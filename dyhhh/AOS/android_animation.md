# ANDROID ANIMATION

안드로이드 공홈 가이드의 내용을 정리했다

## Intro - bitmap animation

- 드로어블 애니메이션 api를 사용
- 비트맵 그래픽을 애니매이션으로 정의
- 보통은 정적으로 정의되지만
- 런타임 시 애니메이션 동작을 정의 할 수도 있다

## Intro - layout prop animation

- 레이아웃에서 뷰의 가시성, 위치를 변경해야 하는경우
- 섬세한 애니메이션을 포함해야 사용자가 변경을 쉽게 알아챌 수 있다
- 현 레이아웃 내에서 뷰를 옯기거나 숨기려면
- android.animation 패키지의 '속성' 애니메이션 시스템을 사용하면 된다
- 이 API는 일정 기간 동안 View객체의 '속성'을 업데이터 하면서 뷰를 계속 다시 그린다
- 예를들어 위치 속성을 이용하면 뷰가 이동하고 알파 속성을 이용하면 뷰가 페이드인 아웃 한다

## Intro - physics based animation

- 자연스러운 애니메이션을 만들기 위해선 물리학을 적용해야 한다
- spring, fling이 가장 일반적인 물리학 api이다
- 물리학이 적용되지 않는 애니메이션은 보통 ObjectAnimator로 제작하고
- 물리학 기반 애니메이션은 DynamicAnimation API로 제작한다

## Intro - layout based animation

- android 4.4 이상에션 현재 Activity 또는 Fragment 내에서 레이아웃을 변경할 때 전환 프레임워크를 사용하여 애니메이션을 만들 수 있다
- 시작 및 종료 레이아웃과 사용하려는 애니메이션 유형을 지정하면 된다
- 시작 화면은 현재 레이아웃에서 자동으로 결정되지만
- 시작 및 종료 레이아웃은 Scene에 각각 저장된다
- 애니메이션 유형을 Transition에 지정한 후 TransitionManager.go()를 호출하여 애니메이션을 실행하여 전환시킨다

## Intro - Activity inter animation

- ActivityOptions.mackSceneTransitionAnimation에 옵션을 전달하고
- startActivity를 호출하면 전환시 애니메이션이 적용된다.

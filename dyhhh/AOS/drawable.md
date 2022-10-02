# 드로어블 리소스

- 화면에 그릴 수 있는 리소스이다.
- getDrawable과 같은 api를 사용하여 가져오거나
- android:drawable, android:icon의 속성값으로 지정하여 적용할 수 있는
- 그래픽에 대한 일반적인 개념이다.

## 리소스 유형

- 비트맵 파일
  - png, webp, jpg, gif로 BitmapDrawable을 생성
- 나인패치 파일
  - 콘텐츠에 따라 이미지의 크기를 조절할 수 있는 png파일
  - NinePatchDrawable을 생성
- 계층목록
  - 다른 드로어블 배열을 관리하는 드로어블
  - 배열의 순서대로 그려짐
  - LayerDrawable을 생성
- 상태목록
  - 상태별로 다른 그래픽을 참조
  - 예를들어 버튼 클릭 상태에 따라 다른 이미지를 적용할 수 있음
  - StateListDrawable을 생성
- 레벨 목록
  - 대체 드로어블의 수를 관리
  - LevelListDrawable을 생성
- 전환 드로어블
  - 두 개의 드로어블 리소스간 크로스페이드 할 수 있는 드로어블을 정의
  - TransitionDrawable을 생성
- 인셋 드로어블
  - 지정된 거리만큼 다른 드로어블을 인셋
  - 뷰가 뷰의 실제 범위보다 작은 백그라운드를 필요할때 유용
- 클립 드로어블
  - 현재 레벨값을 기준으로 다른 드로어블을 클립
  - ClipDrawable을 생성
- 배율 조정 드로어블
  - 현재 레벨값을 기준으로 다른 드로어블의 크기를 변경
  - ScaleDrawable
- 도형 드로어블
  - 생상과 그라데이션을 포함하여 기하학적 도형을 정의
  - GradientDrawable
- 애니매이션 드로어블

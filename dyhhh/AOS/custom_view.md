# CUSTOM VIEW

View를 재정의하여 다양한 기능의 뷰를 정교하고 강력하게 구현할 수 있음

## 기본 접근법

- 기존의 View 또는 서브클래스를 확장
- 슈퍼클래스에서 일부 메서드를 재정의
- 재정의할 메서드는 on으로 시작
- 확장 클래스를 사용

## fully 커스터마이즈

- View를 확장하여 새로운 컴포넌트 생성
- xml에서 속성과 매개변수를 가져올 수 있는 생성자 제공
- 고유한 이벤트리스너, 속성접근자 등으로 정교한 동작 제공
- onMeasure과 onDraw를 재정의하여 뷰의 외형을 조작

## onDraw, onMeasure

- onDraw
  - 매개변수로 제공받는 Canvas를 통해 그려질 그래픽 요소를 정의
  - 3d 그래픽은 View 대신 SurfaceView를 확장하여 별도의 스레드에서 그려야함
  - GLSurfaceViewActivity를 참고
- onMeasure
  - 컴포넌트외 컨테이너 간 관계되는 렌더링 요소들을 정의
  - 컴포넌트가 포함 될 컨테이너의 수치적 제한사항이 onMeasure에 제공됨

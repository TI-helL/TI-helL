# CSS position attribute

1. Static
2. Relative
3. Fixed
4. Absolute

## Static
웹 브라우저의 흐름에 따라 차례대로 요소를 위치하는 것으로 가장 기본적인 위치이다.

## Reactive
static의 위치에서 top, botton, left, right 등으로 shift를 하여 요소를 위치시키는 방식이다.

## Fixed
현재의 viewport를 기준으로 위치시키는건데 viewport란 브라우저의 화면 크기를 뜻한다(일단은)

## Absolute
static외의 위치 요소를 가지는 가장 가까운 부모 element를 기준으로 배치하는 방식이다.

여기서 주의해야하는게 fixed인데.

Fixed는 viewport 좌표계를 기준으로 배치한다.

앵간하면 viewport가 변하는 일은 없겠지만.

Transform은 사양상 독자적인 좌표계를 가지기 때문에 fixed는 그 영향을 받아 부모 transform이 생성한 독립적 좌표계를 viewport로 하여 배치된다.

이는 오래전부터 유명한 bug로 알려졌으나 사실 명세의 구현에 따른 상충작용으로 사용에 유의해야한다.(이 경우 문제가 되는 parent의 transform에 대해 transform: 0 !important를 적용하여 임시 해결할 수 있다.)

Sticky는 fixed와 비슷해 보이지만. Fixed는 viewport에 고정되어 스크롤링 하여도 요소의 위치가 움직이지 않는 반면 sticky는 스크롤에서 표시되는 범위 만큼에서는 일반적인 객체 위치대로 표시되다가 스크롤링이 요소표시 한계 이상으로 벗어나게 되면(요소가 없어질라고 하면) 한계 위치에 고정되어 표시된다.
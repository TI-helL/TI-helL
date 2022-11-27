# CONSTRAINT LAYOUT

- 유연하게 다른 View를 배치할 수 있는 ViewGroup
- 중첩 뷰 그룹 없이 크고 복잡한 레이아웃 구성 가능

## 제약조건

- 가로 및 세로 제약조건을 각각 하나 이상 추가
- 제약조건은 다른 View, 상위레이아웃, 안내선을 기준으로 한 정렬 이나 관계를 정의
- 제약조건이 없으면 0,0 위치에 그려짐

## 상위 요소 포지셔닝

- 뷰를 레이아웃의 가장자리를 기준으로 정렬 혹은 포지셔닝 시킨다

## 위치 순서 지정

- 가로 또는 세로로 두 보기의 순서를 정의

## 정렬

- 뷰의 가장자리를 다른 뷰의 가장자리를 기준으로 정렬 혹은 오프셋을 지정

## 기준선 정렬

- 뷰의 텍스트 기준선을 다른 보기 텍스트 기준선에 맞춤

## 안내선 제한

- 에디터에서 레이아웃을 기준으로 안내선을 추가하고, 거기를 기준으로 정렬
- 안내선은 dp 혹은 백분율을 기반으로 배치

## 경계선 제한

- 안내선과 비슷하지만, 경계선은 위치 자체를 정의하지 않고
- 특정 뷰를 기반으로 경계선의 위치가 이동
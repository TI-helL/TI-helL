# GRAVITY ALIGNMENT

- 안드로이드의 뷰그룹과 뷰에 적용할 수 있는 정렬 속성이다
- gravity와 layout_gravity 두 속성이 있다

## gravity

- 자신의 뷰에 포함하고 있는 콘텐츠를 정렬
- 텍스트뷰의 경우 텍스트, 이미지뷰는 이미지를 정렬

## layout_gravity

- 부모컨테이너에서 뷰위치를 정렬
- 해당 속성을 정의하는 뷰가 속하는 상위 컨테이너를 기준으로 정렬하는 것이 유의
- 부모컨테이너에 여유공간이 있는 경우 사용 가능하며
- 따라서 부모 컨테이너가 wrap_content로 정의되어 있는 경우는 사용 불가하다

## 헷갈리는 속성값

- center_vertical: 대상객체를 수직방향의 중앙에 정렬
- center_horizontal
- fill_vertical: 대상객체를 수직방향으로 여유공간만큼 확대하여 채우기
- fill_horizontal
- clip_vertical: 대상객체의 상하길이가 여유공간보다 클 경우 남는부분 다르기
- top | clip_vertical: 아래쪽에 남는 부분 자르기
- bottol | clip_vertical: 위쪽에 남는 부분 자르기
- clip_horizontal

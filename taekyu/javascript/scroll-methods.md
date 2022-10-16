# scroll 이벤트 구현시 필요한 함수들

## window.pageYOffset

- 현재 스크롤이 얼마나 됐는지 px 단위로 반환하는 속성

## .getBoundingClientRect vs offsetTop

### dom.getBoundingClientRect().top

- 현재 화면 기준으로 해당 엘리멘트의 좌표값을 반환
- 스크롤에 따라 값이 변함, 실시간 동적으로 움직이는 좌표를 구할때 사용

### offsetTop

- 부모 요소에서 상대적인 top 좌표를 반환
- position이 relative인 부모요소를 기준으로 삼는다. relative가 없으면 최상위 dom을 기준으로 좌표를 반환

### 요약

부모 요소가 없다 가정하면

offsetTop 웹브라우저 최상단 기준

getBoundingClientRect 현재화면 기준

## 절대좌표 구하기

- window.pageYOffset + dom.getBoundingClientRect().top

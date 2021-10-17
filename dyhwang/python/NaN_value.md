# Nan value
## Nan 이란
- nan은 주어진 값이 유효하지 않음을 나타내는 상수이다. Not a Number
- nan과 Null은 서로 다른데, Null은 비어있음을 나타낸다.
- float("nan")으로 표현 가능하다.
## Nan 판별
- python 에선 NumPy, math에서 제공하는 isnan을 통해서
- pandas 에선 isna를 사용하여 nan값을 확인할 수 있다.
- obj == float("nan")으로 검출이 불가능하다. 이유는 값이 유효하지 않음을 나타내기 때문에 비교가 불가능하기 때문인듯하다.
- nan값의 특징을 사용하여 obj != ojb 와 같은 방법으로 검출 가능하다.
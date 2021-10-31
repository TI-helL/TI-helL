# dataframe sort
dataframe의 index, column 기준으로 정렬할 수 있다
## sort_values
열 혹은 행방향 정렬<br>
option
- ascending : True는 오름차순
- inplace : True면 정렬한 값을 dataframe에 반영
- by : 정렬할 기준 변수 지정
- na_position : first, last
- axis
## sort_index
index를 기준으로 하여 정렬<br>
option
- axis = 0 : index명 정렬
- axis = 1 : column 명 정렬
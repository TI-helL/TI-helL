# 데이터프레임 결측치 삭제
데이터프레임에서 결측치를 삭제하는 방법은 대표적으로 3가지가 있다
## df.dropna(axis=0)
row에 결측치가 포함되어 있는 경우 row 삭제
## df.dropna(axis=1)
col에 결측치가 포함되어 있는 경우 row 삭제
## df[].dropna()
특정 행 또는 열을 대상으로 결측값이 들어가있으면 제거
## parameters
- axis : 0 or index, 1 or columns
- how : 'any', 'all' : 하나라도 na면 드랍, 모두 na면 드랍
- thresh : 주어진값 이상이 na면 드랍
- subset : 특정 axis의 na를 기준으로 드랍
# 데이터프레임 행 열 갯수 count
|구분|dataFrame|Series|
|--|--|--|
row count|len(df)<br>df.shape[0]<br>len(df.index)|len(s)<br>s.size<br>len(s.index)
col count|df.shape[1]<br>len(df.columns)|N/A
non-null row count|df.count|s.count
row count per group|df.groupby(...).size()|s.groupby(...).size()
non-null row count per group|df.groupby(...).count()|s.groupby(...).count()


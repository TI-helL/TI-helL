# dataframe
- 2차원의
- 인덱스가 같은 하나이상의 series가 모인
- DBMS의 관계형 table과 유사한 형태의 자료구조이다.

```python
import pandas as pd
from pandas import Series, DataFrame
```

## dataframe 생성
```python
DadaFrame(data=None, index=None, columns=None, dtype=None, copy=False)
```
- data: 저장되는 데이터
- index: index의 정보, 미입력시 0부터 순차적으로
- columns: 열에대한 이름, 미입력시 0부터
- dtype: 데이터 타입 명시

index와 columns는 생성 이후 지정 가능하다
```python
df.index = []
df.columns = []
```

## data 추가
```python
df['index_N'] = [1,2,3,4]
df['index_N'] = Series
```

## 행 추가
```python
new_df = df.append(Series)
```

## data 삭제
```python
#열삭제
df.drop('column_N', axis = 1)

#행삭제
df.drop('index_N', axis = 0)
```

## col 조회
```python
# columns 조회
df['col']

# 두 개 이상 조회
df['col_1', 'col_2']
```

## index 조회
```python
df.loc['index_N']

df.iloc[1]

# 두 개의 index로 조회
df.loc[['index_1', 'index_2']]

# 여러개의 index로 index 조회
df.iloc[1:3]
```

## 동시 조회
```python
# 하나의 index, col에 해당하는 하나의 값
df.at['index', 'col']
df.loc['index', 'col']
df.loc['index']['col']

# 여러 index, col에 해당하는 여러개의 값
df.loc[ ['index_1', 'index_2'], ['col_1', 'col_2'] ]
df.loc[['index_1', 'index_2']][['col_1', 'col_2']]
```
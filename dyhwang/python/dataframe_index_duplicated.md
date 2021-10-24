# data frame 인덱스 중복 제거
## 중복여부 확인
```python
df.index.is_unique

df.index.nunique() == len(df.index)
```

## index 별 갯수 집계
index level이 0인 모든 index에 대한 카운팅 결과를 반환한다.
```python
df.groupby(level=0).count()
```

## 중복 인덱스 확인
카운팅 값이 1이상인 즉 중복인 인덱스를 반환한다.
```python
df[df.groupby(level=0).count()>1]
```

## 중복 인덱스 처리
중복인 index의 첫번째, 마지막 행만을 남기고 중복을 제거한다.
```python
df.groupby(level=0).first()
df.groupby(level=0).last()
```

## 중복 인덱스 집계
중복인 index의 값을 산술적인 연산을 통해 합병하는 식으로 중복을 제거한다.
```python
df.groupby(level=0).sum()
df.groupby(level=0).size()
df.groupby(level=0).mean()
df.groupby(level=0).min()
df.groupby(level=0).max()
```
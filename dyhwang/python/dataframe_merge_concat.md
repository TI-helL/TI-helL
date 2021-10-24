# data frame merge, concat

## merge
두 데이터프레임을 고유값을 기준으로 병합할 때 사용한다.
### reference
df_left, df_right 데이터프레임을 합병하는 함수이고 how에 합병의 방법, on에 합병의 기준을 명시한다.
```python
pd.merge(df_left, df_right, how, on)
```

## concat
데이터프레임을 물리적으로 붙여주는 메서드<br>
주로
```python
pd.concat([dataframe1, dataframe2, ...])
```
형태로 사용한다.
### axis
```python
pd.concat([dataframe1, dataframe2, ...], axis=0 or 1)
```
0은 아래로 1은 옆으로 이어붙인다.
### join
```python
pd.concat([dataframe1, dataframe2, ...], join='inner' or 'outer')
```
inner는 교집합, outer는 합집합으로 병합

# Data frame 컬룸, 인덱스 명 변경
## data frame 위에서의 명칭
||column1|column2|...|
|--|--|--|--|
|index name||||
|index label1||||
|index label2||||
|...||||
## columns
### columns 값 획득
```python
list(df.keys())
df.columns
```
### columns 값 변경
```python
df.columns = ['column1_newName', 'column2_newName']

df.rename(columns = {'column1_newName':'
'}, inplace=True)
#inplace가 True면 원본값을 변경함
```

## index
### index 값 획득
```python
df.index
```
### index 값 변경
```python
df.index = ['new_index1','new_index2','new_index3']

df.rename(index = {'old_index1'_'new_index1'}, inplace=True)
```
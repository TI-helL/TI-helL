# dafa frame 중복제거
데이터프레임 행에서 중복을 제거하는 방법을 알아보자.
## drop_duplicates
데이터프레임에서 중복행을 제거하기 위해 주로 사용하는 메서드이다.
```python
#reference
DataFrame.drop_duplicates( subset=None, keep='first', inplace=False, ignore_index=False )
```
### 중복제거
아무것도 지정하지 않는 경우 모든 열을 기준으로 중복을 제거한다.
```python
df.drop_duplicates()
```
### 열을 지정하여 제거
파라메터로 열의 이름을 지정해주면 지정한 열을 기준으로 하여 중복을 제거한다.
```python
df.drop_duplicates(['col'])
```

### keep
중복되는 데이터중 어떤 행을 남길 지 선택 할 수 있다.
```python
df.drop_duplicates(keep=['first', 'last'] or False)
```

### 인덱스 재설정
ignore_index 플래그를 설정하면 중복 제거 후 비어있는 인덱스를 순차적으로 재설정할 수 있다.
```python
df.drop_duplicates(ignore_index = True)
```
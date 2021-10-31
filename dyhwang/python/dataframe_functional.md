# dataframe map apply applymap 함수 사용
# map
반드시 series 타입에서만 사용가능<br>
value + index = series<br>
모든값에 함수를 일괄적용
```python
result = deries.map( function )
```
# apply
dataframe에 사용가능한 함수<br>
행 또는 열에 해당하는 series에 함수를 일괄적용<br>
```python
# axis = 0 열기준으로 함수적용
# axis = 1 행기준 함수적용

df.apply( function, axis = 0 )
```
#applymap
dafaframe의 모든 값에 함수를 일괄적용
```python
df.applymap( function )
```
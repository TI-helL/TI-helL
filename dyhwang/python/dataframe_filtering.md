# dataframe 필터링
dataframe에서 데이터를 정제하기 위한 몇가지 필터링 방법을 정리하였다
## 논리 연산자
```python
df[(df.val > 0.5) & (df.val2 == 1)]

df[(df.val > 0.5) | (df.val2 == 1)]

# filterList안에 있는 이름으로 구성된 데이터프레임을 반환
df[df.name.isin(filterList)]

df[df.name.str.startswith('J')]

df[df.name.str.contains('y')]
```

## 물결표
~ 연산자는 논리연산자 중 not에 해당한다.<br>
표현식 앞에 물결표 연산자를 적용하면 조건에 맞지 않는 행이 반환
```python
df[~{condition}]
```

## 쿼리
```python
df.query('col_1 == 1' and 'col_2 > 0.5')
```
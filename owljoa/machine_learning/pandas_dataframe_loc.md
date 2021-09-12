# pandas dataframe.loc 함수

- 데이터프레임에서 행이나 열을 특정 레이블이나 boolean array를 조건으로 조회하는 용도의 함수

<br>

## 입력

- 단일 레이블
  - ex) 5, 'a' 등
- 레이블의 리스트나 행렬
  - ex) ['a', 'b', 'c']
- 레이블로 이루어진 슬라이스 객체
  - ex) 'a':'f'
  - 파이썬의 보통 슬라이스와는 달리 시작과 끝을 포함함
- 정렬가능한 boolean 시리즈
  - 마스킹 이전에 인덱스가 정렬됨
- 정렬가능한 인덱스
  - 반환되는 값의 인덱스가 입력이 됨
- callable 함수
  - 함수 인자는 1개일 것
  - 반환값은 인덱싱할 수 있는 값일 것 (위에 정의한 입력 형태 중 하나)

<br>

## 예시

<br>

### 기반 데이터

<br>

```python
>>> df = pd.Dataframe([[1, 2], [4, 5], [7, 8]], index=['cobra','viper','sidewinder'], columns=['max_speed', 'shield'])

>>> df
            max_speed  shield
cobra               1       2
viper               4       5
sidewinder          7       8

```

<br>

- 단일 레이블을 이용한 조회
  - Series 형태의 데이터 행을 반환
  
  ```python
  >>> df.loc['viper']
  max_speed    4
  shield       5
  Name: viper, dtype: int64
  ```

<br>

- 레이블 리스트를 이용한 조회
  - DataFrame 형태로 반환됨
  
  ```python
  >>> df.loc[['viper', 'sidewinder']]
            max_speed  shield
  viper               4       5
  sidewinder          7       8
  ```

<br>

- 단일 레이블로 구성한 행과 열을 이용한 조회
  - 해당하는 단일 값이 반환됨

  ```python
  >>> df.loc['cobra', 'shield']
  2
  ```

<br>

- 행은 레이블로 구성된 슬라이스로, 열은 단일 레이블로 구성하여 조회

  ```python
  >>> df.loc['cobra':'viper', 'max_speed']
  cobra    1
  viper    4
  Name: max_speed, dtype: int64
  ```

<br>

- 행의 갯수와 같은 길이의 Boolean list를 이용한 조회

  ```python
  >>> df.loc[[False, False, True]]
              max_speed  shield
  sidewinder          7       8
  ```

<br>

- 정렬가능한 boolean 시리즈를 이용한 조회
  - index를 지정해서 순서가 원본 데이터프레임과 다른 것을 참고할 것

  ```python
  >>> df.loc[pd.Series([False, True, False], index=['viper', 'sidewinder', 'cobra'])]
              max_speed  shield
  sidewinder          7       8
  ```

<br>

- 조건문을 이용하여 조회

  ```python
  >>> df.loc[df['shield'] > 6]
              max_speed  shield
  sidewinder          7       8
  ```

<br>

## 참고

<https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.loc.html>
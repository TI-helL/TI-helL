# Predicting Credit Risk - Model Pipeline

## 소개
### context
문제의 데이터셋을 사용하여 리스크 추정 모델을 학습하고, 데이터가 주어지면 신용등급 class로 분류해 내는 모델을 구축

## 사용 라이브러리

```python

import pandas as pd #To work with dataset
import numpy as np #Math library
import seaborn as sns #Graph library that use matplot in background
import matplotlib.pyplot as plt #to plot some parameters in seaborn

df_credit = pd.read_csv("../input/german-credit-data-with-risk/german_credit_data.csv",index_col=0)
```

## 데이터셋 개요

- 데이터 유형
- 널값 분포
- 극외값 확인
- 데이터셋의 헤더

### 데이터셋의 형태를 파악하고 누락된 값 확인
```python
print(df_credit.info())
```

```python
<class 'pandas.core.frame.DataFrame'>
Int64Index: 1000 entries, 0 to 999
Data columns (total 10 columns):
Age                 1000 non-null int64
Sex                 1000 non-null object
Job                 1000 non-null int64
Housing             1000 non-null object
Saving accounts     817 non-null object
Checking account    606 non-null object
Credit amount       1000 non-null int64
Duration            1000 non-null int64
Purpose             1000 non-null object
Risk                1000 non-null object
dtypes: int64(4), object(6)
memory usage: 85.9+ KB
None
```
2가지 카테고리에서 null 값을 확인할 수 있다.

```python
#Looking unique values
print(df_credit.nunique())
#Looking the data
print(df_credit.head())
```

```python
Age                  53
Sex                   2
Job                   4
Housing               3
Saving accounts       4
Checking account      3
Credit amount       921
Duration             33
Purpose               8
Risk                  2
dtype: int64
   Age     Sex  Job  ...  Duration              Purpose  Risk
0   67    male    2  ...         6             radio/TV  good
1   22  female    2  ...        48             radio/TV   bad
2   49    male    1  ...        12            education  good
3   45    male    2  ...        42  furniture/equipment  good
4   53    male    2  ...        24                  car   bad

[5 rows x 10 columns]
```

### 데이터 탐색
가장 많이 스프레드 되어있는 연령의 분포를 조사하고
seaborn으로 데이터를 시작화시켜 데이터를 좀 더 구체적으로 살펴봄
#### 클래스 분포 조사
```python
# it's a library that we work with plotly
import plotly.offline as py 
py.init_notebook_mode(connected=True) # this code, allow us to work with offline plotly version
import plotly.graph_objs as go # it's like "plt" of matplot
import plotly.tools as tls # It's useful to we get some tools of plotly
import warnings # This library will be used to ignore some warnings
from collections import Counter # To do counter of some features

trace0 = go.Bar(
            x = df_credit[df_credit["Risk"]== 'good']["Risk"].value_counts().index.values,
            y = df_credit[df_credit["Risk"]== 'good']["Risk"].value_counts().values,
            name='Good credit'
    )

trace1 = go.Bar(
            x = df_credit[df_credit["Risk"]== 'bad']["Risk"].value_counts().index.values,
            y = df_credit[df_credit["Risk"]== 'bad']["Risk"].value_counts().values,
            name='Bad credit'
    )

data = [trace0, trace1]

layout = go.Layout(
    yaxis=dict(
        title='Count'
    ),
    xaxis=dict(
        title='Risk Variable'
    ),
    title='Target variable distribution'
)

fig = go.Figure(data=data, layout=layout)

py.iplot(fig, filename='grouped-bar')
```
![credit plot](../image/german_credit_risk_1.png)
클래스가 2:1비율로 밸런싱이 안맞는 것을 볼 수 있다. 성능에 문제가 된다면 전처리를 고려해야 할 수도 있음

#### 연령별 클래스 분포, 연령 분포 시각화

```python
df_good = df_credit.loc[df_credit["Risk"] == 'good']['Age'].values.tolist()
df_bad = df_credit.loc[df_credit["Risk"] == 'bad']['Age'].values.tolist()
df_age = df_credit['Age'].values.tolist()

#First plot
trace0 = go.Histogram(
    x=df_good,
    histnorm='probability',
    name="Good Credit"
)
#Second plot
trace1 = go.Histogram(
    x=df_bad,
    histnorm='probability',
    name="Bad Credit"
)
#Third plot
trace2 = go.Histogram(
    x=df_age,
    histnorm='probability',
    name="Overall Age"
)

#Creating the grid
fig = tls.make_subplots(rows=2, cols=2, specs=[[{}, {}], [{'colspan': 2}, None]],
                          subplot_titles=('Good','Bad', 'General Distribuition'))

#setting the figs
fig.append_trace(trace0, 1, 1)
fig.append_trace(trace1, 1, 2)
fig.append_trace(trace2, 2, 1)

fig['layout'].update(showlegend=True, title='Age Distribuition', bargap=0.05)
py.iplot(fig, filename='custom-sized-subplot-with-subplot-titles')
```
![age plot](../image/german_credit_risk_2.png)
연령별 클래스 분포의 형태가 비슷하다는 것을 볼 수 있다.

#### 모든 연령의 분포를 변수로 만들어 처리하게 되면 학습에 문제가 생길 수 있기 때문에 4가지 범주로 나눠 그 분포를 확인
```python
#Let's look the Credit Amount column
interval = (18, 25, 35, 60, 120)

cats = ['Student', 'Young', 'Adult', 'Senior']
df_credit["Age_cat"] = pd.cut(df_credit.Age, interval, labels=cats)


df_good = df_credit[df_credit["Risk"] == 'good']
df_bad = df_credit[df_credit["Risk"] == 'bad']
```

![age plot](../image/german_credit_risk_3.png)
#### 집 소유유무와 신용간의 상관관계를 보기 위한 시각화

```python
#First plot
trace0 = go.Bar(
    x = df_credit[df_credit["Risk"]== 'good']["Housing"].value_counts().index.values,
    y = df_credit[df_credit["Risk"]== 'good']["Housing"].value_counts().values,
    name='Good credit'
)

#Second plot
trace1 = go.Bar(
    x = df_credit[df_credit["Risk"]== 'bad']["Housing"].value_counts().index.values,
    y = df_credit[df_credit["Risk"]== 'bad']["Housing"].value_counts().values,
    name="Bad Credit"
)

data = [trace0, trace1]

layout = go.Layout(
    title='Housing Distribuition'
)


fig = go.Figure(data=data, layout=layout)

py.iplot(fig, filename='Housing-Grouped')
```
![age plot](../image/german_credit_risk_4.png)
상당한 관계를 가지고 있는 것을 볼 수 있다.
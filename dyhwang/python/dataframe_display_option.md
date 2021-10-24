# data frame 디스플레이 옵션
```python
from IPython.core.display import display, HTML

## 전체 구간을 넓게

display(HTML("<style>.container { width:100% !important; }</style>"))

## 각 컬럼 width 최대로

pd.set_option('display.max_colwidth', -1)

## rows 500

pd.set_option('display.max_rows', 500)

pd.set_option('display.max_rows', None)

## columns

pd.set_option('display.max_columns', 500)

pd.set_option('display.width', 1000)
```
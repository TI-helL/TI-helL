# sqllist3

## db 연결
```python
import sqlite3

con = sqlite3.connect("text.db")
#con = sqlite3.connect({path.db})
#con = sqlite3.connect(":memory:")

cur = con.cursor()
con.close()
```

## table
```python
cur = con.cursor()
query = """create table TestData(
            no integer,
            title text,
            date date
        )"""
cur.execute(query)
```
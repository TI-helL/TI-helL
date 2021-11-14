# 내장함수 zip
데이터를 하나로 엮어주는 함수
- 여러개의 iterable한 객체를 인자로 받고
- 각 객체의 인덱스를 하나씩 엮어 튜플 형태로 접근할 수 있는 iterator를 반환

## usage
```python
numbers = [1, 2, 3]
letters = ["A", "B", "C"]

for i in range(3):
    pair = (numbers[i], letters[i])
    print(pair)

(1, 'A')
(2, 'B')
(3, 'C')
```

## 병렬처리
```python
for number, upper, lower in zip("12345", "ABCDE", "abcde"):
    print(number, upper, lower)

1 A a
2 B b
3 C c
4 D d
5 E e
```

## unzip
```python
numbers = (1, 2, 3)
letters = ("A", "B", "C")
pairs = list(zip(numbers, letters))
pairs
[(1, 'A'), (2, 'B'), (3, 'C')]
```

## dict cvt
```python
keys = [1, 2, 3]
values = ["A", "B", "C"]
dict(zip(keys, values))
{1: 'A', 2: 'B', 3: 'C'}
```
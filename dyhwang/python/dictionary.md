# 딕셔너리 다루기
## dict.items()
딕셔너리의 items() 메서드는 딕셔너리의 키-값을 쌍으로 하는 튜플로 구성된 dict_items 객체를 리턴한다.<br>
dict_items를 인덱스로 접근하기 위해선 list로 변환할 필요가 있다.<br>
```python
items = list(dict.items())    
```
dict_keys, dict_values에도 같은 방식으로 list형태의 딕셔너리 내부 아이템들을 반환 받을 수 있다.
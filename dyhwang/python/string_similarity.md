# 텍스트 유사도 측정
jellyfish는 아래의 유사도 측정 알고리즘을 지원
- Levenshtein Distance
- Damerau-Levenshtein Distance
- Jaro Distance
- Jaro-Winkler Distance
- Match Rating Approach Comparison
- Hamming Distance

## usage
```python
import jellyfish

jellyfish.levenshtein_distance(u'jellyfish', u'smellyfish')
2
jellyfish.jaro_distance(u'jellyfish', u'smellyfish')
0.89629629629629637
jellyfish.damerau_levenshtein_distance(u'jellyfish', u'jellyfihs')
1
```
# Decision Tree

### 분류 지표 종류

#### ID3(Information Gain)
* Entropy에 기반한 Information Gain에 따라 트리를 확장해간다.
* 어떤 기준으로 나누기 전의 entropy와 나눈 후의 entropy의 차이(Information Gain)을
비교하여 가장 큰 기준으로 나눈다.
* Entropy : 무질서도, 클래스가 균일하게 분포하면 1, 한 쪽에 몰려 있으면 0
* plog(p)
* [링크](https://tyami.github.io/machine%20learning/decision-tree-2-ID3/)

#### C4.5
* ID3의 문제점(여러 값을 갖는 기준을 사용하여 나누는 경우 부정확함)을 개선
* Information Gain Ratio를 이용한다.
* Information-Gain / Intrinsic Value
* [링크](https://https://tyami.github.io/machine%20learning/decision-tree-3-c4_5/)

#### CART(Classification And Regression Tree)
* Regression도 가능한 특징
* [Gini Index](https://process-mining.tistory.com/106) (1 - p^2)를 기준으로 함
* Binary Tree임
* [링크](https://https://tyami.github.io/machine%20learning/decision-tree-4-CART//)
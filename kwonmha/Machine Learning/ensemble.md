# Ensemble 방법들

#### Voting
* Hard voting: 다수결로 결정
* Soft voting; 가중치의 합으로 결정

#### Bagging(Bootstrap Aggregating)
* Bootstrap : 기존 데이터셋에서 여러번 sampling하여 여러 개의 
데이터셋을 생성한 후, 각각 학습
* 예시: [Random Forest](https://tyami.github.io/machine%20learning/ensemble-2-bagging-random-forest/)

#### Boosting
##### 1. Adaboost
1. Gini index를 이용해 stump(root + 2 nodes) 생성
2. 오류율에 따라 amount of say 계산
3. 1/n이었던 각 sample weight를 정분류, 오분류에 따라 update
(오분류 sample의 weight가 증가)
4. Update된 sample weight에 따라 resampling
5. 다시 stump 생성
6. Hard voting - 만들어진 여러개의 모델로 amount of say * 분류결과
* [링크](https://tyami.github.io/machine%20learning/ensemble-3-boosting-AdaBoost/)

#####2. Gradient Boosting

* [regression](https://tyami.github.io/machine%20learning/ensemble-5-boosting-gradient-boosting-classification/)
* [classification](https://tyami.github.io/machine%20learning/ensemble-5-boosting-gradient-boosting-classification/)
####3. XGBoost
####4. LightGBM
####5. CatBoost
####6. NGBoost

#### Stacking
*

[참고](https://tyami.github.io/machine%20learning/ensemble-1-basics/)
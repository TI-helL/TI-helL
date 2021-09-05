# A comparative study of forecasting Corporate Credit Ratings using NN, SVM and DT<br>
## 연구목적
- 네 가지 선행연구에서 적용된 모델(Bagged, RF, SVM, MLP)의 구현 및 Data set 에서의 성능비교
- Credit rating 예측 모델의 성능을 정확하게 측정하기 위한 Notch distance의 도입
- 예측모델과 실제 평가기간과의 유사도 분석

## 연구방법
### 구현 모델
- 신용등급 예측에 유용하다 간주되는 네 가지 선행연구의 모델 (Bagged Decision Trees, Random Forest, SVM, MLP)을 구현
### Data set
- 입력 데이터
	금융 섹터 52종목 (1990년 ~ 2018년)
	에너지 섹터 28종목 (2009년 ~ 2018년)
	헬스케어 섹터 44종목 (2009년 ~ 2018년)
- 출력 데이터
	S&P 신용등급 (AAA ~ CC)
### 성능 측정방법
- notch distance

## Data Set
- 금융, 에너지, 헬스케어 종목의 과거 재무데이터를 사용 (Bloomberg, Compustat)

- 이용가능한 변수 중 선행 연구(Zan Huang, 2004) 에 기반한 방법으로 신용등급에 영향을 주는 재무변수 선정 <br>
금융섹터 16개, 에너지/헬스케어 20개

- 출력 데이터는 S&P 신용등급을 사용<br>
AAA ~ CC 19개 등급<br>
notch distance 분석을 위해 1 ~ 19로 계산<br>
### 금융섹터변수
![금융섹터 변수](./image/A_comparative_study_NN_SVM_and_DT_table1.jpg)
### 에너지, 헬스케어 섹터 변수
![에너지, 헬스케어 섹터 변수](./image/A_comparative_study_NN_SVM_and_DT_table2.jpg)

## 성능측정방법
- 10-fold 교차 검증 사용
- 정확한 신용등급 예측 평가를 위해 Notch distance 사용
    - 테스트 데이터 결과의 정확도 비율은 예측결과가 실제 값에서 얼마만큼 떨어져 있는지 정량적으로 평가하지 못하기 때문

### 성능측정방법 - Notch Distance
notch distance는 실제 신용등급 y와 예측신용등급 $\hat{a}$의 차이를 나타낸다
- $$ Y = y - \hat{y}$$
모든 예측값에서 notch distance를 구할 수 있고 특정 notch distance, i의 분포를 다음 수식으로 계산 할 수 있다
 - $$F(i) = \sum_{k \in N} I(\hat{y}_k - y_k = i) / N$$
 - $$f(0)은 notch값이 0인 분포확률을 나타냄(예측값이 정확한 경우)$$

 ### 성능 측정 방법
 - 기대값 DC = $E[Y] = \sum_i I*F(i)$
 - 절대 기대값 ADC = $E[|Y|] = \sum_i |i|*F(i)$
 - 조건부 기대값 $E[Y|Y \neq 0] = \sum_{i\neq0}i*\frac{F(i)}{\sum_{j\neq0}F(j)}$
    -이 경우 notch distance가 0이 아닌 경우 즉 예측에 실패한 경우에 대한 기대값을 구하는 수식이다.
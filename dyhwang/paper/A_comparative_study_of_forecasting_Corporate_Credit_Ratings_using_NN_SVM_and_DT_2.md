# A comparative study of forecasting Corporate Credit Ratings using NN, SVM and DT<br>
## 실험결과
### Notch distance 별 비율
![Notch distance별 비율](./image/A_comparative_study_NN_SVM_and_DT_table3.jpg)
- Zero는 Notch distance가 0인 즉 정확하게 예측한 관측값의 결과를 보여준다.
- 의사결정 트리 기반의 두 모델의 성능이 SVM, MLP 보다 나음을 볼 수 있다.
- 섹터별로 정확히 예측한 관측값의 비율은 유사하다
### 기대 값, 표준편차
![기대 값, 표준편차](./image/A_comparative_study_NN_SVM_and_DT_table4.jpg)
- 섹터별로 절대 기대값을 비교해보면 금융보다 에너지, 헬스케어 섹터에서 예측 성능이 더 좋은것을 볼 수 있다.
### 조건부 기대 값, 표준편차
![조건부 기대 값, 표준편차](./image/A_comparative_study_NN_SVM_and_DT_table5.jpg)
- 예측이 실패했을 때의 조건부 절대 기대값을 비교해 보면 의사결정 트리모델에서 에너지, 헬스케어 섹터가 금융분야보다 더 잘 예측된다는 것을 알 수 있다.
### 신용평가 기관가의 유사도
![신용평가 기관가의 유사도](./image/A_comparative_study_NN_SVM_and_DT_table6.jpg)
- S&P, 무디스, 피치간 notch distance 결과를 성능의 척도로 하여 실험 결과와 유사도를 비교
- 예측모델의 성능이 기관 간 등급 합의차이 안쪽에 있다는 것을 볼 수 있다.
### 변동 구간 예측 정확도
![조건부 기대 값, 표준편차](./image/A_comparative_study_NN_SVM_and_DT_table7.jpg)
- 일반적으로 신용등급은 분기마다 크게 변하지 않음
    - 데이터셋 중 이전분기에서 변경되지 않는 경우가 90%
- 등급변동의 예측 정밀도를 측정했을 때 모델의 정확도가 전반적으로 하락하는 것을 볼 수 있다.
## 결론
- 선행연구의 네 가지 모델을 비교분석한 결과 의사결정트리 기반의 모델이 좋은 성능을 보였다.
- notch distance 측정방법은 error의 정도를 정량화 시켜 분석하는데 도움이 되었다.
- 실제 평가기관과 의사결정트리 모델의 예측결과가 유사한 notch distance를 생성한다.
- 등급변동 예측 정밀도를 높이는 추가 연구가 필요하다.

# Init Container (초기화 컨테이너)

- pod의 컨테이너가 실행되기 전에 실행되는 특수한 컨테이너
- pod가 실행되는 순서가 있을 경우 init container를 사용해서 순서를 만들 수 있음
- 여러 개의 init container를 설정 할 수 있으며 이전 init container가 실패할 경우 다음 init container는 실행되지 않음
- yaml의 container spec에 배열로 명시함

## Init Container 사용해보기

1. Init Container 설정
   
   - 기존에 갖고 있던 nonstop-server-deployment.yaml 파일에 아래 설정을 추가함
  
   - https://github.com/tndyd5390/nonstop-server/blob/master/nonstop-server-service.yaml
   - 아래와 같이 설정할 경우 clusterip-service에 curl 요청을 보내서 응답을 받을때 까지 pod를 재시작함

        <img width="258" alt="스크린샷 2021-08-25 오후 5 14 42" src="https://user-images.githubusercontent.com/24540286/130753816-c61fecb0-3158-4abd-9039-6ec79c0e4066.png">


2. pod 시작

    - pod 시작 후 상태를 살펴보면 status에 Init: 부분에 에러가 발생한 것을 확인 할 수 있음
    - 아직 clusterip-service가 생성되지 않았기 때문

        ![image](https://user-images.githubusercontent.com/24540286/130756045-eb474ea8-0b40-4ecc-9168-31cab5c7f976.png)

3. clusterip-service 시작

    - clusterip-service를 시작했지만 아직 Init: 에러가 사라지지 않았음
    - 제대로된 응답을 못받았기 때문

        ![image](https://user-images.githubusercontent.com/24540286/130756424-274f8fe5-de41-485c-88ab-e45172ece48a.png)

4. 제대로된 응답을 줄 수 있는 pod 시작

    - 응답을 줄 수 있는 server-pod가 실행 된 후 기존의 Init: 에러가 사라지고 pod가 시작됐음
    - server-pod가 생성되고 2분 정도 지난 시점에 정상적으로 작동했음(생각보다 오래 걸림)

        <img width="614" alt="스크린샷 2021-08-25 오후 5 34 38" src="https://user-images.githubusercontent.com/24540286/130757194-1cf055ba-7d76-42c0-be32-8b3f57d912f1.png">

## 결론
생각보다 pod 재시작에 시간이 많이 소요되나 잘만 사용하면 msa 컴포넌트들의 실행 순서를 지정할수 있음
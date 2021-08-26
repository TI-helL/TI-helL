# ArgoCD Simple Example

1. create new application
- create application 버튼을 클릭하셔 새로은 application을 생성한다.
![스크린샷 2021-08-24 오후 1 38 31](https://user-images.githubusercontent.com/24540286/130928669-988c5c52-d594-462c-8e80-372c6f8173a9.png)

2. application 설정

- 아래 사진과 같이 application을 설정한다(일단은 각 체크박스가 어떤 동작을 하는지 모르니 다 체크해주자)
![스크린샷 2021-08-24 오후 2 27 30](https://user-images.githubusercontent.com/24540286/130928334-b188df10-8499-4e2b-8fbe-4610f3b4ca4b.png)

3. ArgoCD가 바라볼 github repository 설정
- 아래 사진과 같이 argocd가 바라볼 github repository를 지정하고 Branch는 HEAD, path는 github repository 안에 있는 경로를 지정
![스크린샷 2021-08-24 오후 2 28 02](https://user-images.githubusercontent.com/24540286/130928345-24783388-4865-4a5e-b1ee-9a9053eec3d4.png)

4. argocd가 동작항 k8s 클러스터 지정(자동으로 지정되어 있음)
![스크린샷 2021-08-24 오후 2 28 17](https://user-images.githubusercontent.com/24540286/130928354-a64a32cc-5dcd-46ee-ae2e-7ca31dbbc105.png)


5. application 생성 완료
![스크린샷 2021-08-24 오후 2 28 30](https://user-images.githubusercontent.com/24540286/130928363-182a0829-b51b-44a7-8f95-98220aed16a3.png)

6. 생성 완료후의 application의 모습(꽤나 이쁜 ui를 제공한다)
![스크린샷 2021-08-24 오후 2 28 40](https://user-images.githubusercontent.com/24540286/130928378-1fcf4560-e1fc-4c31-a74c-b47c65453876.png)


7. 고의로 context 변경
- 현재 구축되어진 guestbook deployment의 replication 개수를 1로 변경시켜보자
- 변경후 argocd 웹 ui를 확인해보면 순간적으로 sync status가 out of sync로 변한 다음 다시 replication의 수를 늘리는 것을 확인할 수 있음(너무 순간적이라 캡쳐가 어려움)
![스크린샷 2021-08-24 오후 2 34 20](https://user-images.githubusercontent.com/24540286/130928414-56139383-c28c-454f-8778-68e56c92e479.png)


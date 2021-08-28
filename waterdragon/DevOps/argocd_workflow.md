# ArgoCD Wrokflow
Spring cloud를 쿠버네티스에 적용하고 CD를 구축하는 과정에서 Spring cloud의 리소스를 순서대로 실행시킬 필요가 있어서 조사를 진행함
- 컨테이너 기반의 workflow engine
- 원하는 job을 실행할수 있고 job 간에 종속성을 추가하여 순서대로 실행 시킬 수 있음
- yaml을 사용하여 실행해야하는 job을 명시하고 etc에 workflow를 저장하여 실해함
- job의 실행단위가 컨테이너이기 때문에 고립성이 높다 -> 실행되어야 하는 job의 환경이 다를 경우 유용하게 사용할 수 있다.
- 작은일을 처리하는 job이 많아질 경우 성능에 저하가 발생할 수 있음
- 여러 job을 순서대로 실행시키는 예제
    ![image](https://user-images.githubusercontent.com/24540286/131221099-d6ad19b2-16a3-4b94-b00f-5429b1d9b4b6.png)

# 결론
ArgoCD Wrokflow는 컨테이너를 순서대로 실행시킬수 있으나 workflow에서 실행되는 컨테이너는 job의 성격의 띄고 있고 실행이 끝난다음 종료됨 Spring cloud data flow와 비슷한 개념 -> Spring cloud의 리소스를 argocd workflow를 사용하여 CD를 구축하기에는 무리가 있음
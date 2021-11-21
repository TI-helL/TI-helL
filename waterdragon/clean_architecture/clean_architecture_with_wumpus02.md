# 움퍼스 게임의 클린 아키텍쳐 02

![그림5](https://user-images.githubusercontent.com/24540286/142759832-69552cff-cdda-4bba-b5a8-70cf14f0d7ac.png)



위와 같은 움퍼스 게임의 아키텍쳐에서 Enblish, SMS, Cloud Data와 같은 변형들을 추상 API 컴포넌트가 정의하는 다형적 인터페이스를 통해 제공되고, 실제로 서비스하는 구체 컴포넌트가 해당 인터페이스를 구현한다. 예를 들어 Language는 English나 Spanish가 구현할 것이다.  
이러한 변형들을 모두 제거하고 순전히 API 컴포넌트만 표기한다면 아래 그림처럼 다이어그램을 단순화 할 수 있다. 

![그림6](https://user-images.githubusercontent.com/24540286/142759936-3658107b-7d29-407f-89ac-bf9ccd944209.png)

**위 그림의 다이어그램은 모든 화살표가 위를 향하도록 맞춰져 있다.** 그 결과 GameRules는 최 상위에 놓인다. GameRules는 최상위 수준의 정책을 가지므로 올바른 배치이다.  


# 움퍼스 게임의 클린 아키텍쳐 01
이전 [포스트에서의 움퍼스 게임](./hunt_the_wumpus.md)의 아키텍쳐는 과연 클린한가??  
예를 들어 UI에서 언어가 유일한 변경의 축은 아니다. 이 밖에도 텍스트를 주고 받는 매커니즘을 다양하게 만들고 싶을 수도 있다(shell을 사용하거나 텍스트메세지, 채팅애플리케이션). 따라서 변경의 축헤 의해 정의되는 아키텍처 경계가 잠재되어 있을수 있다. 이러한 변경사항을 고려한 아키텍쳐는 다음 그림과 같다. 

![그림8](https://user-images.githubusercontent.com/24540286/142760046-fc0caffb-2dab-4528-8c4f-2548bb0d7fc0.png)


점선으로 된 테두리는 API를 정의하는 추상컴포넌트이며 해당 API는 추상 컴포넌트 위나 아래의 컴포넌트가 구현한다.  
GaemRules는 GameRules가 정의하고 Language가 구현하는 API를 이용해 Language와 통신한다. 마찬가지로 Language는 Language가 정의하고 Text Delivery가 구현하는 API를 이용해 TextDelivery와 통신한다. **API는(구현하는 쪽이 아닌)사용하는 쪽에 정의되고 소속된다**
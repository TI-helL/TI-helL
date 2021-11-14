# 경계선 긋기
관련이 있는 것과 없는 것 사이에 선을 긋는다. GUI는 업무 규칙과는 관련이 없기 때문에 이 둘 사이에는 선이 있어야 한다. 다음 그림에서 경계선을 긋는 것을 분명하게 볼 수 있다. 

![그림2](https://user-images.githubusercontent.com/24540286/140641707-ecacab45-2e44-426a-ab04-7aac5f8cc163.png)

BusinessRules는 Database Interface를 사용하여 데이터를 로드하고 저장한다. DatabaseAccess는 DatabaseInterface를 구현하며, Database를 실제로 조작하는 일을 한다.  
실제 어플리케이션에서는 업무규칙, 데이터베이스 인터페이스와 관련된 수많은 클래스가 있을 수 있지만 위 그림에서는 상징적으로 표현한다.  
그렇다면 경계선은 어디에 있는가? 경계선은 상속 관계를 횡단하면서 DatabaseInterface바로 아래에 그어진다.

![그림3](https://user-images.githubusercontent.com/24540286/140641783-c3e2a1f2-9bb2-4fea-b488-47aa1ddf185c.png)


DatabaseAccess에서 출발하는 두 화살표에 집중해야 한다. 이들 두 화살표는 DatabaseAccess 클래스로부터 바깥쪽으로 향한다. 즉 이 그림에서 DatabaseAccess가 존재한다는 사실을 알고 있는 클래스는 없다. 이 경계선을 컴포넌트 다이어그램에서 표현하면 다음과 같다.

![그림1](https://user-images.githubusercontent.com/24540286/140641836-4a2e9ed3-5816-476e-92a9-5dac08bc8af5.png)

화살표의 방향에 주목해야한다. Database는 BusinessRules에 대해 알고 있다. BusinessRules는 Database에 관해 알지 못한다.  
이 선의 방향이 중요하다. BusinessRules에게 있어 Database 는 문제가 되지 않지만, Database는 BusinessRules 없이는 존재할 수가 없다. 

**Database는 다양한 구현체로 교체될수 있으며 BusinessRules는 조금도 개의치 않는다.**  
데이터베이스의 종류는 다양하고 플랫파일로도 구현할 수가 있다. 이 같은 사실은 데이터베이스에 대한 결정을 최대한 연기할 수 있게 도와준다. 

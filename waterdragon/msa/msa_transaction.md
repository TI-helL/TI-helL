# MSA에서 트랜잭션을 처리하려면

## MSA란
기존의 하나의 서버에서 동작하던 애플리케이션을 **"small services, each running in its own processt(스스로 동작하는 작은 서비스), independently deployable(독립적 배포 가능)"** 한 구조로 변경 한것

![image](https://user-images.githubusercontent.com/24540286/130413448-0643c3f6-8885-4e5d-a7cc-928e93ddaed8.png)

이와 같은 구조를 가질 경우 각각의 도메인에 대한 독립적인 데이터베이스를 가지게 된다. 기존에는 하나의 데이터베이스를 사용했기 때문에 RDBMS에서 Transaction 처리가 가능했지만 데이터베이스가 나뉘어 지면서 Transaction 처리에 어려움이 있다. 이를 해결하기 위한 방법으로 **TCC(Try, Confirm, Cancle)** 와  SAGA 패턴이 있음

## TCC(Try, Confirm, Cancle)
TCC의 기본 동작 방식은 다음과 같다.
![image](https://user-images.githubusercontent.com/24540286/130414312-39bb21d1-5aa2-4408-91d1-5723df46aacb.png)

TCC는 여러개의 REST API 호출을 시도하고 전부 commit 하거나 rollback 하는 기능을 제공한다.
Java에서는 TccRestAdapter을 사용하여 구현할 수 있다.

## SAGA
SAGA 패턴은 SEC(Saga Execution Coordinator)에서 로컬 트랜잭션을 관리해주는 방식으로 중앙의 SEC 노드가 추가로 필요하다

MSA는 fault tolerance하며 scalable한 장점이 있으나 구현에 복잡도가 올라가는 단점을 가지고 있다.

클라우드 컴퓨팅 구현기술의 저자인 김형준 개발자는 다음과 같이 얘기 했다.
![image](https://user-images.githubusercontent.com/24540286/130415632-5397e354-434c-454c-bdab-16d01dffd0a4.png)

## 결론
가장 심플한 방법은 트랜젝션을 포기하는것

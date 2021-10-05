# 네티 등장 배경 주절주절

## Netty?

이미 Java 의 네트워크 Transport layer 쪽에서는 매우 유명하다. </br>
나는 TCP 로 실시간 통신할 때만 쓰는 건줄 알았더니 HTTP, UDP 등등 사실 상 byte 단위로 송/수신 할 때 두루두루 쓰이는 프레임 워크이다. </br>
자바에서는 지원한지 은근히 오래됐다. Java5 때부터 지원했다고.. </br>

내부 구현은 Java N/IO 로 되어있고, 플랫폼(.NET 같은..) 에 따라 Epoll 같은 것들이 추가로 소켓을 사용할 수 있도록 구현되어 있다.


![img1 daumcdn-2](https://user-images.githubusercontent.com/45758481/135751210-c98dd2db-ed82-404f-a342-94c41f57ebc3.jpg)


대충 그림으로만 봤다. 내가 궁금한건 기존 네트워크 통신방식에 뭐가 부족했길래 이런게 나왔냐다.

## 자바의 네트워킹 

![img1 daumcdn-1](https://user-images.githubusercontent.com/45758481/135750344-4bcfebe6-7c72-47c9-b204-9d25dcf42162.jpg)

자바로 통신을 하게 된다면 다음과 같은 시퀀스로 로직을 개발 하게 된다. </br>
학부 수준에서 배울 때 가장 많이 구현 해 봤고, 가장 기초적이며, 가장 구식이다. </br>

하나의 클라이언트가 Connection 을 가지게 되면, 서버에서는 `accept()` 를 call 하고, 그 리턴으로 클라이언트 소켓이 반환이 된다. </br>
이 소켓을 가지고 I/O 를 지속적으로 감시하면서 어떤 데이터가 들어오는지 계속 확인해야 한다.  </br>

그러려면 기본적으로 하나의 클라이언트마다 하나의 쓰레드를 할당해서 관리해야 한다. </br>
근데 이런 방식은 연결이 10만개쯤만 돼도 서버에 부하가 된다. </br>

그도 그럴 것이 (1)여러 스레드가 입/출력을 기다리면서 무한정 대기를 타야하고, </br>
(2) 각 스레드에 메모리를 할당해야 하는데, 메모리 스택 영역을 많이 먹게 된다. </br>
왜냐하면 스레드마다 독립적인 스택 영역을 가지기 때문이다. </br> 
스레드와 관련 된 메모리 영역은 [여기](https://github.com/TI-helL/TI-helL/blob/main/heejj723/cs/operating-system/memory-structure.md) 를 참고해보자.

게다가 그 커넥션이 자주 일어나고, 자주 끊긴다면, `Context-switching` 의 비용이 기하급수적으로 커지게 되고, 이를 개선하기 위해 `Java N/IO` 가 등장하게 된다.

두둥.

## Java N/IO

`JDK 1.4` 부터 Java N/IO 가 등장한다. </br>

![img1 daumcdn-2](https://user-images.githubusercontent.com/45758481/135750647-bfc1edda-609e-4ca0-89b2-d3b7d51736c3.png)

여기서 핵심은 **클라이언트마다 스레드를 생성하지 않아도 된다** 라는 것이다. </br>
`Channel` 이라는 애랑, `Selector` 라는 중요한 컴포넌트가 생긴다. </br>

`Channel` 은 이벤트(데이터) 가 들어오는 파이프라인이라고 보면 되고, 각 채널은 `key` 를 가지고 있다. </br>
여기서 `Selector` 라는 클래스가 가지고있는 키 집합에 대한 I/O 이벤트를 감시하고 있으며, 각 채널의 이벤트를 감지하여 `논 블라킹` 하게 동작한다. </br>

```java
            // selector open
            final Selector selector = Selector.open();
            final ServerSocketChannel server = ServerSocketChannel.open();
            final InetSocketAddress addr = new InetSocketAddress(9000);

            // register server on selector
            server.bind(addr);
            server.configureBlocking(false);
            server.register(selector, SelectionKey.OP_ACCEPT);

            while (true) {

                // 대기중인 소캣 채널들 알아내기.
                selector.select();
                Set<SelectionKey> selectedKeys = selector.selectedKeys();
                Iterator<SelectionKey> it = selectedKeys.iterator();

                while (it.hasNext()) {
                    SelectionKey key = it.next();

                    if (key.isAcceptable()) {
                    
                    }
                }
            }
```

거의 2년 전 코드 우려먹었다. </br>
위 코드처럼 `Selector` 를 오픈하고, 서버 소켓에 대한 `configureBlocking()` 옵션을 `false` 로 주게 되면 논 블라킹으로 동작한다. </br>
`while(true)` 안에서 소켓 채널들의 이벤트를 감시하고, 이벤트가 감지되면 `selector.select()` 가 리턴된다. </br>

그런데 이렇게 동작하면 문제점이 있다. 이제 커넥션마다 스레드를 생성하지 않아도 되어서 메모리를 많이 아낄테지만, </br>
하나의 스레드에서 모든 커넥션 관리를 다 해야 한다. </br>

CPU 가 하나만 동작한다는 뜻. </br>
코어 수가 늘어날 수록 Java N/IO 는 비효율 적일 수도 있다. </br>

멋진 개발자라면 이런 생각을 할 수도 있다. </br>

### 그러면 커넥션 관리는 싱글 스레드로 하고, 이벤트 Read/Write 는 멀티 스레드로 하면 되잖아?

안된다고 한다. 정상적인 케이스라면 사실 커넥션 관리보다는 Packet read/write 가 많을 것이다.</br>
그걸 또 스레드로 해결하려고 하면 I/O 개수 만큼 스레드를 생성/소멸 할텐데 비용이 많이 든다.</br>
그리고 매번 그걸 개발자가 구현해야 하는 수고로움까지.. </br>

그래서 네티가 등장하게 된다. </br>

두둥. </br>

## Netty (수미 상관 구조)

맨 처음 봤던 그림을 다시 한번 보자.

![img1 daumcdn-2](https://user-images.githubusercontent.com/45758481/135751227-68880215-8c5f-4944-9a08-aedf72e2fe6a.jpg)


이제 비로소 이해 할 수 있게 된다. </br>

총 3개의 파트로 나뉜다.

1. 새로운 커넥션을 관리하는 Thread Pool
2. CPU 를 효율적으로 활용하기 위한 `non-blocking logic` 을 사용하는 워커 쓰레드 그룹
3. 데이터 동기화가 반드시 필요한 부분을 위한 `blocking logic` 을 사용하는 이벤트 실행 그룹

3번에서는 Incoming data 는 `Inbound Handler`, Outgoing 데이터는 `Outbound Handler` 에서 처리하도록 되어 있다.


## 결론

네티를 많이 쓰니까, 편하니까, 그냥 무작정 공부 하는 것 보다는 해당 기술이 왜 나왔는지 이해 하게 되면 공부에 더욱 동기부여가 되는 것 같다. </br>

끝.




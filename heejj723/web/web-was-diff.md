# WAS 와 Web Server

![webserver-vs-was1](https://user-images.githubusercontent.com/45758481/138585995-e74151ae-8fd8-4f01-a242-4e40f7b0d789.png)

## 웹서버

웹서버는 클라이언트로부터 요청을 받아서 정적인 컨텐츠를 내려준다.
혹은 HTTP 프로토콜을 기반으로 하여 클라이언트(웹 브라우저 또는 웹 크롤러)의 요청을 서비스 하는 기능을 담당한다.

기능 1)
- 정적인 컨텐츠 제공
- WAS를 거치지 않고 바로 자원을 제공한다.
기능 2)
- 동적인 컨텐츠 제공을 위한 요청 전달
- HTTP 형태로 Request 와 Response 를 주고 받을 수 있다.
- 클라이언트의 요청(Request)을 WAS에 보내고, WAS가 처리한 결과를 클라이언트에게 전달(응답, Response)한다.


## WAS
- DB 조회나 다양한 로직 처리를 요구하는 동적인 컨텐츠를 제공하기 위해 만들어진 Application Server
- 웹 컨테이너, `서블릿 컨테이너` 라고도 말한다.

`WAS = Web Server + Web Container`

### WAS 의 기능
- DB 접속 가능
- 트랜잭션 관리 가능
- 비즈니스 로직 수행
- Tomcat 등

즉 Spring boot 에 톰캣이 내장 되어 있다는 말은, Spring boot 자체로 Web Server + WAS 의 역학을 할 수 있다는 것이다. 


## WebServer 만 있으면 안되는 이유?
- WebServer 는 오직 정적인 컨텐츠만 내려줄 수 있다.
- 따라서 DB 를 조회해서 페이지를 다르게 내려주는 등의 행동을할 수 없다.
- 오로지 파일 서버에 저장 된 html 페이지 만을 내려주는 역할을 할 수 있다는 것. 


## WebServer 아키텍처는 여러가지가 있을 수 있다.
1. Client -> Web Server -> DB
2. Client -> WAS -> DB
3. Client -> Web Server -> WAS -> DB


3번 구조가 중요한데 일단 사진으로 보자.

![web-service-architecture](https://user-images.githubusercontent.com/45758481/138586126-c1d93a32-771e-4a74-8f62-b782f8151d60.png)

### 웹서버 운용 과정

1. 클라이언트는 웹서버로 HTTP Request 를 보낸다.
2. WebServer 는 WAS 로 HttpRequest 를 그대로 전달한다.
3. WAS 는 관련 된 서블릿을 생성하여 메모리에 올린다. 
  3-1. 이 서블릿은 자바 API 형식으로 되어있다.
  3-2. 서블릿이 호출하는 DBMS API 를 통해서 DB와 커넥션을 맺고 통신을 주고 받을 수 있다.
4. WAS 는 메모리에 올라간 서블릿에 대한 쓰레드를 생성한다.
5. WAS 는 HttpRequest 와 관련된 `HttpServletRequest` 를 생성하여 Servlet 에 전달한다.
  5-1. Thread는 Servlet의 service() 메서드를 호출한다.
  5-2. service() 메서드는 요청에 맞게 doGet() 또는 doPost() 메서드를 호출한다.
  ```java
  protected doGet(HttpServletRequest request, HttpServletResponse response)
  ```
  이렇게 생겼다.
  5-3. 
6. `doGet()` 은 DB와 통신하여 만든 데이터 혹은 동적 페이지를 WAS 에 리턴한다.
7. WAS: `HttpServletResponse` -> `HttpResponse` -> WebServer 에 전달
8. Thread 를 종료하고, `HttpServletResponse` 를 제거한다.

### 궁금증 1. 왜 Web Server 에서 바로 HttpRequest 를 WAS 로 전달하지 않고 HttpServletRequest 를 생성할까?

<img width="687" alt="스크린샷 2021-10-24 오후 5 33 21" src="https://user-images.githubusercontent.com/45758481/138586538-b7a2bd1a-0dbc-4aea-8be3-58022c2f4e7d.png">

HttpRequest 는 interface 형태로 되어있다. </br>
HttpServletRequest 는 그 구현체중 하나일 뿐이고, 이왜에도 DispatcherServlet 등 그 역할을 달리하는 ServletRequest 들이 많다.



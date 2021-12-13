# REST API

## API
- Application Programming Interface

## REST
- Representational State Transfer
- 인터넷 상의 시스템 간의 상호 운용성(interoperability)을 제공하는 방법 중 하나
- 시스템 제각각의 **독립적인 진화**를 보장하기 위한 방법
- REST API: REST 아키텍쳐 스타일을 따르는 API

## Uniform Interface
- Identification of resources
- manipulation of resources through represenations
- self_describe messages
- hypermisa as the engine of application state(HATEOAS)

### self-descriptive message
- 메세지 스스로 메시지에 대한 설명이 가능해야 한다.
- 서버가 변해서 메시지가 변하더라도 클라이언트는 그 메시지를 보고 해석이 간으하다.
- **확장 가능한 커뮤니케이션**
- 미디어 타입을 정의하고 IANA에 등록하고 그 미디어 타입을 리소스 리턴할때 Content-Type으로 사용
- 문서의 내용을 설명하는 profile 링크 헤더를 추가한다.

### HATEOAS
- 하이퍼미디어(링크)를 통해 애플리케이션 상태 변화가 가능해야 한다.
- **링크 정보를 동적으로 바꿀수 있다**


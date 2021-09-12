# HTTP Method

HTTP는 요청 메서드를 정의하여, 주어진 리소스에 수행하길 원하는 행동을 나타낸다. 각각의 메서드는 서로 다른 의미를 구현하지만, 일부 기능은 메서드 집합 간에 서로 공유하기도 한다.

## HTTP Methods

### GET

특정 리소스의 표시를 요청한다.

### HEAD

특정 리소스의 표시를 요청하지만, 본문을 포함하지 않고 헤더만 응답한다.

### POST

특정 리소스에 엔티티를 제출할 때 사용한다.

### PUT

목적 리소스를 요청 payload로 변경한다.

### DELETE

특정 리소스를 삭제한다.

### CONNECT

목적 리소스로 식별되는 서버로의 터널링한다.

### OPTIONS

목적 리소스의 통신을 설정하는데 사용한다.

### TRACE (en-US)

목적 리소스의 경로를 따라 메시지 loop-back 테스트를 수행한다.

### PATCH

리소스의 일부분을 수정할 때 사용한다.

## Reference

* <https://developer.mozilla.org/ko/docs/Web/HTTP/Methods>

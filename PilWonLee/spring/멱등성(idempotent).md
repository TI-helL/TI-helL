# 멱등성(idempotent)

- 참고자료
    - [https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/CONNECT](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/CONNECT)
- 연산을 여러번 수행하여도 한번 수행한것과 동일한 결과를 도출하는 성질
    - f(x) = f( f(x) )
    - GET, HEAD, PUT, DELETE

- 작업 수행요청이 최소 한번 발생하도록 보장하지만 두 번 이상 발생할 수 있는 네트워크 프로토콜 설계에 자주 사용
- **멱등적 = 작업이 두번 이상 수행 되어도 결과는 한번만 수행된 것과 동일**

- POST는 생성을 당담하므로 멱등적이지 않음
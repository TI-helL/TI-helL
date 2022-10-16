# Spring 암호화

- Spring Security는 이전에 생성된 해시에서 솔트를 읽고 동일한 솔트로 입력 암호를 다시 해시수행
- 그리고 두 최종 해시를 비교하고 분명히 동일할 것입니다.
- 예시:
    - 비밀번호:test
    - 해시:
    - $2a$10$nCgoWdqJwQs9prt7X5a/2eWLn88I8pon6iNat90u4rq4mHqtoPGQy
- 해시에는 기호 로 구분된 3개의 세그먼트가 있습니다 . 2a는 Bcrypt의 버전이고 10는 총 라운드이고 nCgoWdqJwQs9prt7X5a/2e는 소금
- 따라서 스프링 보안은 암호 test와 솔트 nCgoWdqJwQs9prt7X5a/2e를 사용하여 해싱 방법을 실행합니다. 분명히 암호 및 소금 일치와 동일한 해시를 생성
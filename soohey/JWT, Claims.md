# Spring JWT 인증

## JWT
Json Web Token
- https://jwt.io/ 
- header, payload, signature로 구성
- Header
  - typ : 토큰 타입
  - arg : signature를 해싱할 알고리즘 지정
- Payload
  - Claims (이하 아래에 설명)
- Signature
  - 토큰이 유효한지 검증하기 위한 문자열
  - Header 인코딩 + Payload 인코딩한 값을 Secret Key로 해쉬값 생성
```
Date now = new Date();
Date validity = new Date(now.getTime() + validityInMilliseconds);

return Jwts.builder()
        .setHeader(makeHeader()) //Header 설정
        .setClaims(makeClaims(member, tokenType))
        .setIssuedAt(now) //생성일 설정
        .setExpiration(validity) //만료일 설정
        .signWith(headerSet()) //Signature 설정
        .compact();
```
## Header
```
Map<String, Object> header = new HashMap<>();
header.put("typ", "JWT");
header.put("alg", "HS256");
```


## Claims
- payload에 들어가는 정보 조각
- key, value 값으로 저장하여 jwt에 담아 전송
- Registered Claim 
  - subject(제목), issuedAt(발행일), expirationTime(만료일)
- Public Claim 
- Private Claim 
  - 클라이언트-서버간의 통신되는 정보
  - put(key, value)으로 정보 저장    
  - key값 충돌이 발생할 수명있음
  - 충돌방지용 네임 스페이스 : https://www.iana.org/assignments/jwt/jwt.xhtml

```
Claims claims = Jwts.claims()
                .setSubject(tokenType)
                .setIssuedAt(now); //생성일 설정
                .setExpiration(validity); //만료일 설정
claims.put("email", member.getEmail());
```
## Signature
```
Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
```
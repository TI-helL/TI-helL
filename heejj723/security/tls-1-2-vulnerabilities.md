# TLS1.2 취약성 조사

1. 키 교환 알고리즘 & PFS

![img1 daumcdn](https://user-images.githubusercontent.com/45758481/133556417-ab83af2e-42bf-40a9-a926-5c42e6fe5818.png)


    1. 1.2 에서는 PFS 보장 안함

2. 인증
    1. 2048 bit 의 키 길이를 지원하는 RSA 와 비교해서 1024 bit 라는 짧은 키를 사용하는 DSA 는 TLS 1.3 에서 삭제되었다
    - **DSA** (Digital Signature Algorithm, 디지털 서명 알고리즘)
    - **EdDSA** (Edwards-curve Digital Signature Algorithm, 에드워드 곡선 디지털 서명 알고리즘)
    - **ECDSA** (Elliptic Curve Digital Signature Algorithm, 타원 곡선 디지털 서명 알고리즘)

1. 암호화 알고리즘 관련
    1. TLS1.3 에서는 취약한 암호화 알고리즘 지원 중단
        1. SHA-1
        2. DES/3DES
        3. AES-CBC
        4. MD5
        5. RC4

2. Handshake
    1. TLS1.3 에서는 인증서까지 암호화
    2. 1-RTT, 0-RTT 지원
    3. 첫 Handshake 완료 후 서버와 클라이언트에 공유된 암호 키(PSK)를 로컬에 저장하는데, 이 PSK를 통해 이전에 방문한 사이트로 첫 번째 메시지의 메시지를 전송하여 Handshake 과정 없이 바로 연결이 가능하다.

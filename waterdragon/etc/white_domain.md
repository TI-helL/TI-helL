# white domain

비밀번호 재설정 기능 구현중 사용자에게 메일을 발송하는 기능을 개발하게 됨
현재 airi.kr 도메인으로 사용자에게 메일을 전송할 경우 스팸메일로 분류 됨
위와 같은 상황을 방지하기 위해서는 kisa의 white domain에 등록을 해야함

- 정상적으로 발송하는 대량 이메일이 RBL이력으로 간주되어 차단되는 것을 방지하기 위하여, 사전에 등록된 개인이나 사업자에 한하여 국내 주요 포탈사이트로의 이메일 전송을 보장해주는 제도

## 등록 방법
1. https://spam.kisa.or.kr/white/sub4.do 에 접속하여 SPF(Sender Policy Framework) 레코드 확인
2. DNS 서버에 접속하여 SPF 레코드 추가 https://customer.gabia.com/manual/domain/287/1201
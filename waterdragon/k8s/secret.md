# Secret
secret은 비밀번호, OAuth 토근, SSH 키 같은 민감한 정보들을 저장하는 용도로 사용한다. 이런 정보들은 컨테이너 안에 저장하지 않고 별도로 보관하다가 실제 파드를 실행할때 템프릿으로 컨테이너에게 제공한다.

## username과 password를 secret로 저장하기

- username 암호화
  > $ echo username | base64<br>
  > dXNlcm5hbWUK

- password 암호화
  > $ echo password | base64
  > cGFzc3dvcmQK

- secret.yaml
  ```yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: user-pass
  type: Opaque
  data:
    username: dXNlcm5hbWUK
    password: cGFzc3dvcmQK
  ```

- secret 생성
  > kubectl apply -f secret.yaml

## 환경 변수로 secret 사용하기

```yaml
env:
- name: SECRET_USERNAME
  valueFrom:
    secretKeyRef:
      name: user-pass
      key: username
- name: SECRET_PASSWORD
  valueFrom:
    secretKeyRef:
      name: user-pass
      key: password   
```
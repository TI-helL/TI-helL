# @Transactional 태그 안에서 Exception Handling 시 유의 할 점 

## 컨텍스트 설명
### 1. 요구사항
로그인이 실패할 때마다 그 횟수를 세고, 틀린 횟수가 5가 될 경우 계정을 잠금처리 해주세요

### 2. 내 접근법
로그인 시 비밀번호가 틀렸을 경우 member table 의 특정 필드를 +1 해주고, 그 필드 값이 5와 같을 경우 Exception 을 던지자

### 3. 마주친 문제

기존 코드는 이랬다.

```
@Service
public class AuthService {

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public UserProj authenticate(String emailAddress, String password) {
    UserProj authenticatedUser;
    
    Member member = memberRepository.findByEmailAddress(emailAddress).orElseThrow(
        () -> new AuthException(ErrorCode.Member_NOT_EXIST));

    // 여기서 비밀번호가 맞지 않으면 exception 을 발생시킴.
    if (!passwordEncoder.matches(requestPassWord, member.getPassword())) {
      throw new AuthException(ErrorCode.PASSWORD_NO_MATCH));
    }
     
    return authenticatedUser;
  }
}
```

여느 로그인 관련 로직이 그렇듯, 기존 로그인에서 일어나는 트랜잭션은 READ 만 존재했다.
그래서 트랜잭션 중간ㄴ에 Exception 이 걸리더라도 테이블의 값을 변경한 것이 아니기 때문에 전혀 상관이 없었다.

근데 이번 기능 추가할 때는 해당 함수의 트랜잭션 한번에 READ 와 Write 를 동시에 해야 했다.

```
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public UserProj authenticate(String emailAddress, String password) {
    UserProj authenticatedUser;
    
    Member member = memberRepository.findByEmailAddress(emailAddress).orElseThrow(
        () -> new AuthException(ErrorCode.Member_NOT_EXIST));

    // 쓰기 트랜잭션 중간에 예외를 던진다.
    if (!passwordEncoder.matches(requestPassWord, member.getPassword())) {
      Integer newCount = member.getWrongPasswordAttemptCount()+1;
      member.setWrongPasswordAttemptCount(newCount);
      if (newCount.equals(5)) {
        member.setServiceUseStatus(ServiceUseStatus.SUSPENSION);
      }
      memberRepository.save(planner);
      throw new AuthException(ErrorCode.PASSWORD_NO_MATCH));
    }
     
    return authenticatedUser;
  }

```

참고로 AuthException 은 java RuntimeException 을 상속하고 있다.

newCount == 5 가 되는 시점에는, 트랜잭션 중간에 예외를 던져버리기 때문에 다섯번째로 비밀번호가 틀렸을때는 데이터가 변하지 않는다.
트랜잭션 중간에 RuntimeException 이 던져지게 되면 트랜잭션이 롤백이 되기 때문이다.

---

### 여기서 자바 Exception 종류를 알고가자.

Java 에는 `Checked Exception` 과 `Unchecked Exception` 이 존재한다.
| |Checked|Unchecked|
|------|---|---|
|예외 처리|필수|필수 아님|
|트랜잭션 롤백|안됨|디폴트가 True|
|검증|컴파일 단계|런타임 단계|

---

### 4. 그래서 어떻게 해결?

해결 방법은 두가지가 있다.

1. `repository.save(entity)` 를 한 뒤, 트랜잭션의 커밋이 완료되었을 때 Exception 을 발생시킨다.
2. 트랜잭션 중간에 또 다른 트랜잭션을 열어서, 그 안에서 `save(entity)` 를 수행하고, commit 한 뒤, 바깥쪽 트랜잭션에서 Exception 발생

사실 나는 1번으로 해결했는데, 2번 방법도 있다. (이건 나중에)


```
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public UserProj authenticate(String emailAddress, String password) {
    .
    .
    .
      
      // TransactionSynchroniazation 의 afterCommit 을 오버라이딩 하여, 트랜잭션 커밋 이후의 동작을 정의함
      TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization(){
        @Override
        public void afterCommit() {
          if (newCount.equals(5)) throw new AuthException(ErrorCode.MEMBER_SUSPENDED_ERROR);
          throw new WrongPasswordException(ErrorCode.PASSWORD_INVALID_ERROR);
        }
      });
    }
    .
    .
  }

```

`TransactionSynchronization.afterCommit()` 을 이용하여 커밋 이후의 동작을 정의했다.
이렇게하면 트랜잭션이 끝난 후에 `RuntimeException`을 던지기 때문에 트랜잭션은 롤백되지 않는다.

** 참고
`afterCommit()` 관련 코드는 `AbstractPlatformTransactionManager.processCommit()` 에서 찾아볼 수 있다.
![스크린샷 2021-08-26 오후 11 47 08](https://user-images.githubusercontent.com/45758481/130984591-beed219b-9091-42f4-8c4c-864e1393ddea.png)


---

### 트랜잭션 안에서 새로운 트랜잭션을 열 때 주의 사항 

`@Transactional` 의 기본 `propagation behavior` 은 `PROPAGATION_REQUIRED` 이다.
이 옵션을 사용하면, 트랜잭션 안에서 또다른 트랜잭션을 열려고 시도할 경우, 새로운 트랜잭션이 아니라 기존 트랜잭션에 참여하게 된다.
이로인해 발생하는 문제는, 안쪽 트랜잭션이 롤백되면 바깥쪽 트랜잭션도 롤백된다는 것이다.
코드상으로 분리되어 보이는 두 트랜잭션이 사실 하나이기 때문이다.

이를 해결하려면 `PROPAGATION_REQUIRED_NEW` 옵션을 사용하면 된다.


## 결론
트랜잭션 동작을 예측하고 잘 컨트롤 하는 것이 예기치 못한 장애 발생을 방지할 수 있을 듯 하다 

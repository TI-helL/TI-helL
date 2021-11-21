# 빌더 패턴
- JPA이용 시 엔티티 객체들을 빌더 패턴 기반으로 생성해 주는 것이 일반적이다
- 롬복에서는 객체의 인스턴스를 안전하게 생성하기 위한 빌더 어노테이션을 제공한다
- 빌더 어노테이션을 이용하면 빌더 클래스를 생성해준다
## 빌더 패턴을 이용하는 장점
- 인자가 많을 경우 쉽고 안전하게 객체를 생성할 수 있다
- 인자의 순서와 상관없이 객체를 생성 할 수 있다.
- 적절한 이름을 부여하여 가독성을 높을 수 있다.
## 단점
- DB의 컬룸이 not null 인 경우 빌더패턴 자체에서는 null 인지 체크를 하지 않는다.
- 그래서 빌더패턴 생성 시 , test 코드에서 not null 컬룸의 null 여부를 체크해 주어야 한다
## 안전한 빌더패턴 사용 예
```java
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {
  @NotEmpty @Column(name = "bank_name", nullable = false)
  private String bankName;
  @NotEmpty @Column(name = "account_number", nullable = false)
  private String accountNumber;
  @NotEmpty @Column(name = "account_holder", nullable = false)
  private String accountHolder;
  // 불안전한 객채 생성 패턴
  @Builder
  public Account(String bankName, String accountNumber, String accountHolder) {
    this.bankName = bankName;
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
  }
  // 안전한 객채 생성 패턴
  @Builder
  public Account(String bankName, String accountNumber, String accountHolder) {
    Assert.hasText(bankName, "bankName must not be empty");
    Assert.hasText(accountNumber, "accountNumber must not be empty");
    Assert.hasText(accountHolder, "accountHolder must not be empty");
    this.bankName = bankName;
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
  }
}
```
빌더 패턴 방어 테스트 코드
```java
public class AccountTest {
  @Test(expected = IllegalArgumentException.class)
  public void Account_accountHolder_비어있으면_exception() {
    Account.builder()
        .accountHolder("")
        .accountNumber("110-22345-22345")
        .bankName("신한은행")
        .build();
  }
  @Test(expected = IllegalArgumentException.class)
  public void Account_accountNumber_비어있으면_exception() {
    Account.builder()
        .accountHolder("홍길동")
        .accountNumber("")
        .bankName("신한은행")
        .build();
  }
  @Test(expected = IllegalArgumentException.class)
  public void Account_bankName_비어있으면_exception() {
    Account.builder()
        .accountHolder("홍길동")
        .accountNumber("110-22345-22345")
        .bankName("")
        .build();
  }
  @Test
  public void Account_test() {
    final Account address = Account.builder()
        .accountHolder("홍길동")
        .accountNumber("110-22345-22345")
        .bankName("신한은행")
        .build();
    assertThat(address.getAccountHolder()).isEqualTo("홍길동");
    assertThat(address.getAccountNumber()).isEqualTo("110-22345-22345");
    assertThat(address.getBankName()).isEqualTo("신한은행");
  }
}
```
# JPA 양방향 연관관계와 관계의 주인



JPA 에서 양방향 연관관계는 엔티티와 엔티티가 서로를 통해 접근할 수 있다는 것을 의미한다.
</br>
팀과 멤버가 1:N 양방향 연관관계를 맺고 있다고 생각해보자.</br>

## Member
```java
@Entity
public class Member {

    @Id
    @Column(name = "MEMBER_ID")
    @GeneratedValue
    private String id;

    private String username;

    @ManyToOne
    private Team team;

    //연관관계 설정
    public void setTeam(Team team) {
        this.team = team;
    }
}
```

Member Entity 안의 `setTeam(Team team)` 메소드를 통해 연관관계를 설정할 수 있다.

## Team

```java
@Entity
public class Team {

    @Id
    @Column(name = "TEAM_ID")
    @GeneratedValue
    private String id;

    private String name;

    // 연관관계 매핑
    @OneToMany(mappedBy = "team")
    private List<Member> members = new ArrayList<Member>();

    public void add(Member member) {
      this.getMembers().add(member);
    }
}
```

이 때 `mappedBy` 옵션으로 관계의 주인을 설정한다. 
</br>
데이터 베이스에서 외래키를 가지고 있는 테이블은 `member` 라는 것을 명시하는 것이다.
</br>
`mappedBy` 는 객체 필드의 반대쪽 매핑의 필드 이름을 값으로 주면 된다.
</br>
`List<Member>` 의 반대쪽 매핑읜 `Team` 이므로 "team" 이라고 명시한다.
</br>

---
## 연관관계의 주인

이 때 양방향 연관관계의 주인이 곧 외래키를 가지고 있다고 했다. </br>
이 때 주의할 점이 몇가지 있다.
- 주인이 아닌 쪽은 `Read Only` 이다.
- 항상 '다(N)' 쪽이 연관관계의 주인이 된다.
- `@ManyToOne` 이 연관관계의 주인 이므로 `mappedBy` 속성이 없다.

---

## 이 테스트는 예상대로 동작할까?

```java
public class addMemberTest {
  @Autowired
  MemberRepository memberRepository;
  
  @Autowired
  TeamRepository teamRepository;
  
  @Test
  void contextLoad() {
    Team team = new Team();
    team.setName("개발팀");
    teamRepository.save(team);
    
    Member member = new Member;
    member.setUserName("joyjet");
    
    team.add(member);
    memberRepository.save(member);
  }
}
```
이 테스트 코드는 간단하게 team 객체를 생성하여 저장하고, </br>
그 team 객체와 연관관계를 맺은 member 객체를 저장하는 코드이다.

예상 동작은, team 이라는 데이터가 생성된 후 member 의 외래키 필드에 team 의 id 값이 자동으로 삽입되어야 할 것이다.

### 그러나 실제 결과는 연관관계가 매핑되지 않아 member 의 teamId(외래키) 필드가 null 이다.

이 이유는 team 의 `add(Memer member)` 메서드에 관계의 주인이 아닌 객체의 동작만 명시되어 있기 때문이다.
</br>
따라서 add 메서드는 이렇게 변경되어야 한다.

```java
    public void add(Member member) {
      // 양방향 매핑의 주인인 member 의 동작을 명시한다.
      members.setTeam(this);
      // 이 동작은 db에 반영이 안된다.
      this.getMembers().add(member);
    }
```

- team 에 member 를 추가하는 과정은 db에 반영이 안된다. </br>
- 그러나 반드시 해준다. </br>
- 객체들이 양방향 매핑이 되기 때문에 객체의 관계를 표현하기 위해서이다.

# top level class? nested level class?

하이버네이트 관련 게시글을 읽다가 Entity는 반드시 top-level 클래스여야 한다는 구문이 보여서 찾아본 결과,,,

<br>

`top level class`: nested class가 아닌 클래스

`nested class`: 다른 인터페이스나 클래스 내에 선언된 클래스

라고 한다.

<br>

그러니 Entity는 반드시 top-level 클래스여야 한다는 것은 아래 예시의 Phone 클래스와 같은 nested class는 Entity로 사용하지 못한다는 것!

```java
public class User {
    private Long assetId;
    private String assetName;
    private int assetPrice;

		@Entity
		class Phone {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
			private Long phoneId;
	    @Column(name = "asset_name", nullable = false)
			private String phoneType;
	    @Column(name = "asset_price", nullable = false)
			private String phoneNumber;
		}
}
```

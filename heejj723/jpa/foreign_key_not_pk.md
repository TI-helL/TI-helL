# Primary Key 가 아닌 필드를 참조하는 Foreign Key 를 만들때

### @JoinColumn(referencedColumnName = [참조하는 필드 이름])

## 오류 상황

Stock 이라는 주식 이름 테이블과 DailyStock 이라는 일일 주가 데이터 필드의 일대다(1:N) 매칭 시 일어난 문제이다.

DailyStock 은 Stock 의 `tickerSymbol` 이라는 필드를 참조하고 있다.

###DailyStock
```java
@Entity(name = "daily_stock")
public class DailyStock {
	@Id
	@Getter
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "daily_stock_id")
	private Long dailyStockId;

	@Column(name = "market_id", nullable = false)
	private Long marketId;

	@ManyToOne
	@JoinColumn(name = "ticker_symbol")
	private Stock stock;
```

###Stock
```java
@Entity(name = "stock")
public class Stock implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "stock_id")
	private Long id;

	@Column(name = "ticker_symbol", unique = true, nullable = false)
	private String tickerSymbol;
```

처음에는 당연히 `@JoinColumn(name="ticker_symbol")` 이라고 했으니, Stock 의 `tickerSymbol` 항목을 참조할 거라고 생각하는데, 실제로 쿼리를 날리는 것을 관찰해보니 `stock_id` 를 참조하고 있더라.

## 해결
이를 해결하기 위해서는 `@JoinColumn` 의 `referencedColumnName` 의 값으로 참조하길 원하는 필드 이름을 넣어주면 된다.

혹은 DailyStock 테이블에 외래키로 TickerSymbol 을 넣어주면 잘 작동한다.
그러나 부득이한 경우 테이블 외래키를 설정하기 힘든 경우에는 첫번째 방법을 애용하도록 하자.

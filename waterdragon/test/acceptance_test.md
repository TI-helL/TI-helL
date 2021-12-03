# Spring boot 인수테스트의 기본 구조
인수테스트는 Spring boot 웹서버를 실행시키고 웹 서버로 부터 요청과 응답에 대한 테스트 케이스를 작성하는 테스트이다.

## DatebaseCleanup class
테스트를 실행할 때마다 데이터베이스를 비워주기 위한 서비스
```java
@Service
@ActiveProfiles("test")
public class DatabaseCleanup implements InitializingBean {

	@PersistenceContext
	private EntityManager entityManager;

	private List<String> tableNames;

	@Override
	public void afterPropertiesSet() {
		tableNames = entityManager.getMetamodel().getEntities().stream()
			.filter(e -> e.getJavaType().getAnnotation(Entity.class) != null)
			.map(e -> CaseFormat.UPPER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, e.getName()))
			.collect(Collectors.toList());
	}

	@Transactional
	public void execute() {
		entityManager.flush();
		entityManager.createNativeQuery("SET REFERENTIAL_INTEGRITY FALSE").executeUpdate();

		for (String tableName : tableNames) {
			entityManager.createNativeQuery("TRUNCATE TABLE " + tableName).executeUpdate();
		}

		entityManager.createNativeQuery("SET REFERENTIAL_INTEGRITY TRUE").executeUpdate();
	}
}
```

## AcceptanceTest class
각 도메인의 api 테스트 클래스의 부모가 될 클래스로 각 테스트 시작 전에 데이터베이스를 초기화한다.
```java
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AcceptanceTest {
	@LocalServerPort
	int port;
	@Autowired
	private DatabaseCleanup databaseCleanup;

	@BeforeEach
	public void setUp() {
		if (RestAssured.port == RestAssured.UNDEFINED_PORT) {
			RestAssured.port = port;
			databaseCleanup.afterPropertiesSet();
		}

		databaseCleanup.execute();
	}

	@AfterEach
	public void afterEach() {
		//databaseCleanup.tearDown();
	}
}
```
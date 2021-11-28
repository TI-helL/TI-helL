# lombok
- 자바 개발 시 자주 사용하는 getter, setter, 기본생성자, toString 등을 자동으로 생성해줌
- 의존성 추가
```gradle
implementation ('org.projectlombok:lombok')
```
## annotation
- @Getter
	- 선언된 모든 필드에 대해 get 매서드 생성
- @RequiredArgsConstructor
	- 선언된 모든 final 필드가 포함된 생성자를 생성
	- final이 포함되지 않는 필드는 자동으로 생성되지 않음
- @NoArgsConstructor
	- 파라메터가 없는 기본 생성자 생성
- @AllArgsConstructor
	- 모든 필드값을 파라메터로 받는 생성자 생성
- @EqualsAndHashCode
	- 두 객체의 내용이 같은지 동등성 비교 연산
	- 두 객체가 같은 객체인지 동일성 비교 연산
	- 자바 bean에서 동등성 비교를 위해선 Equals, Hashcode 매서드를 오버라이딩해야 하는데
	- 이 어노테이션은 둘다 자동으로 생성해줌
	- OPTION
	- callSuper: 부모까지 비교할지
	- onlyExplicitlyIncluded: @EqualsAndHashCode.Include 어노테이션이 붙은 필드값만을 비교
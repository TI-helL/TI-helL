# MockMVC 테스트
- @WebMvcTest를 사용하고 서비스 관련 빈이 필요할 경우
- @MockBean으로 등록해준다
## 기본 get 예제
```java
@Test
public void hello가_리턴된다() throws Exception {
  String hello = "hello";
  mvc.perform(get("/hello"))
      .andExpect(status().isOk())
      .andExpect(content().string(hello));
}
```
## queryParam get 예제
```java
@Test
public void HelloDto가_리턴된다() throws Exception {
  String name = "hello";
  int amount = 1000;
  mvc.perform(get("/hello/dto")
          .param("name", name)
          .param("amount", String.valueOf(1000)))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.name", is(name)))
      .andExpect(jsonPath("$.amount", is(amount)));
}
```
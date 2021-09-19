# @WebMvcTest

## 1. 언제 사용?

- MVC 를 위한 테스트, 컨트롤러가 예상대로 동작하는지 테스트 할 때 사용 된다.
- @WebMvcTest 를 사용 시, 아래의 어노테이션이 붙은 클래스만 스캔한다. 즉, 가벼운 테스팅이 가능하다.
- (이를 Slicing Test Annotation 이라고도 한다)
  - @Controller
  - @ControllerAdvice
  - @JsonComponent
  - @Conveter
  - @GenericConverter
  - @Filter
  - @HandlerInterceptor
  - @WebMvcConfigurer
  - @HandlerMethodArgumentREsolver



## 2. 장단점?
- 1) 장점
  - WebApp 가장 앞단의 Bean 만 등록하기 때문에 빠르다
  - 통합 테스트가 힘들 때 컨트롤러 단에서 테스트 가능하다.

- 2) 단점
  - 통합 테스트에서 제대로 동작 안할 수도 있다.


## 3. 예제
```java
@WebMvcTest
@RunWith(SpringRunner.class)
public class EventControllerTests {

    @Autowired
    MockMvc mockMvc;
    
    @Autowired
    ObjectMapper objectMapper;

<!--  Repository 를 MockBean 으로 등록하여 가짜로 만든다.
      이 때 MockBean 으로 등록 된 객체의 메소드는 모두 Null 을 반환한다. -->
    @MockBean
    EventRepository eventRepository;

    @Test
    public void createEvent() throws Exception {
        // given

<!--  테스트를 위한 Event 객체를 builder 로 생성한다 -->
        Event event = Event.builder()
            .name("Spring")
            .description("Spring test")
            .beginEnrollmentDateTime(LocalDateTime.of(2021, 11, 23, 14, 21))
            .closeEnrollmentDateTime(LocalDateTime.of(2021, 11, 30, 14, 21))
            .beginEventDateTime(LocalDateTime.of(2021, 11, 23, 14, 21))
            .basePrice(100)
            .maxPrice(200)
            .limitOfEnrollment(100)
            .location("Gangname")
            .build();

<!--  이 때 repository 의 각 메소드에 대한 리턴 값을 정의한다. -->
        // when
        Long id = 0L;
        event.setId(id);
        when(eventRepository.save(any())).thenReturn(event);

        // then
        
<!--  정의한 컨트롤러에 post 요청을 보낸다.         -->
        mockMvc.perform(post("/api/events/")      
            .contentType(MediaType.APPLICATION_JSON)    // 요청 content-type 으로 JSON 을 원한다.
            .accept(MediaTypes.HAL_JSON)    // HAL_JSON 형태로 응답을 받고 싶다.
            .content(objectMapper.writeValueAsString(event))  // body 에는 event 를 json 형태로 담아 보낸다. 
        )
            .andDo(print())
            .andExpect(status().isCreated())
            .andExpect(jsonPath("id").exists())
            .andExpect(jsonPath("id").value(id))
        ;

    }
```

### MockMvc
> MockMvc 는 웹서버를 띄우지 않고, 컨트롤러에 요청 등을 보낼 수 있다.
> 웹서버를 띄우지 않아서 빠르지만, Web-dispatcher 라는 것을 띄우기 때문에 단위테스트 보다는 느릴 수 있다.




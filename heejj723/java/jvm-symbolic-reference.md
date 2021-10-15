
# JVM 특징과 Symbolic Reference

JVM 은 Java Virtual Machine, 즉 가상머신이다.</br>
가상 머신도 하나의 컴퓨터처럼 갖추어야 할 스펙 조건이 맞아야 한다. </br>

- 소스코드를 기계어로 번역 할 줄 알아야 한다
- 명령어(OpCode) 와 피연산자 (Operand) 가 있음
- 함수 콜 스택
- IP (Instruction Pointer)
- 가상 CPU

## JVM 특징

### 스택 기반의 가상머신
- 전통적인 컴퓨터 아키텍처는 Register 기반
- JVM 은 스택 기반 머신이다.

### Garbage Collection
- 메모리 자동 관리 기능 수행
- Heap 영역, Method Area (class, runtime constant, field, method, static variables, method byte code) 의 임시 변수들을 제거함

### 기존 자료형의 명확성
- C/C++ 처럼 시스템이 x32(4bytes), x64(8bytes) 이냐에 따라 int 형의 크기가 바뀌면 플랫폼 독립성을 보장하지 못함.
- JVM 은 int 는 4byte 로 통일 되어 있음. 

### 심볼릭 레퍼런스
- 명시적 메모리 레퍼런스가 아니라 심볼릭으로 동작함
- 컴파일 타임에 참조 형태의 클래스 주소를 알 수 없기 때문 

### 네트워크 바이트 오더
- 자바 클래스 파일은 네트워크 바이트오더를 사용함
- 통신 시 다른 플랫폼에서도 호환 되어야 하기 때문 


## Symbolic Reference vs Direct Reference

### Page Table?

운영 체제의 `Page Mapping` 개념을 차용했을 것 같다.

![스크린샷 2021-10-15 오후 8 05 31](https://user-images.githubusercontent.com/45758481/137477770-359cb582-4cb2-4f98-8e5d-f3368ec29b83.png)


운영체제는 프로그램을 메모리에 올릴 때 각 프로그램에 일정한 메모리 공간을 할당한다.</br>
`External Fragmentation` 발생을 막기 위해 메모리를 동일한 크기인 `page` 로 나누었다.</br>

프로세스에 할당 된 메모리는 가상메모리이다.</br>
가상 메모리를 쪼갠 것이 `page`, 실제 매핑 될 물리 메모리를 쪼갠 것이 `page frame` 혹은 `frame` 이다.</br>

그리고 가상 메모리의 페이지를 Physical 메모리의 프레임으로 매핑하기 위해서 `page table` 이라는 것이 존재한다. </br>


Symbolic Reference 도 비슷한 개념이다.

### Symbolic Reference

`Org.simple.People` 가 `Org.simple.Language` 를 참조하고 있다고 가정해보자.

- Java에서 Java 클래스는 클래스 파일로 컴파일 된다.
- 즉 컴파일 시 Java 클래스는 참조된 클래스의 실제 주소를 모른다. (`Org.simple.People.class` 와 `Org.simple.Language.class` 는 독립된 파일이다)
- 애초에 두 클래스 파일은 독립적이므로 `People` 이 메모리에 로드 되었다고 `Language` 도 로드 되었다는 보장 조차 없다.
- 이 때 `People.class` 는 언어 클래스를 참조하기 위해 그 심볼릭 링크만 가지고 있다. (`simple.Language` 가 실제 메모리 주소를 알기 위해 사용된다)
- 메모리 주소를 매핑하는 Page Table 같은 것이 JVM 사양 내부에 정의되어 있을 거고, 이 '이름' 같은 심볼릭 링크를 통해 실제 메모리 주소를 찾아 갈 수 있다.)


## 참조
[jvm이해하기1](https://happy-coding-day.tistory.com/123)</br>
[NAVER-JVM Internal](https://d2.naver.com/helloworld/1230)</br>
[java 직접 참조와 심볼릭 참조](https://topic.alibabacloud.com/a/java-virtual-machines-symbolic-references-and-direct-font-colorredreferencefont-understanding_1_27_30293654.html) </br>

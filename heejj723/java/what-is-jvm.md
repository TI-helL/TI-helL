# 자바 가상 머신은 뭐냐 (JVM)

## 서론

자바를 코딩 시작한 이후로 나름 오래 써왔는데, jvm 이 왜 존재하고, 어떤 구조로 되어있는지 전혀 알지 못했다. </br>
또 공부를 하다 보니 내가 지금까지 마주쳐왔던 오류와 부족했던 지식들이 java 의 내부 구조를 몰라서 였다는 것을 깨달았다. </br>
이번 기회에 한번에 정리해 보려고 한다.


## JVM 은 왜 존재하냐

### JVM?
JVM 은 자바 프로그램을 실행시키기 위해 런타임 엔진 역할을 한다. </br>
일반적인 프로그램은 특정 OS 위에서 실행 되고, OS 가 달라지면 결국 그에 맞춰 다르게 코딩을 해야한다. </br>
예를 들어 Windows 프로그램은 Mac 위에서 안돌아 가는 것 처럼.. </br>
하지만 자바 프로그램은 어떤 OS 위에서도 JVM 을 통해서 실행되기 때문에 **OS 독립적**이라고 할 수 있다. </br>

JVM 은 OS 와 프로그램 사이에서 중개자 역할을 수행한다. </br>
OS 의 메모리 영역에 직접 접근하지 않고, JVM API 를 통해서 접근한다. </br>
사용자 모드에서 커널 모드로 전환 후에 시스템 콜을 하는 거랑 비슷한 것 같기도 ..?


## Java 실행 과정 및 내부 구조

### Java 실행 과정 
1. JVM 은 OS 로부터 메모리를 할당 받는다. (메모리 영역은 JVM 이 알아서 관리한다)
2. 자바 컴파일러 (`javac`) 가 자바 소스코드 (`.java`) 를 바이트 코드 (`.class`) 로 변환한다.
3. `Class Loader` 는 class 파일들을 JVM 으로 로드한다. 이때 바이트 코드들을 Runtime Data Area 에 적재한다.
4. `Execution Engine` 은 Runtime Data Area 의 바이트 코드들을 해석해서 기계어로 바꾼다. </br> 중간에 Garbage Collection, JIT, Interpreter 가 작동한다.

![jvm](https://user-images.githubusercontent.com/45758481/137467478-a5505dd0-6614-486c-9566-c270bd4287af.png)

## 주요 컴포넌트

### Execution Engine (실행 엔진)

클래스 파일 (바이트 코드) 를 실행시킨다. 이 때 바이트 코드를 기계어로 해석하여 바꾼다.

- Interpreter </br>
명령어를 한줄 한줄 읽어서 실행한다. Python 이 이러한 형태를 취한다.

- JIT (Just-In-Time)</br>
인터프리터 언어는 모든 코드를 한줄 한줄 읽어서 실행하기 때문에 느릴 수 있다. </br>
매번 `바이트코드 -> 기계어` 로 변환하는 과정이 필요하기 때문이다. </br>
JIT 는 적절한 시점에서 바이트코드 전체를 컴파일하여 네이티브 코드로 변경하고, 이후에는 더 이상 인터프리팅 하지 않고 기계어로 직접 실행한다. </br>
기계어는 캐시에 보관된다. </br>

### Runtime Data Area
![runtimearea](https://user-images.githubusercontent.com/45758481/137471209-48182d17-0954-4377-a362-a08f80645de2.png)

이중 PC Register, Stack, Heap 말고 나머지를 알아보자

### Garbage Collection



## 참조

[자바 가상 머신이란 무엇인가](https://hanul-dev.netlify.app/java/%EC%9E%90%EB%B0%94%EA%B0%80%EB%A8%B8%EC%8B%A0(jvm)%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80/) </br>
[자바 동작 원리](https://mygumi.tistory.com/115)

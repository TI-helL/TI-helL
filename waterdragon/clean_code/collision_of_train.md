# 디미터 법칙 - 기차 충돌
다음 코드는 디미터 법칙을 어기는듯이 보인다. (아파치 프레임워크에서 가져온 코드이다.)

```java
final String outputDir = ctxt.getOptions().getScracthDir().getAbsolutePath();
```
getOptions() 함수가 반환하는 객체의 getScratchDir() 함수를 호출한 후 getScratchDir() 함수가 반환하는 객체의 getAbsolutePath() 함수를 호출하기 때문이다.  
<br>

흔히 이와 같은 코드를 기차 충돌이라 부른다. 여러 객차가 한줄로 이어진 기차처럼 보이기 때문이다. 위 코드는 다음과 같이 나누는 편이 좋다.

```java
Options opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
final String outputDir = scratchDir.getAbsolutePath();
```

위와 같이 변경한다고 해서 디미터 법칙을 어기지 않는 것인가??  
위 예제가 디미터 법칙을 위반하는지 여부는 ctxt, Options, ScratchDir이 객체인이 아니면 자료구조인지에 달렸다. 객체라면 내부구조를 숨겨야 하므로 디미터 법칙을 위반하지만, 자료구조라면 내부구조를 노출해야하므로 디미터 법칙을 어기지 않는다.  
<br>

위 예제를 다음과 같이 변경하면 디미터 법칙을 거론할 필요가 없어진다.

```java
final String outputDir = ctxt.options.scratchDir.absolutePath;
```

자료 구조는 무조건 함수없이 공개 변수만 포함하고 객체는 비공개 변수와 공개함수를 포함해야 한다. 그러나 단순한 자료구조임에도 조회함수와 설정함수를 포함하라고 요구하는 프레임워크다 있다(Bean).

# 구조체 감추기
이전 예제인 [기차 충돌](./collision_of_train.md)에서 ctxt, options, scratchDir이 만약 진짜 객체라면?? 그렇다면 기차 구조를 가지는 코드로 구현해서는 안된다. 객체라면 응당 내부 구조를 감춰야 한다. 그렇다면 outputDir은 어떻게 얻어야 할까?

```java
ctxt.getAbsolutePathOfScratchDirectoryOption();

ctx.getScratchDirectoryOption().getAbsolutePath();
```

위 두가지 방법중 첫번째 방법은 ctxt 객체에 공개해야하는 메서드가 너무 많아진다. 두번째 방법은 getScratchDirectoryOption()이 객체가 아니라 자료구조를 반환한다고 가정했을 경우이다. 두 방법다 별로이다.  
<br>

ctxt가 **객체라면 뭔가를 하라고 말해야지 속을 드러내라고 말해서는 안된다**  
디렉터리의 절대 경로가 왜 필요할까? 같은 아파치 프레임워크 모듈에서 한참을 내려가보면 디렉터리의 절대 경로가 필요한 이유는 임시파일을 생성하기 위한 목적임을 알수 있다.  
그렇다면 ctxt 객체에게 임시파일을 생성하라고 시키면 어떨까?

```java
BufferedOutputStream bos = ctxt.createScratchFileStream(classFileName);
```

객체에게 맡기기에 적당한 임무로 보인다! ctxt는 내부 구조를 드러내지 않으며 모듈에서 해당 함수는 자신이 몰라야 하는 여러 객체를 탐색할 필요가 없다. 따라서 디미터 법칙을 위반하지 않는다.
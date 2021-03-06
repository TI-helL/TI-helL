# 모나드와 함수형 아키텍처 1장
[참고 출처](https://teamdable.github.io/techblog/Moand-and-Functional-Architecture)
모나드에 대해 설명하기 전 몇가지 정리가 필요하다
## 타입
본 글에선 타입을 집합으로 생각한다
## 함수
함수형 프로그래밍에서는 c언어와 같이 명령어의 집함, 프로시저의 단위라고 생각하지 않고 수학적인 정의를 따른다. 그래서 함수형에선 함수를 두 집합을 연결하여 관계를 만들어 주는 연산으로 정의한다.
$$
ex) f: x\rightarrow y, g: x\rightarrow x, h: y\rightarrow y
$$
## 합성
일반적으로 생각하는 수학의 합성 개념과 동일하다. 함수형 프로그래밍에서는 합성의 개념이 중요한데, 함수를 합성할 수 있어야 확장이라는 개념을 만들 수 있기 때문이다.
## 사이드이펙트
순수함수는 동일한 인자가 주어졌을 때 항상 동일한 결과를 반환해야 하고 외부의 상태를 변경하지 않는 함수를 말한다. 외부의 환경에 영향을 받거나 주게되면 순수함수라 할 수 없다.<br>
사이드 이펙트는 어떤 함수가 존재할 때, 이 함수가 순수함수가 될 수 없게 만드는 모든 것을 의미한다.

### 프로그래밍에서 말하는 사이드이펙트
함수가 반환해야 하는 결과를 반환하지 못하게 하는 모든 것을 의미.<br>
간단한 예로 객체지향에서는 다음과 같은 사이드이펙트가 있다.
```java
class SomeClass{
    var factor: Int = 1

    fun clac(value: Int): Int {
        return value * this.factor
    }
}
```
멤버함수 내부의 this 포인터를 통해 멤버변수를 사용하는 경우에는 factor의 멤버변수가 어떻게 관리되었느냐에 따라서 함수 calc의 반환값이 달라지게 된다. 따라서 아래와 같이 변경하여 멤버 변수를 상수로 정의하고 수정 가능성을 제거하는게 좋다.
```kotlin
class SomeClass{
    private const val factor: Int = 1

    fun clac(value: Int): Int {
        return value * this.factor
    }
}
```
## 정리
- 타입은 집합이다
- 함수는 집합과 집합을 연결하는 연산이다
- 함수 합성으로 인해 확장이 가능하다
- 사이드이펙트는 자연스러운 것이다
- 그러나 정확한 결과를 만들어야 하는 컴퓨터 프로그램에서는 최대한 줄여야 한다.
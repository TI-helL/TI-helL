# 7. Don’t use any classes with more than two instance variables

```java
class Name {
    String first;
    String middle;
    String last;
}
```

새로운 인스턴스 변수를 하나 더 기존 클래스에 추가하면 클래스의 응집도가 저하된다. 일반적으로 많은 인스턴스 변수를 지닌 클래스를 대상으로 응집력 있는 단일 작얼을 설명할 수 있는 경우는 거의 없다. 위 코드는 다음과 같이 세 클래스로 분해할 수 있다.

```java
class Name {
    Surname family;
    GivenNames given;
}
class Surname {
    String family;
}
class GivenNames {
    List<String> names;
}
```

속성의 집합에서 오브젝트를 협력 오브젝트의 계층 구조로 분해하면 더 직접적으로 효율적인 오브젝트 모델을 구성할 수 있다.

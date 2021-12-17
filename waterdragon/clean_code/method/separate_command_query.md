# 명령과 조회를 분리하라
함수는 뭔가를 수행하거나 뭔가를 답하거나 둘 중 하나만 해야 한다. **즉 객체를 변경하거나 객체 정보를 반환하거나** 둘 중 하나다.

```java
public boolean set(String attribute, String value);
```

위 함수는 이름이 attribute인 속성 값을 찾아 값을 value로 변경하고 성공하면 true 실패하면 false를 반환한다. 이와 같은 함수를 사용할 경우 다음과 같이 괴상한 코드가 발생한다.

```java
if(set("username", "waterdragon"))...
```

위 함수는 "username"이 "waterdragon"으로 설정되어 있는지 확인하는 코드인가 아니면 "username"을 "waterdragon"으로 설정하는 코드인가?? 위 코드만 봐서는 의미가 모호하다.
<br>
해결 방법은 다음과 같이 명령과 조회를 분리하여 함수를 생성하는 것 뿐이다.

```java
if(attributeExists("username")){
    setAttribute("username", "waterdragon");
    ...
}
```
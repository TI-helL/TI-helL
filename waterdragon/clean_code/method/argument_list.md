# 인수 목록
인수의 개수가 가변적인 함수가 있을수 있다
```java
String.format("%s something $.2f", arg1, arg2) 
```
 위 코드는 여러개의 인수를 취한다고 오해할 수 있지만 함수의 선언부를 보면 이항함수인 것을 확인할 수 있다. 

 ```java
public String format(String format, Object... args)
 ```

 **가변 인수를 취하는 함수도 단항, 이항, 삼항 함수로 취급할 수 있다.**
 


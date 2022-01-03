# 인수 객체
**인수가 2,3개 필요하다면 독자적인 클래스 변수로 선언할수있는지 살펴봐야 한다.**

```java
Circle makeCircle(double x, double y, double radius);
Circle makeCircle(Poing center, double radius);
```

위 코드는 객체 생성에서 인수를 줄이는 눈속임이 아니다!! 
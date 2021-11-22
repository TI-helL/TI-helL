# 자료 전달 객체 (Data Transfer Object)
자료 구조체의 전형적인 형태를 공개 변수만 있고 함수가 없는 클래스이다. 이런 자료구조체를 때로는 DTO라고 한다. DTO는 테이터베이스와 통신하거나 소켓에서 받은 메시지의 구분을 분석할 때 유용하다.  좀더 일반적인 형태는 빈(bean) 구조다. 빈은 비공개 변수를 getter/setter 함수로 조작한다.

```java
public class Address{
    private String street;
    private STring streetExtra;
    private String city;
    private String state;
    private String zip;

    public Address(String street, String streetExtra, String city, String state, String zip){
        this.street = street;
        this.streetExtra = streetExtra;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public String getStreet(){
        return this.street;
    }

    public String getStreetExtra(){
        return this.streetExtra;
    }
    ...
}

```

## 활성 레코드
활성 레코드는 DTO의 특수한 형태로 공개 변수가 있거나 비공개 변수에 getter/setter 함수가 있는 자료구조이지만 대게 save, find와 같은 탐색 함수도 제공한다. 활성 레코드는 데이터베이스 테이블이나. 다른 소스에서 자료를 직접 변환한 결과를 의미한다.

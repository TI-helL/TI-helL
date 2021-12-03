# 자바빈 규약

## 기본 생성자는 반드시 가지고 있어야 한다
- 자바빈의 객체를 다른 곳에서 이용하려고 할 때, 기본 생성자 외에 다른 오버 로딩 된 생성자가 있다면, 
- 자바빈을 사용하기 위해선 다른 생성자의 인자를 알고 있어야 사용할 수 있다.
- 자바빈은 이런 생성자가 아닌 getter/setter로 필드값을 할당할 목적으로 만들어졌으므로, 기본 생성자를 가지고 있어야 한다.


## 빈이 패키지화 되어 있어야 한다
- 자바빈은 일반적으로 패키지를 지정하지 않은 default package가 아닌, 지정된 패키지에 저장되어 있어야 한다.


## 멤버 변수는 private로 선언한다
- 멤버를 직접 접근하는 것이 아니라 getter, setter를 이용해야하기 때문에 private으로 선언해준다.


## 멤버 변수에 접근하기 위한 getter/setter 메서드가 존재해야 한다.
- 멤버 변수의 값을 조회하고 싶을 땐 get 메서드를 사용한다.
- get 메서드는 인자가 없어야 하고, 반환하는 값은 멤버 변수의 값이며, get+대문자로 시작하는 멤버 변수 이름의 네이밍 컨벤션을 지켜야 한다.
- 멤버 변수의 값을 수정하고 싶을 땐, set 메서드를 사용한다.
- set 메서드는 수정해야 할 값이 인자로 들어가야 하고, 반환값이 없어야 하며, set+대문자로 시작하는 멤버 변수 이름의 네이밍 컨벤션을 지켜야 한다.
- 두 메서드 모두 public 접근자를 사용해야 한다.
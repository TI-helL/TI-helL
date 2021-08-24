# Python

### from, import
* 결국 코드에 쓰이는 것은 import 뒤에 오는 것  
```
import a.b.c
x = a.b.c

import a
x = a.b.c

from a.b import c
x = c

from a import b
x=b.c
```

### timeit
* 소스 코드 실행 시간 측정  
```
$ python -m timeit 코드

$ python -m timeit 'a'.join(str(n) for n in range(100))
10000 loops, best of 5: 22.2 usec per loop 

$ python -m timeit 'a'.join([str(n) for n in range(100)])
10000 loops, best of 5: 20.6 usec per loop

$ python -m timeit 'a'.join(map(str,range(100)))
20000 loops, best of 5: 16.3 usec per loop
```
- `map()`을 쓰자!  

### generator
```
# list comprehension
[x for x in range(10)]

# 이렇게도 쓸 수 있다.
# generator([]를 ()로)
(x for x in range(10)
```

* 딱 `yield` 까지만 실행하고 멈춘다. 그리고, `send()`로,
`yield` 한 값을 변경하는 효과가 있다.
```
def double(num):
    while True:
            number *= 2
            number = yield number

c double(4)
c.send(None)    # 8
c.next()        # 16
c.next()        # 32
c.send(8)       # 16
c.send(10)      # 20
```

### pass, NotImplementedError, Notimplemented
- pass vs NotImplementedError  
pass는 class 생성자 같은 코드에서 실행할 코드가 아무것도
없을 때, 들여쓰기를 맞추기 위해 쓰인다.  
NotImplementedError는 구현되지 않은 메소드가 호출됐을 때
코드 상에 표시해놓고 에러를 발생시킬 수 있다.

- NotImplementedError vs NotImplemented  
NotImplemented는 연산자가 특정 type에 대한 연산을 
지원하는지를 알려주기 위해 return 값으로 사용할 수 있다.    
[링크](https://elvanov.com/1620)

- abstract class vs NotImplementedError  
abstract class 중 미구현 메소드가 있다면 import 시점에
error가 발생한다. 따라서 선언도 불가능하다.  
반면에 NotImplementedError는 import한 후, 해당 메소드가
호출된 시점에 error가 발생한다. 이를 통해 기본적으로 선언이
가능함을 알 수 있다.  
[링크](https://brownbears.tistory.com/492)
# MultiProcessing
multiprocessing은 threading 모듈과 유사한 api를 사용하여 프로세스 스포닝을 지원하는 패키지이다.
multiprocessing 패키지는 지역, 원격 동시성을 모두 제공하여 멀티스레딩에서 발생하는 GIL을 효과적으로 회피 할 수 있다.
 - 프로세스 간 공유하는 자원이 없기 때문에 GIL이 적용될 critical section이 없다
윈도우, 유닉스에서 모두 실행된다.

multiprocessing은 threading에 없는 api가 있는데 대표적으로 pool 객체이다. 이 객체는 map처럼 여러 입력값을 함수 병렬 실행으로 처리하는 방법을 제공한다. 

## Process 클래스
프로세스는 Process 객체를 생성 후 start() 메서드를 호출하여 스폰한다. 다음은 그 간단한 예이다
```python
from multiprocessing import Process

def f(name):
	print('hello', name)

if __name__ == '__main__'
	p = Process(target=f, args('bob', ))
	p.start()
	p.join()
```

이 과정에서 참여하는 개별 프로세스의 ID를 보기위해 다음과 같이 확장한다.

```python
from multiprocessing import Process
import os

def info(title):
	print(title)
	print('module name:', __name__)
	print('parent process:', os.getppid())
	print('process id:', os.getpid())

def f(name):
	info('function f')
	print('hello', name)

if __name__ == '__main__':
	info('main line')
	p = Process(target=f, args('bob'), )
	p.start()
	p.join()
```

## 컨텍스트 및 시작 방법
플랫폼에 따라, multiprocessing은 프로세스를 시작하는 세 가지 방법을 지원한다

- spawn<br>
부모 프로세스가 깨끗한 새 파이선 인터프리터 프로세스를 시작. 자식 프로세스는 run() 메서드를 실행하기 위한 자원만을 상속. 이 방법을 사용하면 fork나 forkserver를 사용하는것보다 다소 느림.
유닉스 및 윈도우에서 사용가능함. 윈도우와 macOS의 기본값

- fork<br>
부모 프로세스는 os.fork()를 사용하여 파이썬 인터프리터를 포크. 자식프로세스는, 시작될 때, 부모 프로세스와 실질적으로 동일함. 부모의 모든 자원이 자식 프로세스에 상속. 다중 프로세스를 안전하게 포크 하기 어려움. 유닉스에서만 사용 가능하고 유닉스 기본값

- forkserver<br>
forkserver start method를 설정하면 서버 프로세스가 시작된다. 그 이후 새로운 프로세스가 필요할 때 마다 부모 프로세스가 서버에 연결하여 새로운 프로세스를 포크하도록 요청한다. 서버 프로세스는 단일 스레드이므로 os.fork() 를 사용하는 것보다 안전하다. 유닉스 플랫폼에서만 사용 가능.

유닉스에서 spawn, forkserver 를 사용하면 자원추적기 프로세스가 시작된다. 자원추적기 프로세스는 프로세스가 만든 삭제되지 않은 자원을 추적하여 프로세스가 종료된 뒤 제거한다. 하지만 프로세스가 signal 에 의해 죽으면 leak가 생길 수 있다. 일반적으로 시스템은 제한된 수의 named세마포어를 제공하고 메모리 용량 또한 leak에 의해 점유될 수 있기 때문에 주의해야 한다.

start_method를 선택하려면 if __name__ == '__main__' 절에서 set_start_method()를 사용하여 정의한다. 해당 구문은 프로그램 당 한번씩만 사용되어야 한다.
또는 get_context를 사용하여 여러 시작 방법을 사용 할 수도 있다.

## 프로세스간 객체교환
멀티프로세싱은 두 가지 유형의 프로세스간 통신 채널을 지원한다

- 큐
```python
from multiprocessing import Process, Queue
def f(q):
	q.put([42, None, 'hello'])

if __name__ == '__main__':
	q = Queue()
	p = Process(target=f, args=(q, ))
	p.start()
	print(q.get())
	p.join()
```
큐는 스레드와 프로세스에 안전하다
- 파이프
```python
from multiprocessing import Process, Pipe
def f(conn):
	conn.send([42, None, 'hello'])
	conn.close()

if __name__ == '__main__':
	parent_conn, child_conn = Pipe()
	p = Process(target=f, args=(child_conn, ))
	p.start()
	print(parent_conn.recv())
	p.join()
```
각 연결 객체에는 send() 와 recv() 메서드가 있다. 두 프로세스가 파이프의 같은 끛에서 동시에 읽거나 쓰려고 하면 데이터 손상의 위험이 있다.

## 프로세스 간 동기화
```python
from multiprocessing from Process, Lock
def f(l, i):
	l.acquire()
	try:
		print('hello world', i)
	finally:
		l.release()

if __name__ == '__main__':
	lock = Lock()
	
	for num in range(10):
		Process(target=f, args(lock, num)).start()
```

## 프로세스 간 상태 공유
동시성 프로그래밍을 할 때 에는 가능한 공유된 상태를 사용하지 않아야 하지만 공유 데이터를 사용해야 할 때 몇가지 방법이 있다
- 공유메모리
데이터는 Value, Array를 사용하여 공유 메모리 맵에 저장 될 수 있다.
```python
from multiprocessing import Process, Value, Array

def f(n, a):
	n.value = 3.1415927
	form i in range(len(a)):
		a[i] = -a[i]

if __name__ == '__main__':
	num = Value('d', 0.0)
	arr = Array('i', range(10))

	p = Process(target=f, args=(num, arr))
	p.start()
	p.join()

	print(num.value)
	print(arr[:])
```
'd', 'i' 인자는 array 모듈에서 사용되는 타입코드이다.
이러한 공유 객체는 프로세스 및 스레드에 안전하다.
공유메모리를 좀 더 유연하게 사용하고 싶다면 공유메모리에 할당된 임의의 ctypes 객체 생성을 지원하는
multiprocessing.sharedctypes 모듈을 사용하면 된다.

## 

##########
windows 환경은 unix, linux와 다르게 fork를 지원하지 않는다. 이는 부모프로세스와 자식프로세스가 구분되지 않는다는 의미이며, 때문에 windows에서 multiprocessing을 사용할 때 몇가지 제약이 생긴다. 대표적으로 windows 환경에서는 if __name__ == '__main__' 구문이 없으면 에러가 발생한다.
https://purplechip.tistory.com/36

아래의 링크도 정리해야함
https://medium.com/@grvsinghal/speed-up-your-python-code-using-multiprocessing-on-windows-and-jupyter-or-ipython-2714b49d6fac
https://medium.com/@grvsinghal/speed-up-your-code-using-multiprocessing-in-python-36e4e703213e
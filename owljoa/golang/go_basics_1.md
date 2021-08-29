# golang 문법 개념

<br>

## 1. Exported Name
- 대문자로 시작하는 이름의 함수는 다른 패키지에서 호출 가능
- Go에서 이것을 Exported Name이라고 함

```go
func Hello(name string) string {
  ...
}
```

<br>

## 2. Short Assinment Statement(:=)
- ":=" 연산자는 변수의 선언과 초기화를 동시에 수행하는 방법
- 할당되는 값(우측)에 의해 타입이 결정됨

```go
message := "Hello World"

// 위 구문과 동일
var message string
message = "Hello World"
```

<br>

## 3. go 모듈 최신 버전으로 업데이트 하는 방법

```bash
# The -u flag instructs get to update modules providing dependencies
# of packages named on the command line to use newer minor or patch
# releases when available.
go get -u
```

<br>

## 4. init 함수
- 프로그램 시작 및 전역 변수 초기화 이후에 Go에 의해 자동으로 실행되는 함수

```Go
// init sets initial values for variables used in the function.
func init() {
	rand.Seed(time.Now().UnixNano())
}
```

<br>

## 5. 어플리케이션 컴파일 & 설치
- go build
  - 패키지들(의존 라이브러리들 포함)을 컴파일하지만 설치까지는 수행하지 않음
- go install
  - 컴파일하고 설치까지 수행


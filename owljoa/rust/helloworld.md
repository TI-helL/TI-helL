# Hello World (macOS)

<br>

## 1. Rust 프로그램 작성 및 실행

<br>

### `main.rs` 파일 작성
```rust
fn main() {
  println!("Hello Rust!")
}
```

<br>

### 컴파일 및 실행
```shell
$ ls
main.rs

$ rustc main.rs
$ ls
main  main.rs

$ ./main
Hello Rust!

```



## 2. Rust 프로그램 분석


### 2.1. 함수를 정의하는 구문
```rust
fn main() {

}
```

- main 함수는 모든 Rust 프로그램에서 가장 먼저 실행되는 코드이다.

- main 함수에 파라미터가 있다면, 소괄호```()``` 안에 들어가게 됨

- 함수의 내용은 중괄호```{}```에 포함됨. 함수 선언과 같은 라인에서 중괄호를 여는 것을 권장함 

### 2.2. 스타일
- Rust 프로젝트에서 표준 스타일을 준수를 위해 ```rustfmt``` 와 같은 자동 포멧팅 도구를 사용할 수 있고, ```rustfmt```는 표준 Rust 배포에 포함되어 있음


### 2.3. 함수 내용
```rust
println!("Hello Rust")
```
- 기능: 스크린에 텍스트를 출력
- Rust는 tab이 아닌 4 spaces 인덴트를 사용
- ```println!```: Rust 매크로를 호출 <br>
매크로가 아닌 함수를 호출하려면, ```println```(느낌표(!) 없이) 사용, ```!```가 붙으면 일반 함수가 아닌 매크로를 호출
- ```"Hello Rust"```라는 문자열은 ```println!```에 인자로 전달되고, 그대로 화면에 출력됨
- 세미콜론(```;```)은 구문의 끝을 나타내고, 대부분의 rust 코드는 세미콜론으로 마무리됨


# return 키워드 생략?

- return 키워드는 함수 내의 값을 반환
- return 키워드가 없으면, 암묵적으로 마지막 표현식(expression)을 반환

- Example

  ```rust
  fn main() {
    let a = -1;

    println!("a = {}", foo(a));
  }

  fn foo(a: i8) -> i8 {
    if a > 0 {
      return 5;
    }
    else {
      a + 1 // 암묵적으로 반환될 expression
    }
  }
  ```

  실행결과

  ```
  a = 0
  ```

## Statement vs Expression

- Statement가 Expression을 포함하는 관계
- Rust에서는 세미콜론(;)을 expression 뒤에 붙이면 statement로 간주하고 값을 반환하지 않음

<br>

### Statement

- 실행가능한(executable) 최소의 독립적인 코드 조각
- 컴파일러가 이해하고 실행할 수 있는 모든 구문
- 문법적으로 해당 언어에 적합한 모든 코드 한줄 혹은 블록
- statement는 보통 하나 이상의 expression과 프로그래밍 키워드를 포함
- examples
  - 1: a = 3
  - 2: a, b = 2, 3
  - 3: if is_valid:
  - 4: &emsp; return 5

<br>

### Expression

- 하나 이상의 값으로 표현될 수 있는 코드
- 평가(evaluate)가 가능해서 하나의 '값'으로 환원됨
- examples
  - 값: 5
  - 일상적인 수식: 2 + 5
  - 함수 호출: get(5)
  - 변수명 등 식별자: a + b
  - 배열 등 할당 연산자: arr[2]

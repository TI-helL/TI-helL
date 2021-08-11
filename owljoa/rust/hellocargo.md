# Hello, Cargo!

<br>

## 1. Cargo?

- Rust의 빌드 시스템이자 패키지 매니저

- 의존 라이브러리 다운로드, 작성한 코드 및 라이브러리 빌드

- rustup을 이용한 rust 설치 시 cargo도 함께 설치됨

- 아래 명령으로 설치 버전 확인
  ```shell
  $ cargo --version
  cargo 1.54.0 (5ae8d74b3 2021-06-22)
  ```

<br><br>

## 2. Cargo로 프로젝트 생성

<br>

### 2.1. 프로젝트 생성

- `cargo new [프로젝트명]`
- 지정한 프로젝트명으로 디렉토리 생성
- Cargo.toml, src 디렉토리, src 디렉토리 내의 main.rs 파일 생성
- git 저장소로 초기화 (.gitignore 파일 포함)

```shell
# 프로젝트 생성
$ cargo new hello_cargo
    Created binary (application) `hello_cargo` package

# 생성된 프로젝트 디렉토리 확인
$ ls
hello_cargo

# 프로젝트 디렉토리 내로 이동
$ cd hello_cargo
# 생성된 파일 및 디렉토리 확인
$ ls
Cargo.toml src
$ ls src
main.rs
```

### 2.2. Cargo.toml

- [TOML](https://toml.io/en/)(Tom's Obvious, Minimal Language) 포멧
- rust에서는 코드의 package(s)를 crate(s)라고 표현함

  ```toml
  # package 영역 시작
  # 컴파일에 필요한 설정 정보들을 나열
  [package]
  name = "hello_cargo"
  version = "0.1.0"
  edition = "2018"

  # See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

  # 의존 라이브러리 영역 시작
  # 프로젝트 의존성 리스트
  [dependencies]
  ```

<br><br>

## 3. Cargo 프로젝트 빌드 및 실행

<br>

3.1. 빌드

- `cargo build`
- 프로젝트 디렉토리 하위에 target/debug/hello_cargo 실행용 바이너리가 생성됨

```shell
$ cargo build
  Compiling hello_cargo v0.1.0 (/projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 2.93s
```

3.2. 빌드 및 실행

- `cargo run`
- 처음이나 변경사항이 있는 경우에만 빌드 (변경사항이 없는 경우 바로 실행)

```shell
$ cargo run
   Compiling hello_cargo v0.1.0 (/projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 1.21s
     Running `target/debug/hello_cargo`
Hello, world!
```

3.3. 컴파일 only

- `cargo check`
- 바이너리 만드는 과정을 생략 -> 빌드에 비해 빠름
- 컴파일 체크를 위해 코드 작성 및 수정 도중에 자주 사용

```shell
$ cargo check
    Checking hello_cargo v0.1.0 (/projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 0.14s
```

<br><br>

## 4. 릴리즈 빌드하기

- `cargo build --release`
- 코드 최적화 포함 -> Rust 코드 수행을 빠르게 하지만, 컴파일 속도는 늘어남
- target/release 경로에 결과물 생성

```shell
$ cargo build -release
   Compiling hello_cargo v0.1.0 (/Users/dongin/playground/rust/hello_cargo)
    Finished release [optimized] target(s) in 0.67s
```

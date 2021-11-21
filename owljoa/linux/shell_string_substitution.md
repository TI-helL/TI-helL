# 쉘 스크립트로 문자열을 변환하는 방법

- [쉘 스크립트로 문자열을 변환하는 방법](#쉘-스크립트로-문자열을-변환하는-방법)
  - [1. 문법](#1-문법)
    - [1.1. 첫번째로 찾은 대상 대체](#11-첫번째로-찾은-대상-대체)
    - [1.2. 첫번째로 찾은 대상 제거](#12-첫번째로-찾은-대상-제거)
    - [1.3. 찾은 대상 모두 제거/대체](#13-찾은-대상-모두-제거대체)
    - [1.4. 원본 문자열의 시작 문자열 혹은 종료 문자열에서 제거/대체](#14-원본-문자열의-시작-문자열-혹은-종료-문자열에서-제거대체)
  - [2. 예시](#2-예시)
    - [2.1. 제거](#21-제거)
    - [2.2. 대체](#22-대체)

<br><br>

## 1. 문법

<br>

### 1.1. 첫번째로 찾은 대상 대체

대체할 때는 `${원본_문자열/대상_문자열/대체_문자열}` 와 같은 형태로 명령어를 입력한다.

<br>

### 1.2. 첫번째로 찾은 대상 제거

제거할 때는 대체 문자열이 없는 공백이라고 생각하고 `${원본_문자열/대상_문자열}` 와 같은 형태로 명령어를 입력하면 쉬울 것 같다.

<br>

### 1.3. 찾은 대상 모두 제거/대체

찾아낸 모든 문자열을 대상으로 대체나 제거 작업을 수행해야 하는 경우, 원본 문자열 이후 (/)슬래시를 두개 입력하면 된다.

- 제거: `${원본_문자열//대상_문자열}`
- 대체: `${원본_문자열//대상_문자열/대체_문자열}`

<br>

### 1.4. 원본 문자열의 시작 문자열 혹은 종료 문자열에서 제거/대체

특정 문자열로 시작하거나 종료되는 경우에 해당 문자열을 제거/대체하려는 경우에는 #, % 특수문자를 사용한다.

- 시작 문자열: `${원본_문자열/#대상_문자열}`
- 종료 문자열: `${원본_문자열/%대상_문자열}`

<br><br>

## 2. 예시

- 문자열을 미리 변수로 지정하고, 해당 변수 내의 문자열을 제거/대체하는 것을 echo 명령어를 이용하여 예를 들어 설명한다.
- 문자열 변수 준비
    
    ```bash
    original_msg="dinner dinner chiken winner! dinner dinner chiken winner!"
    ```
    
<br>

### 2.1. 제거

```bash
# 첫 번째 chiken 문자열 제거
# 결과: dinner dinner winner! dinner dinner chiken winner!
echo ${original_msg/chiken}

# 모든 dinner 문자열 제거
# 결과: chiken winner! chiken winner!
echo ${original_msg//dinner}

# 시작 문자열인 "dinner" 제거
# 결과: dinner chiken winner! dinner dinner chiken winner!
echo ${original_msg/#dinner}

# 시작 문자열이 아닌 chiken을 입력하면 변경사항이 없다.
# 결과: dinner dinner chiken winner! dinner dinner chiken winner!
echo ${original_msg/#chiken}

# 종료 문자열인 "winner!" 제거
# 결과: dinner dinner chiken winner! dinner dinner chiken
echo ${original_msg/%winner\!}
```

<br>

### 2.2. 대체

```bash
# 첫 번째 chiken 문자열을 pizza로 대체
# 결과: dinner dinner pizza winner! dinner dinner chiken winner!
echo ${original_msg/chiken/pizza}

# 모든 dinner 문자열을 pizza로 대체
# 결과: pizza pizza chiken winner! pizza pizza chiken winner!
echo ${original_msg//dinner/pizza}

# 시작 문자열인 "dinner"를 pizza 대체
# 결과: pizza dinner chiken winner! dinner dinner chiken winner!
echo ${original_msg/#dinner/pizza}

# 종료 문자열인 "winner!"를 loser로 대체
# 결과: dinner dinner chiken winner! dinner dinner chiken loser
echo ${original_msg/%winner\!/loser}
```
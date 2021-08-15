# git remote repository 변경 및 추가

- 현재 등록되어있는 origin remote repository(원격 저장소)를 내 개인 리포지토리로 변경
- upstream 리포지토리를 새로 추가

<br>

## 0. 사전 상태 확인

```bash
git remote -v
origin	https://github.com/RustPython/RustPython.git (fetch)
origin	https://github.com/RustPython/RustPython.git (push)
```

<br>

## 1. 기존 저장소 삭제

`git remote remove [대상 저장소 이름]`

```bash
git remote remove origin
```

<br>

## 2. 저장소 추가

`git remote add [저장소 이름] [저장소 URL]`

```bash
# origin 저장소 추가
git remote add origin https://github.com/owljoa/RustPython.git

# upstream 저장소 추가
git remote add upstream https://github.com/RustPython/RustPython.git
```

<br>

## 3. 확인

```bash
git remote -v
# 추가된 origin 저장소
origin	https://github.com/owljoa/RustPython.git (fetch)
origin	https://github.com/owljoa/RustPython.git (push)
# 추가된 upstream 저장소
upstream	https://github.com/RustPython/RustPython.git (fetch)
upstream	https://github.com/RustPython/RustPython.git (push)
```

<br>

## 참고

- [Git의 기초 리모트 저장소](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-%EB%A6%AC%EB%AA%A8%ED%8A%B8-%EC%A0%80%EC%9E%A5%EC%86%8C)

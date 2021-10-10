# shutil lib
python에서 제공하는 파워풀한 고수준 파일 연산 라이브러리
os에서 제공하는 파일연산은 개별파일을 컨트롤 할 땐 편리하지만 특정 디렉터리 트리와 같은 고수준 단위의 파일을 컨트롤할땐 shutil을 사용하는게 편함
## rmtree
```python
# 경로 아래의 모든 파일을 삭제함
shutil.rmtree(path)
```
## copytree
```python
# src를 루트로 하는 전체 디렉터리 트리를 dst로 재귀적 복사함.
# symlinks, ignore, copy_function을 옵션으로 제공함
shutil.copytree(src, dst)
```

## move(src, dst)
```python
# 파일이나 디렉터리를 src에서 dst로 옯김
# copy_function을 옵션으로 제공함
shutil.move(src, dst)
```
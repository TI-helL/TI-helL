# pickle 
파이썬 객체 직렬화, 역직렬화를 위한 바이너리 프로토콜 라이브러리
## pickling
파이썬 객체 계층 구조가 바이트 스트림으로 변환되는 절차
## unpickling 
- 바이너리, bytes-like object 등 바이트 스트림으로 부터 객체 계층 구조를 복원하는 절차
- 비슷한 말로 serialization, marshaling, flattening 이 있다

## method
- pickle.dump(obj, file, protocol=None, *, fix_imports=True, buffer_callback=None)
- pickle.load(file, *, fix_imports=True, encoding="ASCII", errors="strict", buffers=None)

직렬화 역직렬화 방식엔 json yaml 등 여러가지 방법이 있지만 pickle 방식은 가독성이 떨어지는 반면 저장이나 전송에 효율적이다.
지금 진행중인 재무제표 파서의 경우 사람이 파일을 읽거나 수정의 필요성이 적고 데이터가 방대해 json보단 pickle 방식이 적절한 것 같다.
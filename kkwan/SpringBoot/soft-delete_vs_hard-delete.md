# Soft Delete vs Hard Delete

데이터를 삭제하는 방법은 크게 `Soft Delete`와 `Hard Delete`로 나눌 수 있다.

- Soft Delete : `UPDATE`를 통해 데이터를 실제로 삭제하지 않고, 플래그로 제어하는 방식
- Hard Delete : `DELETE`를 통해 데이터를 실제로 삭제하는 방식

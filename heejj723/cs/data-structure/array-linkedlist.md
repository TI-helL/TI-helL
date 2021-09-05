# array-linkedlist.md

## Element 검색
### Array
- Random Access 지원
- Index 접근이 편리함
- 조회 시간 복잡도 O(1)

### Linked List
- Sequential Access
- n번째 인덱스에 대한 조회 시간 복잡도 O(n)

## 저장 방식
### Array
- element 들이 모두 인접한 메모리에 저장됨.
- 데이터 저장의 논리적 순서와 물리적 순서가 일치함
### Linked List
- 데이터 저장의 논리적, 물리적 순서가 다름
- 그래서 조회 하려면 첫 element 부터 읽어 나가야 함

## Memory Allocation
### Array 
- Static Memory Allocation
- 선언 되자 마자 Compile Time 에 메모리가 할당 됨
### Linked List
- Dynammic Memory Allocation
- 새로운 Node 가 할당 될 때마다 Runtime 메모리 할당


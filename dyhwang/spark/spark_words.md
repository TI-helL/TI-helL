# 스파크 용어 정리
## Partitioned data
여러 노드에서 데이터를 처리하기위해 데이터를 나누는 것을 말한다.
## fault tolerance
분산처리에서 한 노드가 에러가 나게 되어도 전체 프로그램실행에 문제가 되지 않는 특징을 말하고 spark에서는 rdd를 통해 구현된다.
## lazy evaluation
spark는 rdd가 불변성을 유지하기 때문에 각 연산마다 새로 rdd를 할당하는건 자원의 소요가 클 수 있다. 때문에 액션이 일어나기 전까지 연산을 유예하고 액션하는 순간 연산을 최적화하여 데이터를 처리하는 방식을 취한다.
## RDD(Resilient Distributed Datasets)
spark의 주요한 데이터 구조, 불변성을 가지고 있으며 파티션된 컬렉션(데이터)들의 기록이다. 이러한 기록을 가지고 분산시스템에서 연산을 처리한다.
## spark dataSets
static data type을 가지고있는 spark dataframe으로, 성능이 좋지만 dynamic dtype을 지원하는 파이썬에서는 사용 불가능하다.
## transformation
특정 연산을 RDD에 적용하게 되면 RDD의 불변성때문에 새로운 RDD를 반환한다. 이걸 transformation이라 하고 어떤 narrow와 wide로 나뉘는데, 싱글파티션, 멀티파티션을 사용하느냐에 따라 정해진다. 이렇게 변환되어 나온 새로운 RDD는 RDD lineage에 리스팅된다.
## action
transformation은 rdd + 연산 = new rdd인데 액션은 rdd + 연산 = 스칼라 의 형태로 데이터가 변환된다.
## lineage graph
transformation 또는 action을 하게되면 graph를 생성하게 되는데 이 그래프는 logical execution plan이라고 불리기도 한다. 컴파일러에게 어떤 rdd로 부터 컴파일을 시작해야 하는지에 대한 정보를 제공하고, 이러한 특성은 fault tolerance를 구현하는데 활용된다.
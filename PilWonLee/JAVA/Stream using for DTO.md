# Stream using for DTO

- **List 형태의 DTO에서 원하는 조건의 값만 정렬할 때**

```java
sorted_cap_list.add(etfDetailInfoKrxes.stream()
        .filter(p -> p.getDate().equals(date))
        .sorted(Comparator.comparing(EtfDetailInfoKrx::getMarketCap).reversed())
        .collect(Collectors.toList())
```

- etfDetailInfoKrxes가 List<DTO> 일 때
- filter에서 조건에 맞는 dto 값만 가져옴
- sorted에서 정렬하고 싶은 dto 값 지정
    - Comparator.comparing 에서 reversed 지어시 역순(DESC) 로 정렬할 수 있음
    - 기본 값은 오름차순(ASC)
- collect 에서 반환할 형식 지정

- **List 형태의 dto에서 원하는 조건의 인덱스를 찾을 때**

```java
OptionalInt interestRank_1 = IntStream.range(0, sorted_interest_list.size())
    .filter(i -> tickerSymbol.equals(sorted_interest_list.get(i).getTickerSymbol()))
    .findFirst();
```

- 리스트 크기만큼 리스트를 순회할 수 있은 IntStream 활용 가능 (0, list_size)
- filter를 통해 반환하는 값에 대해 필터 지정 가능
- findFirst를 통해 처음 조건이 만족하는 인덱스를 반환함
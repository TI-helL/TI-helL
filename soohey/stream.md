# stream


- 람다를 활용할 수 있음.
- 보통 컬렉션 인스턴스를 다룰때 for, foreach문을 돌면서 하나씩 꺼내서 다룸 → 스트림은 ‘데이터의 흐름’으로 함수 여러개를 조합해 원하는 결과를 필터링/가공할 수 있음
- 병렬처리가 가능함. (하나의 작업을 둘 이상의 작업으로 잘게 나눠 동시에 진행), 스레드를 이용해 많은 요소를 빠르게 처리할 수 있음

```
collect = disparateRatios
                    .stream()
                    .filter(d -> localDate.isBefore(d.getDate().toLocalDate()))
                    .map(d -> {

                        BigDecimal nav = d.getNav().setScale(2, RoundingMode.CEILING);
                        BigDecimal price = d.getClosePrice().setScale(2, RoundingMode.CEILING);
                        String date = String.valueOf(d.getDate());
                        return new NetAssetValuePriceDto.Res(nav, date, price);
                    })
                    .collect(Collectors.toList());
```
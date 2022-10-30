# 행 및 열 클래스

- Row나 Column 클래스는 다른 위젯을 포함하고 배치할 수 있다
- Row, Column같은 컨테이너 위젯이 포함하고 있는 위젯은 Children 이라 부르고
- Children을 포함하는 컨테이너 위젯을 Parents라고 부른다

## 코드 및 결과

```dart
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  Widget build(BuildContext context) {
    return Row(
      children: [
        BlueBox(),
        BlueBox(),
        BlueBox(),
      ],
    );
  }
}
class BlueBox extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 50,
      height: 50,
      decoration: BoxDecoration(
        color: Colors.blue,
        border: Border.all(),
      ),
    );
  }
}
```

# mainAxisSize And mainAxisAlignment

- Row 클래스에 아무 설정을 하지 않으면 위 그림같이 한쪽에 뭉쳐있다
- 레이아웃 클래스의 주축 크기와 정렬 속성을 지정하여 자식 컴포넌트들의 정렬과 위치를 변경해 줄 수 있다.

### mainAxisSize 속성

- Row와 Column은 각기 다른 주 축을 가지고 있다.
- Row는 horizontal, Column은 vertical을 주 축으로 한다
- mainAxisSize는 주 축에서 차지하는 공간을 결정한다
- mainAxisSize.max로 지정하면 주 축이 차지할 수 있는 모든 공간을 할당하여 자식을 배치한다
- mainAxisSize.min은 자식을 배치하기 위한 최소의 공간만 할당하여 배치한다

### mainAxisAlignment 속성

- mainAxisSize.max로 지정하면, extra space가 생긴다
- 주축을 기준으로 extra space에 자식을 배치하는 정렬 기준을 mainAxisAlignment로 지정해 줄 수 있다.
- 가능한 속성은 6가지이다
- start, end, center, spaceBetween, spaceEvenly, spaceAround

### crossAxisAlignment 속성

- 주축이 아닌 주축의 수직축(교차축) 방향으로 정렬하는 방식을 지정하는 속성이다
- 대부분의 교차축 속성은 Row에서만 동작한다
- 가능한 속성은 5가지이다
- start, end, center, stretch, baseline

# Flexible 위젯

- Row와 Column은 위젯을 배치할 때 고정된 크기의 위젯을 먼저 배치한다
- 고정된 크기의 위젯은 inflexible하고, 배치된 후에 리사이즈 되지 않기 않는다
- Flexible위젯으로 위젯을 래핑하면 크기를 조정할 수 있다
- 그래서 inflexible이 먼저 배치되고 flexible 위젯이 flex, fit 속성에 따라 계산되어 배치된다

# Expanded 위젯

- flexible 과 비슷하지만 잉여공간은 모두 채우도록 강제한다

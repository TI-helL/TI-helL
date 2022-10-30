# first app

- 코드랩의 첫번째 예제

## 1-1 scaffold

- scaffold 앱 기본 화면
- 웹 표준 시각 디지인 언어인 메터리얼 앱을 제작
- 플러터에서는 모든게 위젯이다. 이 위젯도 StatelessWidget을 확장하여 만든다
- scaffold 위젯은 기본 앱바, 제목 및 화면을 표시한다
- 위젯 클래스에서 할 가장 중요한 작업은 하위 위젯을 표시할 방법을 설명하는 build 매서드를 정의하는 것이다
-

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Welcome to Flutter'),
        ),
        body: const Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```

## 1-2 external package

- english_words 라는 외부 패키지를 가져와 앱에서 사용해본다
- 터미널에서 `flutter pub add english_words` 를 실행하여 설치할 수 있다
- 랜덤한 워드를 MyApp > body의 child Text에 표시할 수 있도록 WordPair의 랜덤이란 객체를 생성 후 Text의 값으로 전달한다
- Text의 값이 기존의 Hello World와 같이 고정된 값에서 런타임 때 생성되는 값으로 바뀌었기에 const를 삭제해준다

```dart
import 'package:english_words/english_words.dart';
**import 'package:flutter/material.dart';**

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    **final wordPair = WordPair.random();** // Add this line.
****    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Welcome to Flutter'),
        ),
        **body: Center**(                          // Drop the const, and
          //child: Text('Hello World'),        // Replace this text...
          child: Text(wordPair.asPascalCase),  // With this text.
        ),
      ),
    );
  }
}
```

## 1-3 stateful widget

- stateless 위젯은 런타임 중에 변경할 수 없다
- 라이프사이클 동안 상태를 저장하고 유지하고 싶으면 stateful 위젯을 사용해야 한다
- stateful 위젯을 구현하려면 statefulwidget과 위젯의 상태 인스턴스를 생성할 state클래스가 필요하다
- statefulWidget은 이뮤터블하고 재 생성이 가능하지만 state객체는 위젯의 라이프사이클 동안 지속된다

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Welcome to Flutter'),
        ),
        body: const Center(
          child: RandomWords(),
        ),
      ),
    );
  }
}

class RandomWords extends StatefulWidget {
  const RandomWords({super.key});

  @override
  State<RandomWords> createState() => _RandomWordsState();
}

class _RandomWordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random();      // NEW
    return Text(wordPair.asPascalCase);      // NEW
  }
}
```

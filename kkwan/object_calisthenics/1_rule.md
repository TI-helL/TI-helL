# 1. Use only one level of indentation per method

메서드당 하나의 제어 구조나 하나의 문장 단락으로 구성 되도록 노력한다. 중첩 된 제어 구조가 있다면 다단계의 추상화를 코드로 짠 것이며, 한 가지 이상의 기능을 수행하고 있다고 할 수 있다.

```java
class Board {
    String board() {
        StringBuffer buffer = new StringBuffer();
        for (int i=0; i<10; i++) {
            for (int j=0; j<10; j++) {
                buffer.append(data[i][j]);
            }
            buffer.append("\n");
        }
        return buffer.toString();
    }
}
```

위와 같은 코드의 경우 메소드 추출을 통해 아래와 같이 변경할 수 있다.

```java
class Board {
    String board() {
        StringBuffer buffer = new StringBuffer();
        collectRows(buffer);
        return buffer.toString();
    }

    void collectRows(StringBuffer buffer) {
        for (int i=0; i<10; i++)
          collectRow(buffer, i);
    }

    void collecRow(StringBuffer buffer, int row) {
        for (int i=0; i<10; i++)
          buffer.append(data[row][i]);
        buffer.append("\n");
    }
}
```

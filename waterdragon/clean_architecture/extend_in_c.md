# Extend in C
클린 아키텍쳐 책을 읽으면서 다시한번 놀랐다. OO 언어의 고유한 기능인줄만 알았던 상속이 C 언어에서도 구현이 가능하다!!! 물론 책에서는 상속을 흉내니는 요령이라고 말한다.

## C언어에서 상속 구현하기

point.h 파일
```c
struct Point;
struct Point* makePoint(double x, double y);
double distance(struct Point *p1, struct Point *p2);
```

namedPoint.h 파일
```c
struct NamedPoint;

struct NamedPoint* makeNamedPoint(double x, double y, char* name);
void setName(struct NamedPoint* np, char* name);
char* getName(struct NamedPoint* np);
```

namedPoint.c 파일
```c
#include "namedPoint.h"
#include <stclib.h>

struct NamedPoint{
    double x,y;
    char* name;
}

struct NamedPoint* makeNamedPoint(double x, double y, char* name) {
    struct NamedPoint* p = malloc(sizeof(struct NamedPoint));
    p->x = x;
    p->y = y;
    p->name = name;
    return p;
}

void setName(struct NamedPoint* np, char* name) {
    np->name = name;
}

char* getName(struct NamedPoint* np){
    return np->name;
}
```

main.c 파일
```c
#include "point.h"
#include "namedPoint.h"
#include <stdlib.h>

int main(int ac, char** av){
    struct NamedPoint* origin = makeNamedPoint(0.0, 0.0, "origin");
    struct NamedPoint* upperRight = makeNamedPoint(1.0, 1.0, "upperRight");

    printf("distance=%f\n", distance((struct Point*) origin), (struct Point*) upperRight);
}
```

main 함수를 살펴보면 NamedPoint 데이터 구조가 Point 데이터 구조로부터 파생된겉 같이 동작한다. 또한 형변환을 해야하긴 하지만 namedPoint.h 파일에는 없는 distance 함수를 사용할 수도 있다.
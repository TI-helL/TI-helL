# Encapsulation in C
클린 아키텍쳐 책을 읽던 도중 객채지향에 관한 내용중에 꼭 OO(Object Oriented) 언어가 아니더라고 완벽한 캡슐화가 가능하다면서 C언어 예제를 보여주었다. 

## C 로 캡슐화하기
point.h 파일
```c
struct Point;
struct Point* makePoint(double x, double y);
double distance(struct Point *p1, struct Point *p2);
```

point.c 파일
```c
#include "point.h"
#include <stdlib.h>
#include <math.h>

struct Point{
    double x, y;
}

struct Point* makePoint(double x, double y){
    struct Point* p = malloc(sizeof(struct Point));
    p->x = x;
    p->y = y;
    return p;
}

double distance(struct Point* p1, struct Point *p2){
    double dx = p1->x - p2->x;
    double dy = p1->y - p2->y;
    return sqrt(dx*dx+dy*dy);
}
```

위와 같이 구현하면 point.h를 사용하는 측에서 struct Point의 멤버에 접근할 방법이 전혀없다. 사용자는 makePoint() 함수와 distance() 함수를 호출할 수는 있지만 Point 구조체의 데이터 구조와 함수가 어떻게 구현되었는지에 대해 알수 없다.
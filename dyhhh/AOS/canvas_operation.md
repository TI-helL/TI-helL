# CANVAS OPERATION

좌표의 Transformation, Scaling, Rotating에 대해 알아보자

## 좌표 관련

```kotlin
// int save([int saveFlags])
// void restore()
// void restoreToCount(int saveCount)
```

## transformation and skew

```kotlin
// void tlanslate(float dx, float dy)

canvas.skew(0.1f, 0) // 오른쪽으로 기울임
canvas.translate(60, 0) // 원점을 x축으로 60만큼 이동
canvas.drawRect(10, 10 ,50, 50, paint)
```

## Scale

```kotlin
final fun scale(Float sx, Float sy [, Float px, Float py]) // 캔버스 전체에 적용
```

## Rotation

```kotlin
final fun rotate(Float dgree [, Float px, Float py]) // 한 점을 중점으로 시계방향으로 회전
skew(Float sx, Float sy) // 기울임
```

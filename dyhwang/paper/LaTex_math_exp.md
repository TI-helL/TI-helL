# LaTex 수식 표현
TaTex는 오픈소스 조판시스템이다.
조판작업이란 최종 결과물이 출력이 되기 전 출력될 결과물에 맞게 도형, 수식, 글을 배치하는 작업이다. 일반적으로 LaTex는 수식, 그래프작업에서 많이 사용한다.
## 기본 표현(블럭)
```
$$1 + 1 = 2$$
```
$$1 + 1 = 2$$
## 기본 표현(인라인)
```
$1 + 1 = 2$
```
$1 + 1 = 2$
## 사칙연산자
```
$$
+ - \times \div
$$
```
$$+ - \times \div$$
## 분수
```
$\frac{1}{2}$
$^1/_2$
```
$$\frac{1}{2}$$
$$^1/_2$$
## 3괄호, 중괄호, 대괄호
```
$$(1+2)$$
$$\{1+2\}$$
$$[1+2]$$
```
$$(1+2)$$
$$\{1+2\}$$
$$[1+2]$$
## 자동 괄호 리사이즈
```
$$(\frac{2}{3})$$
$$\left(\frac{2}{3}\right)$$
```
$$(\frac{2}{3})$$
$$\left(\frac{2}{3}\right)$$
## 수동 괄호 리사이즈
```
$$\Bigg( \bigg( \Big( \big( ( ) \big) \Big) \bigg) \Bigg)$$
```
$$\Bigg( \bigg( \Big( \big( ( ) \big) \Big) \bigg) \Bigg)$$
## 승수
```
$$2^2=4$$
```
$$2^2=4$$
## 밑수
```
$$a_1, a_2, a_3$$
```
$$a_1, a_2, a_3$$
## 6dots
생략 시<br>
예) 행렬
```
$$\dots$$
$$\cdots$$
$$\vdots$$
$$\ddots$$
```
$$\dots$$
$$\cdots$$
$$\vdots$$
$$\ddots$$
## 루트
```
$$\sqrt{2}$$
```
$$\sqrt{2}$$
## 팩토리얼
```
$$n! = \prod_{k=1}^n k$$
```
$$n! = \prod_{k=1}^n k$$
## 집합
```
$$\{a,b,c\} \cup \{d,e\} = \{a,b,c,d,e\}$$
$$\{a,b,c\} \cap \{a,b,d\} = \{a,b\}$$
$$x \in [-1,1]$$
```
$$\{a,b,c\} \cup \{d,e\} = \{a,b,c,d,e\}$$
$$\{a,b,c\} \cap \{a,b,d\} = \{a,b\}$$
$$x \in [-1,1]$$
## 파이
```
$$\pi$$
$$\Pi$$
$$\phi$$
```
$$\pi$$
$$\Pi$$
$$\phi$$
## 각도
```
$$90^\circ$$
```
$$90^\circ$$
## 극한
```
$$\lim_{x \to \infty} \exp(-x) = 0$$
```
$$\lim_{x \to \infty} \exp(-x) = 0$$
## 시그마
```
$$\sum_{i=1}^{10} t_i$$

$$\displaystyle\sum_{i=1}^{10} t_i$$
```
$$\sum_{i=1}^{10} t_i$$
$$\displaystyle\sum_{i=1}^{10} t_i$$
## 로그
```
$$\log_b a$$
```
$$\log_b a$$
## 적분
```
$$\int_0^\infty \mathrm{e}^{-x}\,\mathrm{d}x$$
$$\int\limits_a^b$$
```
$$\int_0^\infty \mathrm{e}^{-x}\,\mathrm{d}x$$
$$\int\limits_a^b$$
## 행렬
```
$$A_{m,n} =
 \begin{pmatrix}
  a_{1,1} & a_{1,2} & \cdots & a_{1,n} \\
  a_{2,1} & a_{2,2} & \cdots & a_{2,n} \\
  \vdots  & \vdots  & \ddots & \vdots  \\
  a_{m,1} & a_{m,2} & \cdots & a_{m,n}
 \end{pmatrix}$$
```
$$A_{m,n} =
 \begin{pmatrix}
  a_{1,1} & a_{1,2} & \cdots & a_{1,n} \\
  a_{2,1} & a_{2,2} & \cdots & a_{2,n} \\
  \vdots  & \vdots  & \ddots & \vdots  \\
  a_{m,1} & a_{m,2} & \cdots & a_{m,n}
 \end{pmatrix}$$
 ## 백터 스칼라
 ```
$$\overrightarrow{AB}$$
$$\overline{AB}$$
 ```
$$\overrightarrow{AB}$$
$$\overline{AB}$$
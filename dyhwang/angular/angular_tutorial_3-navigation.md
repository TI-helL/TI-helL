# Angular 튜토리얼 navigation
Router 모듈을 사용하여 앱에 아래와 같은 기능을 추가해보자
- 브라우저 주소 표시줄에 URL을 입력하면 해당 제품 화면으로 이동
- 싱글 페이지 애플리케이션에서 링크를 클릭하면 화면을 전환
- 브라우저의 "뒤로가기", "앞으로가기" 버튼을 누르면 브라우저 히스토리를 기반으로 이동

## URL 경로와 컴포넌트 연결하기
이전 과정에서 이미 Router를 아용하여 ProductListComponent로 화면을 전환하는 기능을 추가했다. 이번엔 상품의 상세정보 화면으로 이동하는 라우팅 규칙을 추가해보자

```typescript
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
    ])
  ],
```
product-details란 컴포넌트를 생성하고, 라우터 모듈에 라우팅 규칙을 추가

```typescript
<div *ngFor="let product of products">

  <h3>
    <a [title]="product.name + ' details'" [routerLink]="['/products', product.id]">
      {{ product.name }}
    </a>
  </h3>

</div>
```
a 태그에 라우터 링크를 추가하고 product.id를 지정하여 클릭 시 해당 주소로 이동하도록 작성

## 상품 상세정보 표시하기
링크 클릭 시 이동되는 ProductDetailsComponent 화면을 작성해 보자

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, products } from '../products';
```

필요한 모듈을 import 해주고

```typescript
export class ProductDetailsComponent implements OnInit {
  product: Product|undefined;

  constructor(
    private route: ActivatedRoute,
  ) { }

}
```
private route: ActivatedRoute를 추가하여 constructor 안에 의존성을 주입

```typescript
ngOnInit() {
  const routeParams = this.route.snapshot.paramMap;
  const productIdFromRoute = Number(routeParams.get('productId'));

  this.product = products.find(product => product.id === productIdFromRoute);
}
```

라우팅 인자로 전달된 productId를 참조하고 이값에 해당되는 상품을 products 배열안에서 탐색

```html
<h2>Product Details</h2>

<div *ngIf="product">
  <h3>{{ product.name }}</h3>
  <h4>{{ product.price | currency }}</h4>
  <p>{{ product.description }}</p>

</div>
```
찾은 product의 정보를 화면에 표시. price 정보는 금액 형식으로 표시하기 위해 currency 파이프를 사용함. 파이프는 HTML 템플릿에 표시되는 데이터 형식을 조작할 때 사용
# Angular 튜토리얼 - 1

## 상품목록 추가하기
```typescript
<h2>Products</h2>

<div *ngFor="let product of products">
  <h3>
    <a [title]="product.name + ' details'">
      {{product.name}}
    </a>
  </h3>
</div>
```
- ngFor 디렉티브로 products 배열의 요소마다 div 엘리먼트를 반복 적용
- product요소의 name값을 문자열 바인딩(interpolation)문법을 사용하여 문자열로 렌더링
- a 엘리먼트의 title 프로퍼티를 지정하기 위해 프로퍼티 바인딩 문법([])을 사용

```typescript
<p *ngIf="product.description">
    Description : {{product.description}}
</p>
```
- ngIf 디렉티브를 사용하여 description이 있을 경우 p 엘리먼트 렌더링
```typescript
<button (click)="share()">
    Share
</button>
```
- button 엘리먼트에 (click)을 사용하여 이벤트를 바인딩


## 자식 컴포넌트로 데이터 전달하기
부모 컴포넌트에서 데이터를 받는 자식 컴포넌트를 생성해보자
```typescript
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../products';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {
  @Input() product!: Product;
  constructor() {}

  ngOnInit() {}
}
```
- 자식컴포넌트가 부모컴포넌트의 데이터를 받으려면 Input 심볼을 로드해야한다.
- 부모컴포넌트에서 상품 데이터를 product 프로퍼티에 로드하기 위하여 @Input() 데코레이터를 지정
- Product 타입 앞의 !는 null-forgiving 연산자이다. 이유는 초기에 product의 값이 Null이 되는 시점이 있기 때문에 Null을 허용해 주기 위해서이다.
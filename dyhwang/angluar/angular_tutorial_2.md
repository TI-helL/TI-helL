# Angular 튜토리얼 - 2

## 부모 컴포넌트로 데이터 전달하기

```typescript
import { Output, EventEmitter } from '@angular/core';
```
- 자식컴포넌트에서 부모컴포넌트로 이벤트나 데이터를 전송하기 위해서 자식 컴포넌트에서 @Output과 @EventEmitter 심볼을 로드해 주어야 한다.

```typescript
export class ProductAlertsComponent {
  @Input() product: Product|undefined;
  @Output() notify = new EventEmitter();
}
```
- ! 연산자 이외에도 Type|undefined 로 타입을 정의해 주는 방법도 사용 가능하다.
- notify 프로퍼티를 추가하고 이 프로퍼티에 Output 데코레이터를 지정한 뒤 EventEmitter 인스턴스를 할당.
```typescript
<button (click)="notify.emit()">Notify Me</button>
```
- 자식 컴포넌트의 버튼 이벤트에 이미터를 바인드
```typescript
onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
```
- 부모 컴포넌트에 자식 컴포넌트 notify에서 전송한 데이터를 처리해줄 메서드를 생성함
```typescript
<app-product-alerts
  [product]="product" 
  (notify)="onNotify()">
</app-product-alerts>
```
notify 프로퍼티에 메서드를 바인딩
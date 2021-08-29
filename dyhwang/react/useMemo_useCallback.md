# useMemo vs useCallback
## React 최적화

React는 reconciliation, virtual DOM 을 사용하기에 대부분의 경우 빠른 속도로 구현 가능하지만 대규모 App으 경우 성능을 최적화 해줘야 하는 경우가 생긴다.

React의 최적화는 Memoization을 통한 useMemo, useCallback, React.Memo를 대표적으로 사용한다.

그 용례와 개념을 알아보고 차이점을 살펴보도록 하자.

## useMemo

Hooks

컴포넌트 reRender시 dependency의 변경이 없다면 미리 계산된 값을 반환하여 functional components를 최적화 하는데 도움을 준다.
```jsx
// useMemo를 사용한 예제
import React, { useMemo } from "react";
const computeValueFromProp = (prop) => {
// 에너지가 많이 소모되는 계산이 일어남
}
const ComponentThatRendersOften = ({ prop1, prop2 }) => {
	const valueComputedFromProp1 = useMemo(() => {
		return computeValueFromProp(prop1)
	}, [prop1]);
	return (
		<>
			<div >{valueComputedFromProp1}</div>
			<div >{prop2}</div>
		</>
	);
};
```

prop1이 변경되지 않는다면 computeValueFromProp은 미리 memo된 값을 반환한다.

```jsx
import React, { useState } from 'react';

const ComponentThatRendersOften = ({ cb1, cb2 }) => {
	const [state, setState] = useState(...);
	const expensiveFunction = () => {
		// 에너지가 많이 소모되는 계산이 일어남
		...
		setState(...);
		cb1();
	};
	return (
		<button onClick={expensiveFunction} />
	);
};
```

위의 ComponentThatRendersOften은 re-render 될 때마다 expensiveFunction을 다시 생성하게 된다.

expensiveFunction의 생성비용이 높을 경우 이 부분을 최적화 해주어야 하는데 그러기 위해 expensiveFunction을 컴포넌트 외부로 옮기는 경우 prop과 state, state setters를 매 번 넘겨주어야 하기에 가독성이 떨어질 수 있다.

useCallback으로 expensiveFunction을 메모라이즈 하게되면 적절하게 최적화 할 수 있다.

```jsx
import React, { useState, useCallback } from 'react';
const ComponentThatRendersOften = ({ cb1, cb2 }) => {
	const [state, setState] = useState(...);
	const expensiveFunction = useCallback(() => {
	// 에너지가 많이 소모되는 계산이 일어남
		setState(...);
		cb1();
	}, [cb1]);
	return (
		<button onClick={expensiveFunction} />
	);
};
```
# Typescript의 Utility Types

타입스크립트는 타입의 변환을 용이하게 도와주는 일부 Built-in 유틸리티를 제공하고 있다.

중요하거나 요긴한 항목들만 추려서 정리해놓음

## Partial<Type>

타입 내 모든 프로퍼티를 Optional 하게 변경해주는 유틸

```typescript
interface Todo {
  title: string;
  desc: string;
}

// ok
const todo1: Todo = {
  title: '투두1',
  desc: '투두1입니다'
}

// error! desc required
const todo2: Todo = {
  title: '투두2'
}

// ok
const todo3: Partial<Todo> = {
  desc: '투두3입니다'
}

// Partial을 사용하면 모든 프로퍼티에 ? 가 붙는다고 생각하면 좋다
interface TodoLikePartial {
  title?: string;
  desc?: string;
}
```

## Required<Type>

타입 내 모든 프로퍼티를 Required 하게 변경해주는 유틸

```typescript
interface Todo {
  title?: string;
  desc?: string;
}

// ok
const todo1: Todo = {
  title: '투두1',
}

// error! desc required!
const todo2: Required<Todo> = {
  title: '투두2'
}

// Required는 모든 프로퍼티를 반드시 입력받도록 변경한다.
interface TodoLikeRequired {
  title: string;
  desc: string;
}
```

## Readonly<Type>

타입 내 프로퍼티에 재할당을 못하도록 막는다 (Object.freeze)

```typescript
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: '투두'
}

// error! title is readonly property
todo.title = '투두 변경!';

interface TodoLikeReadonly {
  readonly title: string;
}
```

## Record<Keys, Type>

프로퍼티의 키가 `Keys` 이고 값이 `Type`인 새로운 타입은 반환

```typescript
interface Human {
  age: number;
  breed: string
}

type Name = 'minsu' | 'yuna';

const person: Record<Name, Human> = {
  minsu: {age: 20, breed: 'AB'},
  yuna: {age: 21, breed: 'A'}
}
```

## Pick<Type, Keys>

Type 프로퍼티 중에서 Keys 값만 받는 타입을 반환

```typescript
interface Todo {
  title: string;
  desc: string;
  done: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'done'>;

const todo: TodoPreview = {
  title: 'Todo 1',
  done: true
}
```

## Omit<Type, keys>

Type 프로퍼티 중에서 Keys에 해당하는 값을 배제한 타입을 반환

```typescript
interface Todo {
  title: string;
  desc: string;
  done: boolean;
  createAt: number;
}

type TodoPreview = Omit<Todo, 'desc' | 'createAt'>;

const todo: TodoPreview = {
  title: 'Todo 1',
  done: true
}
```

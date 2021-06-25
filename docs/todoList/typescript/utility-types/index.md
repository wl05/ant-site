# Typescript 实用工具泛型

## Partial<Type>

将给定类型的所有属性转换为可选属性并返回新的类型

```ts
type Todo = {
  title: string;
  description: string;
};

type NewTodo = Partial<Todo>;
// type NewTodo = {
//     title?: string;
//     description?: string;
// }
```

实现原理：

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

## Required<Type>

与Partial的作用相反，将给定类型的所有属性转化为必须。

```ts

type Props = {
  a?: number;
  b?: string;
};

type newProps = Required<Props>;
// type newProps = {
//     a: number;
//     b: string;
// }
```

实现原理：

```ts

/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};

```


## Readonly<Type>

将给定类型的属性转化为只读属性

```ts
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
// 此时再给title属性赋值会提示报错信息
todo.title = "Hello"; // Cannot assign to 'title' because it is a read-only property.ts(2540)
```

实现原理：

```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

## Record<Keys,Type>

Record用作对象类型，对象的key必须在keys里面，key对应的value的类型是Type

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```

实现原理：

```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

## Pick<Type, Keys>
将Type中的某些属性选择出来，需要选择的属性通过Keys指定，Keys可以是Type的单个键名可以是多个键组成的联合类型。举例说明

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

// type TodoPreview = {
//     title: string;
//     completed: boolean;
// }
```

实现原理：

```ts

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

```

## Omit<Type, Keys> // TODO:

忽略Type中的某些属性，Keys是需要忽略的属性，可以是单个属性也可以是多个属性的联合类型

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoInfo = Omit<Todo, "completed" | "createdAt">;

// type TodoInfo = {
//     title: string;
//     description: string;
// }
```
实现原理：

```ts
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

## Exclude<Type, ExcludedUnion>
排除Type中的某些属性，通过ExcludedUnion指定排除的项，可以是单个属性也可以是多个属性的联合类型


实现原理：

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```


## 参考资料
1. [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
2. [Typescript 高级用法](https://juejin.cn/post/6926794697553739784#heading-21)
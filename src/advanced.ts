// Utility Types 公用设施类型
// 我觉得可以直接翻译成 类型工具

// 我的理解 ，通俗一点理解就是 就是typescript已经为我们写好的类型别名，然后接受一个类型参数

// Partial<Type>

namespace Advanced {
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  function updateTodo(todo: Partial<Todo>) {}

  updateTodo({ title: 'abc' }) // 出入一个值是可以的

  // Required<Type>  将一个类型的每个字段转为必须的

  interface Props {
    a?: number
    b?: number
  }

  const getProps = function (props: Required<Props>) {}
  getProps({ a: 90, b: 90 })

  // Readonly<Type>
  // Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.

  // 构建一个新的类型时，将原来的类型的属性全部转为转为只读属性，不能被重新赋值

  interface Header {
    title: string
  }
  const header: Readonly<Header> = {
    title: 'hello,world',
  }
  // header.title = "sdfsf";  // 提示是只读属性

  // function freeze<Type>(obj: Type): Readonly<Type>;

  // Record<Keys, Type>
  // Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.

  // 构建一个对象类型，这个对象类型的key 是 keys中的，property 是Type
  // 将一个类型映射成另外一个类型 第一个参数中的每个类型是新对象结构中的属性，
  // Type是新类型中的属性值的类型
  interface CatInfo {
    age: number
    breed: string
  }

  type CatName = 'miffy' | 'boris' | 'mordred'

  const cat: Record<CatName, CatInfo> = {
    miffy: {
      age: 90,
      breed: 'sdsdfsdf',
    },
    boris: {
      age: 90,
      breed: 'sdsdfsdf',
    },
    mordred: {
      age: 90,
      breed: 'sdsdfsdf',
    },
  }

  // 突然想到一个类型
  let a: object
  // a.  后面啥都没有，怎么用呢 ？

  // Pick<Type, Keys> pick 翻译成中文 选择 ，挑选

  // Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.
  // 从已知类型的键的集合中挑选一些出来，构建一个新的类型

  // type TodoPreview = Pick<Todo, "title" | "completed" | "user">;
  // 看到上面会报编译错误，可 第二个参数Keys 要是Todo中属性中有的

  type TodoPreview = Pick<Todo, 'title' | 'completed'>
  const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
  }

  // Omit<Type, Keys> 删除，省略的意思
  // Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals).

  // 从一个类型中删除这个key，构建一个新的类型。
  // 第二个参数可以是字符字面量，也可以是字面量组成的联合类型。

  // Exclude<UnionType, ExcludedMembers>
  // Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.
  // 第一个类型参数要是联合类型的。
  // 从第一个类型参数中排出第二个类型参数，构建一个新的类型

  type T0 = Exclude<'a' | 'b' | 'c', 'adddd' | 'sss'>
  // 第二个类型参数中的字符字面量类型在第一个中不存在也不会报错

  type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>

  type T2 = Exclude<string | number | (() => void), Function>

  // Parameters<Type>
  // Constructs a tuple type from the types used in the parameters of a function type Type.

  // 从函数的参数的类型中构建一个元祖类型，
  declare function f1(arg: { a: number; b: string }): void

  type T11 = Parameters<(s: string) => void>
  let t11: T11 = ['huangtao']

  // Extract<Type, Union>
  // Constructs a type by extracting from Type all union members that are assignable to Union.
  // 提取公共的类型，构建一个新的类型

  type T05 = Extract<'a' | 'b' | 'c', 'a' | 'f'>

  // NonNullable<Type>
  // Constructs a type by excluding null and undefined from Type.
  type T00 = NonNullable<string | number | undefined>

  // ReturnType<Type>
  // Constructs a type consisting of the return type of function Type.

  // InstanceType<Type>
  // Constructs a type consisting of the instance type of a constructor function in Type.
}

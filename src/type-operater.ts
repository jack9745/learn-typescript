// The keyof type operator
// keyof 类型操作符
//The keyof operator takes an object type and produces a string or numeric literal union of its keys. The following type P is the same type as “x” | “y”:
namespace TypeOperater {
  // 将一个对象类型的key转为一个联合类型，重点是对象类型
  type Pointer = {
    x: number;
    y: number;
  };
  type P = keyof Pointer; //注意keyof操作兑现是类型 而不是一个值
  let p: P = "x" || "y";

  // If the type has a string or number index signature, keyof will return those types instead:
  type UserInfo = {
    [key: string]: string;
  };

  type KeyType = keyof UserInfo;
  let a: KeyType = "";
  let b: KeyType = 90;

  // Note that in this example, KeyType is string | number — this is because JavaScript object keys are always coerced to a string, so obj[0] is always the same as obj["0"].

  // js中的对象中的key被强制转为字符串类型的，所以KeyType 类型是 string | number

  // Typeof Type Operator   typeof 类型操作符
  // TypeScript adds a typeof operator you can use in a type context to refer to the type of a variable or property:

  // typescript也有typeof操作符，你可以在类型上下文中来引用一个变量或者属性的类型，
  // 注意typeof 后面跟的也是一个值，不是一个类型

  type GetName = (id: string) => boolean;
  type K = ReturnType<GetName>;

  // 这样也可以 ，typeof 可以返回一个值的类型
  function getName(id: string) {
    return { name: "", id: "" };
  }
  type M = ReturnType<typeof getName>;

  // Limitations 使用过程中的一些限制
  // Specifically, it’s only legal to use typeof on identifiers (i.e. variable names) or their properties.
  // 一般 typeof用在标识符，或者变量 或者他们的属性上，不能用在其他上面

  // Indexed Access Types 索引访问类型

  //We can use an indexed access type to look up a specific property on another type:
  // 我们可以通过索引访问符来访问一个属性的类型

  type Person = {
    name: string;
    id: string;
    age: number;
    height: number;
    weight: number;
    hobby: string[];
  };

  type Hobby = Person["hobby"];
  // 还可以这样用
  type A = Person["name" | "id" | "height"];

  // 还可以这样访问 得到的类型也是联合类型
  type B = Person[keyof Person];

  // You’ll even see an error if you try to index a property that doesn’t exist:
  // type I1 = Person["alve"];

  // Another example of indexing with an arbitrary type is using number to get the type of an array’s elements
  //  We can combine this with typeof to conveniently capture the element type of an array literal:

  // 获取数组字面量的成员的类型
  const list = [
    {
      name: "ab",
      age: 10,
    },
  ];
  type Man = typeof list[0]; //
  type Woman = typeof list[number]; // 这样也可以

  // You can only use types when indexing, meaning you can’t use a const to make a variable reference:
  // 索引时只能使用类型，这意味着不能使用常量进行变量引用：

  const key = "age";
  // type Age = Person[key]; // 索引时只能使用类型

  type Key = "age";
  type Age = Person[Key]; // 可以这样访问
}

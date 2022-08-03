// 像 java 里面的类型都是通过 extends 继承的，
// 如果 A extends B，那 A 就是 B 的子类型。
// 这种叫做名义类型系统（nominal type）。

// 而 ts 里不看这个，只要结构上是一致的，那么就可以确定父子关系，
// 这种叫做结构类型系统（structual type）。

// 怎么判断两个类型是有父子关系的 ？？

// 通过结构，更具体的那个是子类型，
namespace ParentAndChild {
  class Person {
    name!: string;
    age!: number | string;
  }

  class Child {
    name!: string;
    age!: number;
    hobbies!: string[];
  }

  let child: Child = {
    name: "小黄黄",
    age: 3,
    hobbies: ["eating"],
  };
  let childOne: Person = {
    name: "jack",
    age: 12,
  };
  let person: Person = {
    name: "huangtao",
    age: 18,
  };
  let personOne: Child = {
    name: "rose",
    age: 25,
    hobbies: ["ball"],
  };

  // 这里 Child 比Person 更具体 所以 Child是Person的子类型
  // 注意这里用的是更具体，而不是更多

  // 判断联合类型父子关系的时候， 'a' | 'b' 和 'a' | 'b' | 'c' 哪个更具体？

  // 'a' | 'b' 更具体，所以 'a' | 'b' 是 'a' | 'b' | 'c' 的子类型。

  type Result1 = Child extends Person ? true : false; // true
  let bool1: Result1 = true;

  type Result2 = Person extends Child ? true : false;
  let bool2: Result2 = false;

  // 怎么判断具有父子关系的类型中，哪个是更具体的
  // 我的理解：如果两个类型是对象类型的结构，那么A类型中的所有属性的类型必须和
  // B类型中含有A类型中的属性相同，或者是B中的父类型，那么A才是B的父类型
  // 子类型可以比父类型的属性多

  // 如果是联合类型
  // 那么看哪个类型的取值范围比较小，谁就是子类型，谁就是更具体的，
  // 我的理解：因为取值范围越小，那么就越具体

  let printPersonName = (user: Person) => {
    console.log(user);
  };
  let printChildName = (user: Child) => {
    console.log(user);
  };

  // 为了更严格的保证类型安全，ts 添加了 strictFunctionTypes 的编译选项，
  // 开启以后函数参数就只支持逆变，否则支持双向协变。
  // printPersonName = printChildName;

  // 看网上的解释是这样的

  // 因为这个函数调用的时候是按照 Child 来约束的类型，
  // 但实际上函数只用到了父类型 Person 的属性和方法，
  // 当然不会有问题，依然是类型安全的。

  printChildName = printPersonName;

  // printChildName(childOne); // 需要的是Child类型，但是传入的是Person类型。不能赋值
  // printChildName(person); // person 不是 Child类型的子类实例，所以不能赋值

  printPersonName(personOne); // 都可以 因为child可以赋值给Person 类
  printPersonName(child);
  printPersonName(childOne);
  printPersonName(person);

  // typescript 中的类型安全  和型变
  //静态类型系统是为了保证类型安全的。
  // 型变分为两种，一种是子类可以赋值给父类，叫做协变，
  // 一种是父类可以赋值给子类，叫做逆变
}

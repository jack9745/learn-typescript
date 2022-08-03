namespace ClassType {
  class A {
    // 没有初始化为什么不报错
    x: any; // any 类型  严格模式下，不能有隐式的any类型，但是可以有显示any的类型
    y: any; // any 类型
  }
  // 为什么A不会报错 ？？？
  // 严格模式下，属性要被初始化赋值 或者 --strictPropertyInitialization
  class B {
    x: number;
    y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }
  class C {
    x = 0;
    y = 0;
  }

  class D {
    x: 0;
    y: 0;
    constructor(x: number, y: number) {
      this.x = 0;
      this.y = 0;
    }
  }
  // 我们有一种方法可以声明属性的类型，不必在构造函数中初始化属性值
  // 用断言 操作符 ！
  class E {
    name!: string;
  }

  // 类中的readonly 属性修饰符 有什么不同的地方 ？？？
  // readonly
  // Fields may be prefixed with the readonly modifier. This prevents assignments to the field outside of the constructor.

  class People {
    readonly userName: string; // 被readonly修饰也要被初始化
    constructor(name?: string) {
      this.userName = name ? name : "";

      // 或者这样写
      if (name) {
        this.userName = name;
      }
    }
    // 只读属性只能在构造函数中被初始化，不能再其他地方被初始化
    setName() {
      // 编译检查不通过
      // this.userName = 'huangtao'
    }
  }

  // Constructors
  // Class constructors are very similar to functions.
  // You can add parameters with type annotations,
  // default values, and overloads:
  // 类的构造函数也可以重载
  class Point {
    constructor(x: number, y: number);
    constructor(x: string);
    // 构造函数的实现
    constructor(x: number | string, y?: number) {}
  }

  // 类的构造函数的签名和函数签名的区别 是什么
  // 构造函数不能返回类型注解
  //1 Constructors can’t have return type annotations -
  // the class instance type is always what’s returned

  // 下面这句没看懂？？
  //2 Constructors can’t have type parameters - these belong on the outer class declaration, which we’ll learn about later

  // let userA: OldPeople;

  declare namespace jQuery {
    interface AjaxSetting {
      method?: "GET" | "POST";
      data?: any;
    }
    function ajax(url: string, setting?: AjaxSetting): void;
  }

  let setting: jQuery.AjaxSetting = {
    method: "GET",
    data: { name: "jack" },
  };

  // jQuery.ajax("./get/userInfo", setting);

  //  implements  Clauses  实现语句
  // 类实现接口
  interface Ball {
    // 函数签名的写法有哪几种呢 ？
    getColor: () => void;
    color: string;
    // 这种也可以
    setColor(color: string): void;
  }

  class FootBall implements Ball {
    color: string;
    constructor(color: string) {
      this.color = color;
    }
    setColor(color: string): void {
      //
    }
    getColor(): void {
      //
    }
  }
  // 一个类实现换一个接口，要实现接口中的所有属性初始化

  // It’s important to understand that an implements clause is only a check that the class can be treated as the interface type.

  // implements语句就是检查一个类是否可以被看为接口类型，或者满足某个接口类
  // 所以实现的时候，比如要实现一个方法，参数的类型，参数的个数都要相同

  //  It doesn’t change the type of the class or its methods at all.

  // 一个类也可以同时实现多个接口
  // Classes may also implement multiple interfaces, e.g. class C implements A, B{}

  interface AA {
    name: string;
    hobbies?: string[];
  }
  interface BB {
    age: number;
  }
  class CC implements AA, BB {
    name = "huangtao";
    age = 18;
    hobbies = ["ball"]; // 可有可无
  }

  // extends Clauses;
  // 类的继承
  // Classes may extend from a base class. A derived class has all the properties and methods of its base class, and also define additional members.

  class Base {
    // constructor(name: string) {}
    greet(name: string, age: number | string, hobbies: string[]) {
      console.log("Hello, world!");
    }
  }

  // 基类和派生类的关系，方法继承的时候，参数之间的关系，？？ 文档讲的不清楚
  class Derived extends Base {
    greet(name: string, age: number | string | boolean) {
      if (name === undefined) {
        // super.greet(name);
      } else {
        console.log(`Hello, ${name.toUpperCase()}`);
      }
    }
  }
  const d = new Derived();
  // Alias the derived instance through a base class reference
  const b: Base = d; // b的类型是Base类型 ？？？
  // No problem
  // b.greet("abc"); // Hello, world!

  const bb = new Base();
  // const ddd: Derived = new Base(); // ddd的类型是Derived类型？？？
  // 为什么 基类的实例 也可以赋值给派生类的类型？？？

  // ddd.greet("edddd"); // 为什么都是调用基类的方法   Hello, world!
  // ddd.greet("abc"); // 为什么调用的是基类的方法 Hello, world!

  type Action =
    | { a: string }
    | { b: string; c: string; d: string; e: string; f: string };

  class Animal {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  class Dog extends Animal {
    //
    declare name: string;
    constructor(name: string) {
      super(name);
      // 如果构建目标是ES2015,如果没有下面这句，错误提示是 属性“name”没有初始化表达式，且未在构造函数中明确赋值

      // 如果构建目标是ES2022 ,属性 "name" 将覆盖 "Animal" 中的基属性。
      // 如果是有意的，请添加初始值设定项。否则，请添加 "declare" 修饰符或删除多余的声明。ts(2612)
      // this.name = name;

      // Dog 是继承 Animal的，如果声明了name属性，那么typescript认为是多余的，可以删除解决上面的报错问题
      // 如果用户是有意的,或者想指定一个更确定的类型，那么可以用declare来声明告诉typescript 类型就是这个
    }
  }

  class AnimalHouse {
    resident: Animal;
    constructor(animal: Animal) {
      this.resident = animal;
    }
  }

  class DogHouse extends AnimalHouse {
    // Does not emit JavaScript code,
    // only ensures the types are correct
    declare resident: Dog;
    constructor(dog: Dog) {
      super(dog);
    }
  }

  class MsgError extends Error {
    constructor(m: string) {
      super(m);
    }
    sayHello() {
      console.log("hello " + this.message);
    }
  }

  let errorInstance = new MsgError("error");
  // 如果构建目标是ES5及以下，那么下面会调用报错
  // 为什么呢 ？？？
  errorInstance.sayHello();

  let isInstance = errorInstance instanceof Error;
  console.log("isInstance", isInstance);
}

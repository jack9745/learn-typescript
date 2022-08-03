namespace Compatibility {
  // Type Compatibility
  // 类型的兼容性，就是类型之间是否可以赋值
  // 结构化类型系统
  interface Pet {
    name: string | number;
  }
  let dog = {
    name: "abc",
    color: "red",
  };

  // 可以看到dog是可以赋值给Pet类型的  why???
  // 基本规则是什么

  // The basic rule for TypeScript’s structural type system is that x is compatible with y if y has at least the same members as x.
  // 如果y可以兼容x,或者x可以赋值给y,那么y中至少有和x一样的属性

  // To check whether dog can be assigned to pet, the compiler checks each property of pet to find a corresponding compatible property in dog. In this case, dog must have a member called name that is a string. It does, so the assignment is allowed.
  // 我们看dog是否可以赋值给pet,那么typescript就要检查pet中的每个属性和属性加对应的类型，dog是否有，若果有的话，就可以赋值给pet

  // Note that dog has an extra owner property, but this does not create an error. Only members of the target type (Pet in this case) are considered when checking for compatibility.

  // 我们需要注意的是，dog还有一个额外的属性，但是并没有报错，这里我们只考虑目标类型的属性是否都被赋值了
  let pet: Pet = dog;

  //
  //
  //
  /**-------------------------*/
  //
  //
  //  Comparing two functions
  // 两个函数之间是否可以赋值

  // 首先看参数列表
  // 一个函数是否可以赋值给另外一个函数，首先看参数列表,如果x中的参数列表中的参数 在y中对应的位置有对应的类型，那么x就可以赋值给 y
  let x = (a: number) => 0;
  let y = (b: number, s: string) => 0;
  y = x; // OK
  // x = y; // Error

  // 看返回值
  // Now let’s look at how return types are treated, using two functions that differ only by their return type:
  let a = () => ({ name: "Alice" });
  let b = () => ({ name: "Alice", location: "Seattle" });
  a = b; // b可以赋值给a
  // The type system enforces that the source function’s return type be a subtype of the target type’s return type.

  // 这里的目标类型是a ，源类型要是目标类型的子类

  // 综上所述 ，所以我们看两个函数是否可以兼容赋值，我们要看参数是否兼容，还要看返回值是否可以兼容

  //
  //
  //
  //
  /**-----------------------------*/
  // 比较两个类之间的兼容性，实例之间是否可以赋值
  //Classes work similarly to object literal types and interfaces with one exception: they have both a static and an instance type. When comparing two objects of a class type, only members of the instance are compared. Static members and constructors do not affect compatibility.
  //
  //当我们比较两个类的类型时，只比较实例成员，静态成员和构造函数不影响赋值
  //

  class Animal {
    name!: string;
    static getName() {}
    constructor(a: string, b: string) {}
  }

  class Cat {
    name!: string;
    constructor(a: number, b: number) {}
  }

  let animal = new Animal("xiaomao", "xiao");
  let cat = new Cat(1, 1);

  // 我们可以看到Animal类型的可以赋值给 Cat类型的，反过来也可以
  // 我们可以看到 构造函数和 静态属性不影响类型之间的赋值
  animal = cat;
  cat = animal;

  // 看另外的一个例子

  class School {
    // 私有属性
    private name: string;
    constructor(name: string) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
  }

  class HightSchool extends School {
    // 可以有构造函数，也可以没有
    constructor(name: string) {
      super(name);
    }
    // 为什么不能声明自己的私有属性？？？
    // private name: string;
    getName() {
      // 在方法中应该代表实例吧
      return super.getName();
    }
  }
  class PrimarySchool extends School {
    type!: string;
  }
  let schoolA = new School("a");
  let schoolB = new HightSchool("b");
  let schoolC = new PrimarySchool("c");
  //
  // 可以看到可以相互赋值 ,为什么可以相互赋值呢
  schoolA = schoolB;
  schoolB = schoolA;

  // schoolC = schoolA; //  A 不能赋值给 C PrimarySchool中需要type, 而school中没有
  schoolA = schoolC;

  const shoolBName = schoolB.getName();
  console.log("shoolBName", shoolBName);

  class Book {
    private name!: string;
  }

  class MathBook {
    private name!: string;
  }

  let book: Book;
  let mathBook: MathBook;

  //
  // Private and protected members in classes
  // 私有成员 和受保护的成员会影响 类实例之间的赋值

  // Private and protected members in a class affect their compatibility.

  //
  //When an instance of a class is checked for compatibility,  if the target type contains a private member, then the source type must also contain a private member that originated from the same class.
  // 如果两个类都有私有成员，并且要继承相同的类，他们之间才可以相互赋值

  //
  // 可以看到都不能赋值
  // book = mathBook;
  // mathBook = book;

  //
  //
  //
  //
  //
  /**-----------------------*/
  // Generics  泛型之间的赋值

  interface Empty<T> {}
  let e: Empty<number>;
  let f: Empty<string>;
  // e = f;
  e = {};
  f = {};
  e = f;
  f = e;

  interface NotEmpty<T> {
    data: T;
  }

  // 就像声明一个具体的类型
  let g: NotEmpty<number>;
  let h: NotEmpty<string>;
  g = {
    data: 1,
  };
  h = {
    data: "jack",
  };
  // 都不可以赋值
  // g = h;
  // h = g;
}

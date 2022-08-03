// 什么是混入
namespace mixins {
  // Along with traditional OO hierarchies, another popular way of building up classes from reusable components is to build them by combining simpler partial classes
  //与传统的面向对象层次结构一样，从可重用组件构建类的另一种流行方法是通过组合更简单的部分类来构建它们
  //
  //
  // How Does A Mixin Work?
  // 怎么理解混入 ？？
  // 我的理解是通过继承基类，并且混入一些其他属性和方法来 来构造一个新类

  // // To get started, we need a type which we'll use to extend
  // other classes from. The main responsibility is to declare
  // that the type being passed in is a class.
  // 声明一个类型，这个类型至少是一个类
  type Constructor = new (...args: any[]) => {};
  class A {}
  type C = typeof A;

  function handlerNewClass<T extends Constructor>(Base: T) {
    return class extends Base {
      // 为什么不能有constructor
      // constructor() {}
      // private a: string;

      likeEating() {
        console.log("小孩子喜欢吃");
      }
    };
  }

  class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    getName(this: Person) {
      console.log(this.name);
      return this.name;
    }
    getAge(this: Person) {
      console.log(this.age);
      return this.age;
    }
  }

  const Child = handlerNewClass(Person);
  const child = new Child("jack", 12);
  child.getAge();
  child.likeEating();

  // Constrained Mixins

  // 受约束的混入

  // 声明了一个泛型别名，什么是泛型别名，我的理解是一个类型别名还要一个泛型的参数
  type GConstructor<T> = new (...args: any[]) => T;

  // 泛型类型“GConstructor”需要 1 个类型参数。
  // 需要传一个具体的类型参数给 GConstructor
  // T 是一个泛型参数，然后至少是一个类，并且这个类至少有什么属性
  function extendNewClass<
    T extends GConstructor<{
      x: number;
      y: number;
      print: (name: string) => void;
    }>
  >(Base: T) {
    return class extends Base {
      getPosition() {
        console.log("鼠标初始为位置是", { x: this.x, y: this.y });
        return { x: this.x, y: this.y };
      }
      move() {}
    };
  }

  class Position {
    x!: number;
    y!: number;

    // 如果有
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    // 要加上 print
    print() {}
    move() {}
  }

  const MousePosition = extendNewClass(Position);
  const pointer = new MousePosition(1, 1);
  pointer.getPosition();

  // 另外一个例子
  class Sprite {
    name = "";
    x = 0;
    y = 0;

    constructor(name: string) {
      this.name = name;
    }
  }

  // 类是一个值，为什么可以作为类型参数传给泛型别名 ？？？
  // 类既可以当做一个值使用，也可以当做一个类型来使用
  // class D {}
  // let d: D = new D();
  function extendClass<T extends GConstructor<Sprite>>(Base: T) {
    return class extends Base {
      getProperty() {
        this.name = "ssss";
      }
    };
  }
}

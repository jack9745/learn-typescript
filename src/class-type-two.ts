namespace ClassTypeTwo {
  // Member Visibility 类成员的可见性

  // 类成员的可见性的默认值是public  表示在任何地方都可以访问
  // Because public is already the default visibility modifier,
  //  you don’t ever need to write it on a class member,

  class Greeter {
    public greet() {
      console.log("hi!");
    }
    protected getName() {
      console.log("hehe");
      return "123";
    }

    public useName() {
      let name = this.getName();
    }
  }

  class SpecialGreeter extends Greeter {
    public howdy() {
      // OK to access protected member here
      console.log("Howdy, " + this.getName());
    }
  }

  const instance = new SpecialGreeter();
  // instance.getName();
  // 不能通过实例来访问，
  // protected修饰的成员只能在声明它的类中和这个类的子类中才可以访问

  class Base {
    protected m: string;
    protected x: number = 1;
    constructor(m: string) {
      this.m = m;
    }
  }
  //  Exposure of protected members
  // Derived classes need to follow their base class contracts,
  // but may choose to expose a subtype of base class with more capabilities.
  //  This includes making protected members public:
  // 可以暴露受保护的成员，那么怎么暴露呢？
  // 修改成员的修饰符  改成public

  class Drived {
    // m: string;
    m = "";
    constructor(m: string) {
      this.m = m;
    }
  }
  let instance1 = new Drived("aa");
  instance1.m;

  class Derived2 extends Base {
    f1(other: Derived2) {
      other.x = 10;
    }
    f2(other: Base) {
      // 属性“x”受保护，只能通过类“Derived2”的实例进行访问。这是类“Base”的实例。
      // other.x = 10;
    }
  }

  // private 私有属性修饰符
  // 只能在定义它的类中访问 其他地方访问不到。

  class Person {
    private name = "jack";
  }
  // Because private members aren’t visible to derived classes,
  // a derived class can’t increase its visibility:

  // 我的理解，如果一个成员在基类中是私有属性，那么在子类中就不能改变它的可见性
  class Child extends Person {
    // name = "huangtao";
  }

  class MySafe {
    private secretKey = 12345;
  }

  const s = new MySafe();
  s["secretKey"];

  class Dog {
    #barkAmount = 0;
    personality = "happy";
    getBark() {
      this.#barkAmount;
    }

    constructor() {}
  }

  const dog = new Dog();
  // 实例上访问不了
  // dog.barkAmount;
}

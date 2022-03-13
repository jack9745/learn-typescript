// typescript中关于类的知识点
class People {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
//还可以这样初始化一个值
class People1 {
  name = "huangtao";
}

// 继承
class Animal {
  move(distance: number): void {
    console.log("动物跑了这么远了" + distance);
  }
}
class Dog extends Animal {
  // 重写了方法，参数类型要一样的？不一样还报编译错误
  move(distance: number): void {
    console.log("这只狗跑了这么远了" + distance);
  }
  bark() {
    console.log("woof ,woof");
  }
}
let dog = new Dog();

// 成员修饰符
/**
 *
 * 在typescript中成员默认的修饰符是public
 * */

// 用public修饰符显示的修饰属性和方法
class Animal1 {
  public name: string;
  public move() {}
  public constructor(name: string) {
    this.name = name;
  }
}

/**
 * private成员修饰符
 * 当成员被 private 修饰时，这个成员只能在类的内部访问 ，在外部是访问不到的
 * */

class Animal2 {
  private name: string;
  public constructor(name: string) {
    this.name = name;
  }
}
class Cat extends Animal2 {
  constructor(name: string) {
    super(name);
    // 父类的构造函数是要接受一个参数的，所以这里要传递一个参数，不然会编译错误
  }
}
let cat = new Cat("lovely cat");
let animal2 = new Animal2("dog");
animal2.name; // 在外部访问不到私有属性

class Worker {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
}
animal2 = new Worker("a");
/**
 * Animal2 和 Worker的类型结构 表面上看是一样的，但是他们的成员name
 * 都是被private修饰的,所以Animal2 和Worker里的name不是一样的，它们是没有关系的
 * */

// protected 修饰符
class Person {
  name: string;
  protected constructor(name: string) {
    this.name = name;
  }
  protected getName(name: string) {
    return this.name;
  }
  userName() {}
}
// let person = new Person("xiaomao");
// person.name; // name是受保护的属性，只能在在自己的类和子类中访问

// person.getName();
class Teacher extends Person {
  // 这里的name 为什么不能再用private修饰了呢
  name: string;
  constructor(name: string) {
    super(name);
    this.name = name;
  }
  teach() {}
  // 为什么可以没有参数,也不报错
  getName(name: string) {
    return this.name;
  }
}
let teacher = new Teacher("huangtao");

// 几个修饰符访问权限的问题

// public
/**
 * typescript中方法和属性默认的修饰符是public
 * 如果是被public修饰的属性和方法，在类中，类的实例中，子类和子类的实例中
 * 都可以被访问到，所以它的访问权限是最高的
 *
 * */

/**
 * protected 修饰符
 * 只能在类中和子类中使用，在类的实例和子类的实例中都不能使用,
 * 如果一个类的构造函数被protected修饰，那么这个类不能在外部被实例化，注意是在外部，
 * 但是还是可以被继承的
 *
 * */

/**
 *
 * public protected private 访问权限的问题
 * 被public修饰的属性和方法，访问权限最大，这个类和子类，类的实例，子类的实例都可以被访问到
 * protected修饰的属性和方法，访问权限次之 只有父类和子类中可以访问
 * private修饰的属性和方法，访问权限最小 ，只有在这个类的内部被访问到
 *
 * public > protected > private
 * */

/**
 *
 * 子类中属性和方法重写父类中方法和属性的问题
 * 重写的时候，子类中属性和方法的访问权限不能变小，
 * 重写方法的时候，参数类型和顺序要相同,返回值的类型也要相同（这里说的不完全正确，后面再总结）
 * */

/**readonly 修饰符
 *只读属性必须在声明的时候被初始化，或者在构造函数里被初始化
 *
 */
class Duck {
  readonly name: string;
  readonly color: string = "red";
  constructor(name: string) {
    this.name = name;
  }
  setName() {
    // 这里不能再设置值了 因为name是只读属性
    this.name = "4567";
  }
}
let duck = new Duck("xiaoyazi");
// 这里也不能重新赋值
duck.name = "123";

// 静态属性
/**
 * 前面讨论的属性都是实例的成员
 * 我们也可以创建类的成员，这些属性存在类的身上，而不是属性的身上
 * 怎么声明一个静态属性 用static修饰符
 * 访问静态属性时，通过类来访问*/
class House {
  static price: number = 30000;
  getPrice() {
    return House.price;
  }
}
House.price;
export default People;

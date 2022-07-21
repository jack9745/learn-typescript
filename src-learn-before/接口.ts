/**
 * 什么是接口？
 * 也是定义类型的一种方式
 * 书上说接口和类型别名是同一概论的两种句法，就像函数表达式和函数声明之间的关系
 *
 * 为什么要用接口？
 *
 *
 * 怎么用接口，怎么声明接口？
 * 用interface关键字声明接口
 *
 * */

interface Person {
  name: string;
  age: number;
  address: string;
}

// 提示标识符重复
// type Person = {};

type People = {
  age: number;
  name: string;
  address: string;
};
// 相同结构的接口和类型别名和相互替换使用

// 接口扩展
interface Student extends Person {
  studentId: string;
}

// 接口可以扩展接口，也可以扩展任何结构，对象类型，类，或者其他接口

/**
 * 下面总结一下 类型别名和接口之前有啥区别
 * 1.类型别名比接口更为通用，类型别名的右边可以是任何类型，包括类型表达式
 * 而接口声明中，必须为结构
 * 2.扩展接口时，Typescript将检查扩展的接口是否可以赋值给被扩展的接口
 * 3.同一作用域下，多个同名接口将自动合并，同一作用域下，相同的类型别名将会导致编译时错误
 * */


interface A {
  good: (x: number) => string;
  bad: (x: number) => string;
}

interface B extends A {
  good: (x: string | number) => string; // 类型不兼容
  bad: (x: string) => string;
}


/**
 * 知识点
 * 接口的声明合并
 * 什么是接口的声明合并
 * 就是将同一作用域下，具有相同名称的接口组合，合并到一起
 *
 *
 * */
interface User {
  age: number;
}

interface User {
  name: string;
}

let aa: User = {
  age: 12,
  name: "huangtao",
};

/**
 *
 * 需要注意的地方，上下两个接口不能有冲突，在一个接口中声明某个属性的类型是T,
 * 但是在另外一个相同名称的接口中却声明该属性的类型是U,由于T 和U是两种类型
 * Typescript将会报编译时错误
 * 所以下面的例子将会报错。
 * */

interface Worker {
  age: number;
}

interface Worker {
  age: string;
}

// 接口实现
/**
 * 怎么实现接口
 * 一定是用类来实现接口吗？ 我的理解好像是的
 *用 implements 关键字来实现接口
 *
 * */

interface Animal {
  color: string;
  eat: (food: object) => string;
  sleep: (time: Date) => Date;
}

interface Fish {
  swim: () => void;
}
class CatCanFly implements Animal, Fish {
  color: string;
  constructor(color: string) {
    this.color = color;
  }
  eat(food: object) {
    return "eat";
  }
  // 为什么没有写参数 不报错，接口中是有参数的
  sleep() {
    return new Date();
  }
  swim() {}
}

// 实现接口需要注意的地方
/**
 * 接口中可以声明实例属性和方法，但是不能用修饰符，如private，protected，和public，
 * 一个类不限于只能实现一个接口，可以实现多个接口，多个接口之间用逗号分隔，
 * */

//实现类还是扩展抽象类
// 这个问题值得思考

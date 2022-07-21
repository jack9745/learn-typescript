let a: object = {
  b: "x",
};
a.b; // 这里为什么会报错，说对象a上不存在属性b，

//书上是这么说的 上面这种注解变量a的方式，只能表示a的类型是object，
//不知道有属性b, 不甚理解

Object.assign(a, { c: "234" });
/**
 *  声明对象类型的第二种方式 称为对象字面量句法，
 * 不要与类型字面量搞混了
 * 这种声明方式是让类型系统自动推导对象的结构
 *  还有一种方式是让显示的注解结构类型
 * **/
let c = {
  b: "x",
};
c.b;
Object.assign(c, { c: "123" });

/**
 * 显示的注解结构类型,
 * 我的理解这种也是对象字面量句法，不过是显示的注解了结构类型
 * **/
let d: { name: string } = {
  name: "jack",
};

/**
 * 使用const声明 对象时的类型推导
 *
 */

const e = {
  num: 12,
}; // 结构类型是{num:number}，而不是{num:12}
e.num = 13; // 所以这样操作是么有问题的
/**
 * 需要注意的是 ，这里类型系统推导出来的b是一个数字，而不是字面量12
 *
 * 需要注意的是，与用const声明 number，string，boolean 等简单类型的数据不同的是
 * 用const声明对象不会导致类型系统把推导出来的类型缩窄，
 * 为什么要这样做呢，
 * 因为对象是可变的，在创建了对象之后，对象的某个属性可能会发生变化，
 */

/**
 * 什么是对象字面量
 * 书上是这样说的，这个东西结构是这样的，
 * 这个东西可能是一个对象字面量，可能是一个类
 *
 */

// 练习
let nameInfo: {
  firstName: string;
  lastName: string;
} = {
  firstName: "john",
  lastName: "barra",
};

class Person {
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Student {
  constructor(public firstName: string, public lastName: string) {
    // 其实下面两句话可以不要，是一样的效果
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
/**
 *  在类中声明了 firstName属性和 lastName属性，
 * 所以创建出来的实例也有这两个属性，那么就可以赋值给nameInfo
 * */
nameInfo = new Person("jack", "rouse");
nameInfo = new Student("jack", "rose");

// 下面来讨论下给一个对象添加额外的属性或者减少必要的属性会发生什么
/**
 *Typescript 对 对象的属性要求十分严格，如果声明对象有一个类型是number的属性b，
 那么少了这个属性b，或者多了其他属性，都会报错
 *
 * */

let obj: { name: string };
obj = {}; //这里会报错，因为缺少了name属性
obj = {
  name: "huangtao",
  age: 18,
}; //这里多了一个age属性，在给obj显示注解的时候并没有age属性，所以会报错
// 下面才是对的
obj = {
  name: "jack",
};

/**
 * 声明以及赋值的一些问题
 * 如果先声明变量，然后再初始化，那么一定要保证在使用该变量之前一定要将该变量初始化
 *
 *
 * */
// 错误示例
let num: number;
let anNum = num * 3; // 这行代码会报错，在初始化之前使用了变量，这样是不对的

// 下面才是对的
let initNum: number;
initNum = 10;
let computedNum = initNum * 3;

export default initNum

// 怎么理解字面量类型
/**
 * 对于字面量类型，可以理解为是对原始数据类型的进一步收敛，是比原始类型更加
 * 精确的类型
 *因此对于extends语法是成立的
 *
 * */
// 定义一个返回值的code码
type ResCode = 200 | 500 | 400;

interface Foo {
  status: "success" | "failuse";
}

// 这句话是没有毛病的
// 我的理解 extends表达的意思是 前者是不是后者的子类,或者说是派生类
type Test = "abc" extends string ? true : false;

// 感叹号表示啥意思 ？忘记了
class Base {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Derived extends Base {
  age!: number;
}

type Bool = Derived extends Base ? true : false;

type T1 = { name: "huangtao" } extends Base ? true : false;
type T2 = { name: "huangtao"; age: 12 } extends Base ? true : false;

const test = function (flag: T1) {
  console.log(flag);
};
// T1 是字面量布尔值  值是true
const bool: T1 = true;

// 值也是true，所以我的理解 父类中有的子类中要有，并且类型相同，这样值才是true
const bool1: T2 = true;

type T3 = { name: true } extends Base ? true : false;
// 看到了没有，值是false
// 前者是不是后者的子类，必须是父类中的属性，子类必须有，并且是类型相同
const bool3: T3 = false;

// 由于空对象内部没有属性，所以认为任何对象都是它的子集
type T5 = { name: "jackhuang" } extends {} ? true : false;
// 条件为真
const bool5: T5 = true;

test(bool);

// 什么是 Top type  什么是 Bottom type
/**
 *
 * any 和unknown 是类型层级的顶端，
 * 这是啥意思呢，表示任何类型都是他们的子类型
 * 而never是类型层级的底端，
 * 没有其他类型可以赋值给这个类型，除了它自己
 * */

/**
 * 下面研究一下 预定义的条件类型
 * Exclude<T,U> 表示啥意思呢 表示从类型T中除去可以赋值给U类型的类型 ，
 * 我的理解表示还剩下什么类型的
 *
 * Extract<T,U> 表示啥意思呢 表示T中有哪些类型是可以赋值给类型U的类型的
 * 我的理解是从两个类型中选出都有的类型
 *
 * NonNullable<T> 表示从T中去除 null 和undefined
 *
 * ReturnType<T> 表示获取函数的返回值类型*/

type T_Exclude = Exclude<string | boolean, boolean>;
// T_Exclude 类型是string类型
const string1: T_Exclude = "false";

// 选出交集类型
type TT_Extract = Extract<string | number, number>;
const number1: TT_Extract = 133;

// 获取函数返回值的类型
type TR = ReturnType<() => string>;

// 这样也可以
const getName = function (name: string): boolean {
  return true;
};
// getName 表示一个值，我的理解用typeof可以获取函数的类型？
type TFunction = ReturnType<typeof getName>;

// 会报错，提示不满足约束条件
type T17 = ReturnType<string>; // Error

// 除去null 和undefined类型
type My_NonNullable = NonNullable<string | null | undefined>;

const myName: My_NonNullable = "huangtao";

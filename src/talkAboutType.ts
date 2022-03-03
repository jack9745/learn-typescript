//谈论类型

// any类型
// 先说一句话，不要轻易的 用这种类型，
/**
 * any包含任何值，而且可以对其做任何操作，这意味着any类型的值可以做加法，也可以做减法，
 * 也可以调用任何方法，一切皆可以，
 * any类型的值就像常规的js代码一样，类型检查器完全发挥不了作用
 *
 * */
// 如果想使用any 一定要显示的注解
let a: any = 666;
a.speak(); // 调用一个存在的方法而不报错
let b: any = ["danger"];
let c = a + b;

/**
 * 如果想让tsc在遇到隐式的any类型报错，可以在tsconfig.js中开启 noImplicitAny
 * implicit 是什么意思，哈哈，是含蓄的意思
 * */
export default c;
// ------------------------------------------
// ------------------------------------------
// unknown类型
/**
 * 书上是这么介绍的，如果不能预知一个值的类型，不要使用any，应该使用unknown
 * 与any类似，unknown也表示任何值，但是typescript会要你再做检查，细化类型
 *
 * 那么问题来了，unknown类型的值支持哪些操作呢 ，来细化检测类型？？？
 *
 * unknown类型的值
 * 可以比较 ==，===，&&，|| ，？
 * 可以否定  ！
 * 还可以使用typeof，或者instanceof  运算符来细化检测
 * 
 *
 * */

let num: unknown = 30;
let myBool = num === 30; // myBool 类型是boolean
// 这里是会编译不通过，因为这里不能假设unknown类型为某种特定类型
let plusResult: number;
plusResult = num + 10; // 这里会编译不通过
// 必须先向typescript证明一个值确实是某种类型，比如下面证明num是数值类型的值
if (typeof num === "number") {
  plusResult = num + 20;
}

// boolean 类型
let boolA = false; // 类型系统会推导出boolA的类型是boolean
const boolB = false; // 可以明确的告诉类型系统，值为某个具体的布尔值
// boolB = true; //如果打开注释这里会编译不通过 ，因为boolB是常量，不能重新赋值
let boolC: false = true; // 这里是错误的。Type 'false' is not assignable to type 'true'
let boolD: true = true;
let stringA: "huangtao" = "jack"; //错误

/**
 * 什么是类型字面量
 * 书上是这样说的：仅表示一个值的类型，
 * 我的理解，就是类型设置为某一个值，上面这句话的重点是一个值。
 *
 * 用const声明一个变量，类型系统会推导出这个值的类型是类型字面量，
 *
 * 第二只种情况是使用类型字面量显示的注解变量的类型，如下
 * let stringB:"jack" = "jack"
 *
 * 书上说类型字面量是一个很强大的语言特性，暂时还没有看你出来强大在哪里
 *
 * **/

// number type
let numberA = 23; // 类型是number
const numberB = 56; // 56
let boolE = numberA > numberB; //可以进行比较操作

// string type

let stringB = "hello,world";
let stringC = stringB.split(",");
let stringD = stringB.indexOf("c");

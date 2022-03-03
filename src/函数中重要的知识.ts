/**
 * 我们已经知道如何注解函数的参数的类型和返回值的类型
 * */

import { NamedTupleMember } from "typescript";

/**
 * 接下来要学习如何函数自身的完整类型
 * 通常我们定义一个函数是这样的
 *
 * */
function sum(a: number, b: number): number {
  return a + b;
}

// 但是还可以怎么定义呢
//  (a: number, b: number) => number;
// 这是Typescript中表示函数类型的句法，称为调用签名，也叫类型签名
// 注意观察，调用签名的句法和箭头函数十分相似，这是有意为之

// 什么 类型层面和值层面代码
/**
 * 只有类型和类型运算符层面的代码
 * 如果是有效的JavaScript代码就是值层面的代码
 * */

/**
 * 什么是函数的调用签名
 * 我的理解：就是注解函数自身的类型
 *
 * 为什么要用调用签名
 * 重点
 * 如果要将函数作为参数传给另外一个函数，或者一个函数的返回值也是函数，
 * 那么就要用这样的句法注解类型。
 *
 *
 * 怎么用调用签名
 * 1.函数的调用签名只能有类型层面的代码，不能有值层面的代码
 * 比如 只能有类型，不能有值，
 * 因此函数的调用签名中可以有返回值的类型，参数胡的类型，this的类型，
 * 剩余参数的类型，可选参数的类型，
 * 但是不能有默认值的表示，因为它是值，不是类型
 *
 * 2.必须 显示的注解函数返回值的类型
 * 调用签名么有函数的定义体，
 * 所以无法推导出返回的类型，所以必须显示的注解返回类型
 * */

// 重点 函数调用签名的写法
// 如下例子
type Greet = (name: string, userId: string) => string;
type Log = (message: string, userId?: string) => void;
type Sum = (...number: number[]) => number;

/**
 * 由上面的例子可以看出：函数调用签名的格式
 * 括号里是对参数的注解，箭头右侧是对返回值的注解
 *
 * **/

/**
 * 根据调用签名来声明函数，
 *
 */
let log: Log = (message, userId = "abcdefg") => {
  let time = new Date().toISOString();
  console.log(time, message, userId);
};

log("abc", "abcd");

/**
 * 实现函数调用签名的过程中需要注意的地方
 *
 * 1.定义一个函数，显示的注解函数的类型是某一个调用签名
 * 2.不必再次注解参数的类型，因为在函数调用签名中已经注解了参数的类型 ,
 * typescript能从调用签名中推导出来
 * 3.无需注解返回值的类型，因为能从函数调用签名中推导出来
 *
 * 实践证明如果显示的注解正确也是可以的，
 * */

type F = (index: number) => void;
const times = (f: F, n: number) => {
  for (let i = 0; i < n; i++) {
    f(i);
  }
};
const f = (n: number) => {
  console.log(n);
};
times((n) => console.log(n), 10);

/**
 * 重载函数
 * 有多个调用签名的函数
 * */

// 简写形式的函数调用签名
type Log1 = (message: string) => void;

// 完整类型的函数调用签名
type Log2 = {
  (message: string, userId?: string): void;
};
// 注意简写形式和完整形式写法上的区别

/**
 * 如何 声明多个重载的函数签名
 * */

type Travel = {
  (from: Date, to: Date, destination: string): void;
  (from: Date, destination: string): void;
  // 组合后的签名
  // (from: Date, toOrDestination: Date | string, destination?: string):
  //   | string
  //   | number;
};
// 上面的代码中，书上说重载签名中不能有组合后的签名，但是这里也么有报错

let travel: Travel = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => {};

/**
 * 如果定义的一个函数，要实现多个重载的函数调用签名
 * 这个函数的类型是各个签名的并集
 * 那么在实现这个函数时要一次性实现整个类型的组合
 * 实现这个函数时，我们要自己设法声明组合后的调用签名
 * */

/**
 * 实现函数的重载签名的过程中需要注意的地方
 * 1   声明多个重载的函数签名
 * 2   自己动手组合签名，主要是组合签名中的参数
 * 3   由于实现的函数可以通过多种方式被调用，
 *     那么在实现函数时要像typescript证明你检查了调用方式*/

// 之前重载的都是函数表达式，
// 重载函数声明
function createElement(tag: "a"): HTMLAnchorElement;
function createElement(tag: "table"): HTMLTableElement;
function createElement(tag: "canvas"): HTMLCanvasElement;
// 没有其他标签的重载签名
function createElement(tag: string): HTMLElement;

// 实现重载签名
function createElement(tag: "a" | "table" | "canvas" | string) {
  if (tag === "a") {
    return document.createElement("a");
  } else if (tag === "table") {
    return document.createElement("table");
  } else if (tag === "canvas") {
    return document.createElement("canvas");
  }
  return document.createElement(tag);
}
createElement("div");

type CreateElement = {
  (tag: "a"): HTMLAnchorElement;
  (tag: "canvas"): HTMLCanvasElement;
  // (tag: string): HTMLElement;
};

// 怎么解决下面的错误呢？？？
let createElement1: CreateElement = (
  tag: "a" | "canvas"
): HTMLAnchorElement | HTMLCanvasElement => {
  if (tag === "a") {
    return document.createElement("a");
  } else {
    return document.createElement("canvas");
  }
};

// 上面的错误说不能将定义的函数赋值给 CreateElement 类型，
// 目前还不知道怎么解决这个问题
// 我的理解是 重载函数表达式适合各个签名的返回值都是相同类型的
// 如果 各个签名的返回值的类型不一样，适合用重载函数声明的方式


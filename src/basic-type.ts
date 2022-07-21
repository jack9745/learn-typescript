export type Book = {
  author: string;
  page: number;
  published: string;
};
// Union Type 联合类型
const printId = (id: string | number) => {
  // 注意这里会提示错误 ，为什么呢？
  // console.log(id.toUpperCase());

  // TypeScript will only allow an operation if it is valid for every member of the union.
  // For example, if you have the union string | number,
  //  you can’t use methods that are only available on string:

  // 悬浮提示错误
  // Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.

  // 解决办法
  // The solution is to narrow the union with code,
  if (typeof id === "string") {
    console.log(id.toLocaleLowerCase());
  } else {
    console.log(id);
  }
};

// Sometimes you’ll have a union where all the members have something in common.
// For example, both arrays and strings have a slice method.
//  If every member in a union has a property in common, you can use that property without narrowing:

//如果，参数x 的类型是个联合类型，并且有公共的api，这个时候可以不用判断成员的类型

// 前提是只能使用各个类型中公共的方法
const getFirstThree = (x: number[] | string) => {
  return x.slice(0, 3);
};

// Type Aliases 类型别名
// 什么是类型别名：我的理解就是定义一个类型，然后取个名字，
// 用type 关键字来定义
// 类型别名有什么好处  一处声明，到处使用
// 语义化
// 我们可以给任意类型 取个别名
type Point = {
  x: number;
  y: number;
};
type Id = string | number;

// Interfaces 接口
// 什么是接口 ，另外一种声明对象类型的方式
// 如果名字是Point 会提示标识符重复
interface Point1 {
  x: number;
  y: number;
}
// obj的类型是个对象类型，我们可以在参数的位置直接声明对象类型
const printCoord = (obj: { x: number; y: number }) => {
  return { x: obj.x, y: obj.y };
};

printCoord({ x: 1, y: 1 });

let obj: Point = {
  x: 12,
  y: 12,
};
printCoord(obj);

/**
 * Just like when we used a type alias above,
 * the example works just as if we had used an anonymous object type.
 * TypeScript is only concerned with the structure of the value we passed to printCoord
 * - it only cares that it has the expected properties.
 * Being concerned only with the structure and capabilities of types
 * is why we call TypeScript a structurally typed type system.
 *
 * */

// typescript 只关心 传给printCoord的参数的结构，
// 关心这个参数的结构是不是typescript期望的
// 而不关心参数的类型是怎么怎么声明的，是用type,还是interface ,还是直接写在参数的类型中
// 只关心我们的传参是不是和参数的类型是一样的结构，
// 所以我们称typescript是结构类型的类型系统 *********

// Interface vs Type  接口和类型别名的共同点和区别

// 都能定义类型，interface几乎能够支持的，type都能够支持
// 我的理解  interface只能定义对象类型的类型结构，
// 而type的功能更强大，可以定义简单的类型，也可以定义复杂的类型
// interface可以重复声明，来定义添加不同的属性，而type不行

// Type Assertions 什么是类型断言
//
// const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// myCanvas.getContext("2d");

// 类型守卫，或者说是 类型保护
// typeof 操作符

// 缩小类型的判断方法
//

// Using type predicates  翻译过来也是类型断言

// however sometimes you want more direct control over how types change throughout your code.

// To define a user-defined type guard,
//  we simply need to define a function whose
//  return type is a type predicate:

type Fish = { swim: () => void };
type Bird = { fly: () => void };

// 这种方式用户自己定义类型守卫，或者叫做类型保护
// 注意返回值的类型，
// pet is Fish is our type predicate in this example.

function isFish(pet: Fish | Bird): pet is Fish {
  // 要返回布尔值
  return !!(pet as Fish).swim;
}

let fish: Fish = {
  swim() {},
};
let bird: Bird = {
  fly() {},
};
let isFishResult1 = isFish(fish);
console.log(isFishResult1); // true
let isFishResult2 = isFish(bird);
console.log(isFishResult2); // false

// void 类型可以有哪些操作符呢
//  == 好像可以
//  void和函数返回值的关系
// 如果一个函数的返回值类型是void表示 函数不能有显示的return语句，
// 如果有也不能有任何明确的返回值 ，也就是return后面不能跟任何返回值，就是return

// Parameter Destructuring

// 参数解构 指的是定义函数的时候，将参数提供的对象解包到函数body中的一个或者
// 多个局部变量中

// You can use parameter destructuring to conveniently unpack objects
//  provided as an argument into one or more local variables in the function body.
// In JavaScript, it looks like this:

function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });

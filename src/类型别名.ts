/**
 * 什么是类型别名 what ?
 *
 * 自己定义一种数据结构，并且给属性定义数据类型，取一个名字
 * 或者更简单一点说是 定义一种类型，然后取个名字
 *
 *
 * 为什么要使用类型别名 why
 *
 * 更加容易理解，更加语义化，就像上面定义Person那样，
 * 减少重复输入复杂的类型
 *
 *
 * 怎么使用类型别名 how
 *
 * 像声明变量那样，不过要使用type关键字
 * 使用注意事项
 * 同一作用域下， 同一类型不能声明两次，这里要注意的是同一作用域
 * */
// 我们可以用const,let,var 为值声明别名
// 我的理解：'huangtao'这个值的别名就是变量 name
const name = "huangtao";
// 在这里 number 的别名就是Age
type Age = number;
type Person = {
  name: string;
  age: Age;
};

let age: Age = 50;

let driver: Person = {
  name: "James Ado",
  age,
};

/**
 * 什么是类型别名:
 *
 */

/**
 * 为什么要使用类型别名：
 *
 * 更加容易理解，更加语义化，就像上面定义Person那样，
 * 减少重复输入复杂的类型
 */

// 怎么声明类型别名

//下面是错误的
type Color = "red";
type Color = "green";

// 同样与let 和，const一样的是，
// 类型别名采用块级作用域，在声明的作用域之外是访问不到的

type Size = number;
let x = Math.random() < 0.5;
if (x) {
  type Size = number;
  let b: Size = 100;
  if (true) {
    let d: Size = 90;
  }
}
const c: Size = 90;

type Price = 100; // 还可以这样 声明类型别名  100的类型别名是Price

export default Price;

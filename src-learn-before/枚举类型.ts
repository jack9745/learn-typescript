// 枚举类型
/**
 * 什么是枚举类型
 * 一种基本数据类型，用于声明一组常量的集合，
 * 当一个变量有几种可能的取值时，可以将它定义为枚举类型。
 * 有效的防止用户提供无效的值
 *
 * 怎么声明一个枚举类型
 * 用 enum关键字
 *
 * 怎么声明一个安全的枚举类型
 * const enum
 * enum 关键字前加上const关键字
 * */

enum Languge {
  EngList,
  Russsia,
  Chinese,
}

let a = Languge.EngList;
let b = Languge[0];
let c = Languge[6]; // Languge[6]并不存在所以这样会存在安全问题
console.log(a); //0
console.log(b); // English
enum Color {
  Red = "red",
  Blue = "blue",
  White = "white",
}
let red = Color[0]; //undefined
console.log(red);
let blue = Color.Blue; // 'blue'
console.log(blue);
let yellow = Color.Yellow; // 提示不存在Yellow属性
enum Age {
  a = "a",
  b = "b",
}
const enum People {
  Student = "student",
  Worker = "worker",
}
let student = People["Student"];

const getUser = function (user: People) {
  return;
};
getUser(People.Student);
getUser(People.Worker);
getUser("student"); // 'student'不能赋值给People 类型
// 编译之后运行怎么报 People is not undefined
//字符串类型才可以访问常量枚举成员
// let worker = People[1];

const enum Animal {
  Dog,
  Fish,
  Cat,
}
let dog = Animal.Dog;

// 编译之后运行报错
let fish = Animal[1];
// Animal is not defined
console.log(dog);

// 使用枚举类型需要注意的地方

// 枚举名称为大写的单数形式，枚举中的键也为大写
/**
 * 枚举中的值可以用点号，或者方括号访问，
 * typescript允许值访问枚举，也可以通过键名访问枚举
 * 我的理解通过值访问枚举，就是通过数字访问枚举，这样是不安全的，
 * 因为这个值不一定存在在枚举中
 *
 * 所以可以用const enum来声明枚举的安全子集
 * const enum不允许反向查找，不允许通过值来查找键名，只能通过键名来查找值
 *
 *
 * 还有一个建议就是在枚举中不要是数值类型的值，使用字符串类型的值。
 * */

export default Languge;

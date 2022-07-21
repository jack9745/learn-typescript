// 类型也可以引入的
import { Book } from "./basic-type";
import "./basic-type";
import "./object-type";
import "./class-type";
import "./class-type-two";
import "./parent-and-child";
// import * as SomeModule from "./SomeModule";
import { fn } from "./SomeModule";
// import add from "./test/add"; // 如果是个包的名字，而不是路径，是会从node_modules中查找的
// console.log(add);
fn();
// SomeModule.fn();
let book: Book = {
  author: "huangtao",
  published: "深圳出版社",
  page: 900,
};
console.log(book);
let userName: string;
userName = "jack huangtao";
console.log(userName);
let dom = document.getElementById("text") as HTMLInputElement;
// 肯定它是HTML元素，并且是存在的可以用类型断言
let box = document.getElementById("box") as HTMLElement;
console.log(box.innerHTML);
console.log(dom.value);
let nameList: string[];
nameList = ["huangtao", "jack", "rose"];
nameList.forEach((item) => {
  console.log(item.toUpperCase());
});

type myBool = false | true;
let bool: myBool = false;

interface Circle {
  type: "circle";
  radius: number;
}
interface Square {
  type: "square";
  size: number;
}

interface Rectangle {
  type: "rectangle";
  height: number;
  width: number;
}

// 什么是类型别名 ，我的理解是自己定义某种类型，然后取个语义化的名字，
// 为什么要这样做，有什么场景 ，语义化，好理解  定义之后可以到处引用
type Shape = Rectangle | Circle | Square;
let shape: Shape = {
  type: "rectangle",
  height: 900,
  width: 900,
};

const computedArea = (shape: Shape): number => {
  if (shape.type === "circle") {
    return Math.PI * shape.radius ** 2;
  } else if (shape.type === "rectangle") {
    return shape.height * shape.width;
  } else if (shape.type === "square") {
    return shape.size ** 2;
  }

  // 缺少这行代码
  return 0;
};
let area = computedArea(shape);
console.log(area);

type A = keyof Rectangle; //  'type' | 'width' | 'height'
let a: A = "type"; // ???
let b: Rectangle["width"]; // number
b = 90;

function liveDangerously(x?: number | null) {
  // No error
  // !.是非空断言语法  表示这个值一定不是空的，
  // 就是在编译时告诉typescript，这个变量或者属性的值不是空的，
  // 让typescript 不在编译时报错，告诉typescript，这里是非空值，让编译通过
  console.log(x!.toFixed());
}

// 如果不传入值 在运行时还是会报错的，
// liveDangerously();

const printName = ({ first, last }: { first: string; last?: string }) => {
  console.log(last);
  if (last) {
    return first + last;
  }
  return first;
};

// 下面两种传参情况都可以
printName({ first: "huangtao" }); // undefined
printName({ first: "huangtao", last: "jack" });

class OldPeople {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.age = age;
    this.name = name;
  }
}

// 什么是类型断言 what how when
// TypeScript only allows type assertions which convert to a more specific or less specific version of a type.
//  This rule prevents “impossible” coercions like:

const x = "hello" as string;

const getLength = (something: string | number): void => {
  // 如果实际传入的是一个数字，依然会报错
  let length = (something as string).length;
  console.log(length);

  // 这样是错误的，我的理解是不能将断言作为判断一个值的类型的条件语句
  // if (something as string) {
  //   return something.length;
  // }
};

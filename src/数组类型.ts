let a = [1, 2, 3]; // number
a.push(5);
a.push("rose");
/**
 * 上面初始化变量a时，传入给数组的都是数字，
 * 所有Typescript推导出来的数组的成员类型是number
 * 将 5推入到数组，Typescript允许该操作，推入成功
 * 但是将"rose"推入数组时失败了，因为rose 不是number类型
 * */

let b = ["rouse", "jack"]; // string
b.push(false);

/**
 * 下面给c初始化是，传入给数组的是12，和'book',
 * 所以Typescript推导出来c的成员的类型必须是number类型和string类型，
 * 尝试 推入其他类型就会报错
 * */
let c = [12, "book"]; // number | string
c.push(13);
c.push("xiaoming");
c.push(false);

/**
 * 初始化g时时一个空数组，所以Typescript不知道数组元素的类型，
 * 那么 推导出来的类型是any，所以下面的操作都是正确的
 *
 */
let g = [];
g.push("xiaoming");
g.push(3);
g.push(false);

/**
 * 数组类型的注解 支持两种类型
 * T[]  和   Array<T>
 * 其中T表示数组成员的类型
 *
 */

let h: number[] = [];
h.push(123);
h.push("xiaohua"); // 编译错误，应为xiaohua不是number类型的成员
let e: Array<string> = [];
e.push("a");

let list: (string | number | boolean)[] = [];
list.push("huangtao");
list.push(123);
list.push(false);

let anList: Array<string | boolean | number> = [];
anList.push("huangtao");
anList.push(false);
anList.push(123);

/**
 * 一般情况下，我们好让数组保持同质，
 * 什么是同质，就是数组的成员的类型保持一致，不要有多个类型
 * */

let f = ["xiaohuahua", 12];
let aa = f.map((item) => {
  return item * 3; // 这一行会报错，因为 字符串不能进行乘法操作
});

/**
 * 经推导，f的成员的类型可以是string类型，也可以是number类型，
 * 因此，使用之前要检查成员类型
 * 正确的写法应该如下
 * */

let ff = ["xiaohuahua", 12];
let bb = ff.map((item) => {
  if (typeof item === "number") {
    return item * 3;
  } else if (typeof item === "string") {
    return item.toUpperCase();
  }
});

// 用const 声明数组不会让推导类型缩窄
const cc = ["abc", 12]; // 数组的成员可以是 string number

/**
 * 什么是元组
 * 元组是array的子类型，是定义数组的一种特殊形式，
 * 元组的长度要固定，成员的类型要是已知类型，就是类型要明确
 * 声明元组时，必须显示的注解类型
 *
 * 为什么要使用元组
 * 目前还不知道，有的场景应该可以用到
 *
 * 怎么声明元组
 * 看下面的例子
 *
 * */

let turpleA: number[] = [1];
turpleA.push(2);

let turpleB: [number] = [1];
turpleB.push(2); // 这里为什么还可以push操作？？
console.log(turpleB);
turpleB = [1, 2, 3];

let turpleC: [string, string, number] = ["xiaohua", "xiaomao", 123];
turpleC.push("abc"); // 这样也可以 ?
turpleC = ["xiaomao", "false", 3455];
// 这样就不可以了 元组的长度是3，这里是四个
turpleC = ["xiaomao", "xiaogou", 456, false];

// 支持可选的元素
/**
 * 注意点 可选参数要在必选参数的后面，不运行在前面
 * 可选参数的表示方式：就是在类型后面加一个问号?
 */
let bookList: [string, string?] = ["vueJs", "DOM编程艺术"];
bookList = ["VUEJS"];

// 元组也支持剩余参数

let familyList: [string, ...(string | number)[]] = ["huangtao"];
familyList = ["xiaomao", "xiaogou", "huangtao"];

// 只读数组和元组
/**
 * 什么是只读数组，
 * 只读数组和常规数组没有多大区别，只是不能就地更改
 * 什么是就地更改：就是不能改变原数组，比如不能使用splice等方法
 *
 * 为什么要使用只读数组
 * 不希望原数组被改变
 *
 * 怎么声明只读数组
 * 用readlonly修饰符修饰，放在类型注解的前面
 * */

let boxList: readonly string[] = ["box1", "box2"];
let phoneList: ReadonlyArray<string>;
let listOne: Readonly<string[]>;
let listTwo: readonly [number, string];
boxList.concat("box3");

// 不能用splice 因为这个方法能改变原数组，而boxList是只读的
boxList.splice(0, 1);

// 这样也不可以，因为是只读数组 ，只能用于读取
boxList[0] = "box3";
boxList.push("abc"); // push方法也不可以，因为会改变原数组

export default boxList;

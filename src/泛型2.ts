/**
 * 什么是泛型别名
 * 我的理解就是可以在类型别名中使用泛型参数
 *
 * 在类型别名中只有一个地方可以使用泛型，
 * 就是在别名之后，等号之前
 * */

type MyEvent<T> = {
  target: T;
  type: string;
};

// 显示的绑定具体类型
type ButtonType = MyEvent<HTMLButtonElement>;

let buttonType: ButtonType = {
  target: document.createElement("button"),
  type: "click",
};

let myEvent: MyEvent<HTMLElement | null> = {
  target: document.querySelector("#abc"),
  type: "click",
};

// 使用泛型别名的时候，要显示的绑定类型

// 这个例子也一样，只不过是绑定了泛型T

function triggerEvent<T>(event: MyEvent<T>) {}

// ----------受约束限制的泛型--------------

/**
 * 有时候我们想表示某个泛型至少是一个什么类型
 * 该用什么句法来表达这个意思
 * <T extends U> 句法
 * */
type TreeNode = {
  value: string;
};

type LeafNode = TreeNode & {
  isLeaf: true;
};

type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode];
};
// 我们首先要搞清楚上面三个类型别名是什么关系
// 我的理解：TreeNode是 LeafNode 和 InnerNode 的父类型，
// LeafNode 和 InnerNode 之间没有关系
let a: TreeNode = {
  value: "a",
};
let b: LeafNode = {
  value: "b",
  isLeaf: true,
};
let c: InnerNode = {
  value: "c",
  children: [b],
};

// 下面有这样的场景，我们要编写一个函数
// 映射一个节点称为新的节点，但是节点的类型不变

type MapNode = {
  <T extends TreeNode>(node: T, f: (value: T) => void): T;
};

let mapNode = function <T extends TreeNode>(
  node: T
  // f: (value: string) => string
): T {
  let value = node.value.toUpperCase();
  node.value = value;
  return node;
};
mapNode({ value: "123" });
mapNode(a);
// 讲解mapNode
/**
 * 怎么理解这一句泛型声明 <T extends TreeNode>
 * mapNode定义了一个泛型参数T,T的类型至少是一个NodeTree类型的
 * 也就是说T可以是NodeTree类型的，也可以是NodeTree的子类型
 *
 * */

/**
 * 那为什么要这样声明T呢
 * 如果只有T,没有extends TreeNode ，那么Typescript就会抛出编译时错误，
 * 因为这样不能从T类型的node中安全读取node.value(试想你传入了一个字符串或者数字)
 *
 * 如果不用泛型T,直接用确定的类型，
 * 比如TreeNode,那么就做不到传入什么类型的节点，就输出什么类型的节点
 *
 * */

// 受多个约束条件限制的泛型
/**
 * 上面例子将的是只给泛型施加了一个约束条件
 * 如果想给泛型施加多个约束条件 怎么玩呢
 * 方法就是扩展多个约束条件的交叉类型
 *
 * */

type AgeInfo = {
  age: number;
};
type NameInfo = {
  name: string;
};

const printInfo = <T extends AgeInfo & NameInfo>(obj: T): T => {
  console.log(obj);
  return obj;
};

printInfo({ age: 12, name: "huangtao" });

/**
 * 可以为泛型指定默认类型
 *
 * */
// 表示T的默认类型是HTMLElement
type MyCustomEvent<T = HTMLElement> = {
  target: T;
  type: string;
};

let clickEvent: MyCustomEvent;

// 我们可以为T设置限制，确保T是一个HTML元素
// 既有默认类型，设置了限制 ，语法上怎么写
type MyCustomEvent1<T extends HTMLElement = HTMLElement> = {
  target: T;
  type: string;
};

// extends句法卸载前面，默认值句法卸载后面
// 上面表示 T至少是HTMLElement类型，并且默认类型也是HTMLElement类型

// 练习
type Is<T> = {
  (first: T, last: T): boolean;
};

const is = function <T>(first: T, last: T): boolean {
  if (first === last) {
    return true;
  }
  return false;
};

is("a", "b");
is(true, false);
is([{ a: 3 }], {}); // 这样也可以？

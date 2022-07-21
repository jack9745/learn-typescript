// Object Types 对象类型
// 如果面试官问你 怎么理解typescript是结构化的类型系统 怎么回答？？？

// 匿名的对象类型
// As we’ve seen, they can be anonymous:
// 直接写在注解里
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}

// Optional Properties 可选属性修饰符

// 怎么理解可选属性
// . All optionality really says is that if the property is set,
// it better have a specific type.
// 如果属性被设置，它最后有一个确定的类型
interface PaintOptions {
  shape: string;
  xPos?: number;
  yPos?: number;
}
// 下面写法都是可以的
let circle: PaintOptions = {
  shape: "circle",
  xPos: 90,
  yPos: undefined,
};
let square: PaintOptions = {
  shape: "square",
};

// 因为xPos是可选属性，当我们读取它的值的时候，可能是undefined,所以下面写法挺好的
circle.xPos?.toFixed();

// 可以为可选属性设置默认值
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);

  console.log("y coordinate at", yPos);

  // ...
}

// readonly Properties
type UserInfo = {
  readonly name: string;
  readonly address: {
    province: string;
    city: string;
  };
  readonly friendList: string[];
  hobby: ReadonlyArray<string>;
  // 这里需要注意的是 friendList的修饰符是readonly 仅仅表示 不能重新赋值
  // hobby 是只读数组，数组上的改变数组的方法都不能用
};
let user: UserInfo = {
  name: "huangtao",
  address: {
    province: "hubei",
    city: "xiantao",
  },
  friendList: [],
  hobby: ["ball", "swim"],
};
// 看到会编译检查错误
// user.name = "jack huangtao";

// 怎么理解只读属性  readonly
// Using the readonly modifier doesn’t necessarily imply that a value is totally immutable

// 这样是可以的
user.address.province = "zhongguohubei";

user.friendList.push("lily");
// user.friendList = []  // 这样又是不可以的

// 提示没有push方法
// user.hobby.push("ball");

// 这样是不可以的
// user.address = {};

// 所以我的理解就是不能直接给一个只读属性赋值
// 如果只读属性修饰的属性的类型是一个对象，那么不能改变它的内存地址，也就是不能直接赋值
// 但是可以改变它的属性

// TypeScript doesn’t factor in whether properties on two types are readonly
// when checking whether those types are compatible,
// so readonly properties can also change via aliasing.

// 当typescript 检查两个类型的值是否可以赋值时，是不会考虑属性的readonly修饰符的

// Using mapping modifiers, you can remove readonly attributes.

interface Person {
  name: string;
  age: number;
}
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let readonlyPeson: ReadonlyPerson = {
  name: "jack huangtao",
  age: 18,
};
// 依然是不可以的
// readonlyPeson.name = "jack";

//
let writablePerson: Person = readonlyPeson;
// 依然是可以修改的
writablePerson.name = "jack ";

//  Index Signatures 对象类型的索引签名
// 写法都可以
// interface StringArray {
//   [index: number]: string;
//   index: number;
// }

// 怎么理解索引签名
/**
 * It is possible to support both types of indexers,
 * but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer.
 * This is because when indexing with a number,
 * JavaScript will actually convert that to a string before indexing into an object.
 * That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string),
 * so the two need to be consistent.
 *
 */
// 数值类型的索引签名的属性的类型 必须是字符串索引签名的属性的类型的子类
// 就是上面的第二句话

interface Animal {
  name: string;
}
interface Dog extends Animal {
  color: string;
}

// 下面这样会报错，因为 Animal 类型是Dog类型的父类，而不是子类，刚好搞反了
// 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'.
// interface Cat {
//   [index: number]: Animal;
//   [index: string]: Dog;
// }

interface Bird {
  [index: number]: Dog;
  [index: string]: Animal;
}
type StringArray = {
  [index: number]: string;
  index: number;
};
const myArray: StringArray = {
  0: "huangtao",
  index: 90,
};
myArray[0];

myArray["0"];

// While string index signatures are a powerful way to describe the “dictionary” pattern,
//  they also enforce that all properties match their return type.
// This is because a string index declares that obj.property is also available as obj["property"].
// In the following example,
//  name’s type does not match the string index’s type, and the type checker gives an error:

interface NumberDictionary {
  [index: string]: number;

  length: number; // ok
  // name: string;
}

// Extending Types
// 类型别名也可以继承
type BasicAddress = {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
};

// 可以通过extend语句将其他的类型的属性赋值一份给到自己，然后再添加自己的属性
interface AddressWithUnit extends BasicAddress {
  unit: string;
}

// interfaces can also extend from multiple types.
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
// 一个接口继承多个接口时，被继承的多个接口用逗号分割，
interface ColorfulCircle extends Colorful, Circle {}

let cc: ColorfulCircle = {
  color: "red",
  radius: 90,
};

// Intersection Types 交叉类型
/**
 * interfaces allowed us to build up new types from other types by extending them.
 * TypeScript provides another construct called intersection types
 * that is mainly used to combine existing object types.
 * */
// An intersection type is defined using the & operator.
// 交叉类型的作用是什么，组合现有类型，新产生的类型有现有类型的所有成员

// 注意这里用的是type关键字，而不是interface

// Here, we’ve intersected Colorful and Circle to produce a new type
//  that has all the members of Colorful and Circle.
type ColorfulCircleOne = Colorful & Circle;

let dd: ColorfulCircleOne = {
  color: "blue",
  radius: 89,
};

// 对象类型中的泛型
// Instead, we can make a generic Box type which declares a type parameter.
// 我们用interface声明了一个类型Box,它有一个类型参数是Type ==> a type parameter.
interface Box<Type> {
  content: Type;
}

/**
 *
 * You might read this as “A Box of Type is something
 *  whose contents have type Type”.
 * Later on, when we refer to Box,
 * we have to give a type argument in place of Type.*/

let box: Box<string> = {
  content: "hello,world",
};

/**
 *
 * Think of Box as a template for a real type, where Type is a placeholder that will get replaced with some other type. When TypeScript sees Box<string>, it will replace every instance of Type in Box<Type> with string, and end up working with something like { contents: string }. In other words, Box<string> and our earlier StringBox work identically.
 *
 * */

// 我们可以理解Type只是一个占位符，稍后会被具体的某个类型替代，用到Type的地方都
//会被提到

interface Apple {
  color: string;
}

type ColorApple = Box<Apple>;

// type aliases can also be generic.

//  数组类型
// Much like the Box type above, Array itself is a generic type.
function doStuff(list: readonly string[]): ReadonlyArray<string> {
  // 会报错
  // list.push("apple");
  // 赋值的时候不是不考虑修饰符吗
  // ????  看后面的注释，数组不一样
  // let innerList: Array<string> = list;
  return [];
}

function doStuffTwo(list: ReadonlyArray<string>) {
  // 会报错
  // list.pop("apple");
}

let list = doStuff(["huangtao"]);
// 悬浮上去可以看到 list 是只读数组 let list: readonly string[]

// 下面会检查错误
// list.push("huangtao");

// Unlike Array, there isn’t a ReadonlyArray constructor that we can use.
// ReadonlyArray 不是构造函数，而是一个泛型类型
// 下面是错误的
// new ReadonlyArray("red", "green", "blue");

// One last thing to note is that unlike the readonly property modifier, assignability isn’t bidirectional between regular Arrays and ReadonlyArrays.

// 只读数组为什么可以被重新赋值 ？？？？
let x: ReadonlyArray<string> = [];
x = ["jack", "huangtao"];
x = ["red", "blue"];

let y: string[] = [];
// 类型 "readonly string[]" 为 "readonly"，不能分配给可变类型 "string[]"。ts(4104)
// 只读类型的数组不能赋值给 可变类型的数组， 但是可变类型的数组可以赋值给只读类型的
// y = x;
// 下面是可以的
x = y;
x = ["jack", "huangtao"];
x = ["red", "blue"];

let point = [3, 4] as const;
// 不能将类型“4”分配给类型“3”。
// point = [4, 5];

// Tuple Types
// 什么是元组类型 就是数组的另外一种类型，这种类型的数组，我们可以为每个元素声明不同的类型

type StringNumberPair = [string, number];

function doSomething(list: StringNumberPair) {
  // 还可以解构
  const [inputString, hash] = list;
}

// Another thing you may be interested in is that tuples can have optional properties by writing out a question mark (? after an element’s type). Optional tuple elements can only come at the end, and also affect the type of length.

// 元组类型中的元素有可选元素 ,可选元素只能放在最后
// type Either2dOr3d = [number, number, number?];
type CityInfo = [string, string?, number?];

// 都是可以的
let homeTown: CityInfo = ["hubei", "xiantao", 90];
homeTown = ["hubei", "xiantao"];

// function readButtonInput(...args: [string, number, ...boolean[]]) {
//   const [name, version, ...input] = args;
//   // ...
// }

// 两种写法是等价的
function readButtonInput(name: string, version: number, ...input: boolean[]) {
  // ...
}

// 由上面的声明可以看出，在typescript中函数的声明时不能重复的，否则会检查错误

// Tuples can also have rest elements, which have to be an array/tuple type.

// rest elements 可以在任何地方
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

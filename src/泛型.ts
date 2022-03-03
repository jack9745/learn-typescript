/**
 * 什么是泛型
 * 泛型参数就是在类型层面施加约束的占位类型，也称为多态类型参数
 * 泛型参数简称为泛型
 *
 * 为什么要用泛型
 * 与泛型相反的是具体的类型
 * 什么是具体的类型，如果boolean string number null 等等 这些是具体的类型
 * 我们使用具体类型的前提是明确知道某个参数或者某个变量需要什么样的类型
 * 但是有时候我们不确定需要什么样的类型，或者不想限定只能接受某些类型，
 * 那么这个时候就可以用泛型了
 *
 * 怎么用泛型
 * 怎么声明泛型
 * 泛型参数使用<>表示，里面写一个占位符就可以了
 * Typescript将保证同一作用域中的相同泛型都将被同一具体类型绑定
 * 在同一个<>可以声明任意多个泛型，用逗号分隔
 *
 * **/

type Filter = {
  <T>(array: T[], f: (item: T, index: number) => boolean): T[];
};
// 实现函数调用签名中 要返回T[]
// 参数f的类型是一个函数签名，逻辑要返回一个布尔值
let filter: Filter = (array, f) => {
  // 要返回一个数组
  let list = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (f(item, i)) {
      list.push(item);
    }
  }
  return list;
};

// 函数调用1
filter([1, 2, 3], (item) => {
  return item > 2;
});

// 函数调用2
let stringList = ["a", "b", "c"];
// 第二个参数是函数，这里要在行内声明函数
filter(stringList, (item, index) => {
  return item.startsWith("a");
});

/**
 * 每次函数调用都会重新绑定函数的参数，类似的，
 * typescript会根据传入的参数重新推导出泛型应该绑定到哪一种具体的类型，
 * 或者说被哪一种具体的类型所替换。
 * */

/**
 * 泛型绑定具体的类型过程
 *
 * */

/**
 * 可以在什么地方声明泛型
 *
 * */

/**
 * 什么时候绑定泛型
 * */

// 函数签名
type NewFilter<T> = {
  (array: T[], f: (item: T) => boolean): T[];
};
// 定义一个函数表达式，并且将泛型绑定到具体一个类型
let myFilter: NewFilter<number>;

// 实现签名，定义函数
myFilter = (array, f) => {
  let list = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (f(item)) {
      list.push(item);
    }
  }
  return list;
};

myFilter([1], (item) => item > 2);

//注意 FilterA 和 FilterB的区别
// 泛型T的作用域 在某一个新的类型中，在****声明函数****时就绑定了泛型到具体类型
type FilterA<T> = (array: T[], f: (item: T) => boolean) => T[];

// 泛型T的作用域在单个签名中,每次***调用****函数时，才将泛型绑定到具体类型
type FilterB = <T>(array: T[], f: (item: T) => boolean) => T[];

type FilterC = FilterA<number>;
let filterC: FilterA<number> = (array, f) => {
  let list = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (f(item)) {
      list.push(item);
    }
  }
  return list;
};
filterC([1, 2, 3], (item) => {
  return item > 2;
});
// 将一组类型的元素映射成另外一种类型的元素
type CoustomMap = {
  <T, U>(array: T[], f: (item: T) => U): U[];
};

let customMap: CoustomMap = (array, f) => {
  let list = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    list[i] = f(item);
  }
  return list;
};
customMap([1, 2, 3], (item) => {
  return { value: item };
});

/**
 *
 * 泛型推导
 * 多数情况下，Typescript都可以自动推导出泛型，
 * 不过也可也显示的注解泛型，注解泛型时，要么所有泛型都注解，要么都不注解，
 * typescript将检测推导出来的泛型是否可赋值给显示绑定的泛型，如果不能将报错
 * */

customMap<number, { value: number }>([1, 2, 3], (item) => {
  return { value: item };
});

// 需要显示的注解Promise的泛型参数
let promise = new Promise<number>((resolve) => {
  resolve(45);
});

// typescript推导出来的rusult是unknown类型的，所以需要显示的注解
promise.then((result) => {
  result * 5;
});

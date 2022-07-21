/**
 * 类型运算符有哪些
 * 我们已经知道类型运算符有哪些  | & 分别表示联合类型和交叉类型
 * Typescript提供的类型运算符不止这几个
 * */
// 知识点
// 什么是 键入运算符
// 键入运算符用[] 中括号表示，像在对象中查找属性的句法一样
// 跟在对象中查找某个属性的值一样，我们也可以在结构中查找属性的结构类型
// 我觉得上面这句话很重要
type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[];
    };
  };
};

type FriendList = APIResponse["user"]["friendList"];

type Friend = FriendList["friends"][number];

let friend: Friend = {
  lastName: "jack",
  firstName: "huangtao",
};

let friendList: FriendList = {
  count: 10,
  friends: [
    { lastName: "jack", firstName: "huangtao" },
    { lastName: "jack", firstName: "huangtao" },
    { lastName: "jack", firstName: "huangtao" },
    { lastName: "jack", firstName: "huangtao" },
  ],
};

// 任何结构都可是键入，比如，对象，类，数组

// ---------------------
// ---------------------
// 知识点
// keyof 运算符
// keyof 运算符是干嘛的
// 获取对象所有的键名组成的联合类型

type ResponseKeys = keyof APIResponse;

type FriendKeys = keyof Friend;

interface Book {
  name: string;
  time: Date;
}

// type keys = keyof Book;
// keyof 运算符只能作用于对象吗，数组好像也可以

// 练习
function get<O extends object, K extends keyof O>(obj: O, key: K): O[K] {
  return obj[key];
}

// 声明了两个泛型
/**
 * 泛型O至少是一个object 类型，
 * 泛型K至少是一个 O类型的键名联合类型的子类型
 *
 * O[K] 的类型是在O中查找K得到具体类型
 * */

get({ a: 2, c: "huangtao" }, "c");
get({ a: 2, c: 3 }, "d"); // 这样就报错了，因为对象就没有属性是d的元素

type Nested = {
  a: {
    b: {
      c: {
        d: number;
      };
    };
  };
};

type One = keyof Nested;
type two = Nested["a"];

// 为某一个函数声明函数重载签名
type Get = {
  // 第一个签名，只有一个key
  <O extends object, K extends keyof O>(obj: O, key: K): O[K];
  // 第二个签名，有两个key
  <O extends object, K extends keyof O, K1 extends keyof O[K]>(
    obj: O,
    key: K,
    key1: K1
  ): O[K][K1];
  // 第三个签名，有三个key
  <
    O extends object,
    K1 extends keyof O,
    K2 extends keyof O[K1],
    K3 extends keyof O[K1][K2]
  >(
    obj: O,
    key1: K1,
    key2: K2,
    key3: K3
  ): O[K1][K2][K3];
};

// 上面的重载签名可以获取嵌套对象的值

let nestedObj: Nested = {
  a: {
    b: {
      c: {
        d: 39,
      },
    },
  },
};

let getValue: Get = (obj: number, ...keys: string[]) => {
  // 怎么来实现功能
};

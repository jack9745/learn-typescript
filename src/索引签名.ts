/**
 * 索引签名的相关知识点
 * 我的问题
 * 什么是索引签名？？？
 * 索引签名解决了什么问题？？？
 *
 * */

/**
 * [key :T] :U
 * 这个句法的意思是，类型为T的键，对应的值的类型为U
 *
 *
 * 这样的句法被称为索引签名
 * 我们通过这种方式告诉Typescrit 某个对象用了这种索引签名，
 * 那么这个对象可能有更多这样的键值对，
 * 那么你可以放心的添加更多的这样键值对
 *
 * **/

/**
 * 下面这种注解存在问题，因为索引签名指定键为string类型的值也必须是string类型
 * 但是b的值的类型确实number类型，所以会报错
 *
 * */

/**
 * 我的疑问？索引签名只能在对象或者数组种使用吗？
 * */
let obj: {
  b: number;
  [key: string]: string;
};

//正确的写法可以改为如下
let obj2: {
  b: number;
  0: string;
  [key: number | string | symbol]: string | number;
  //
};
//example
let obj3: {
  name: string;
  [key: string]: string;
};
obj2 = {
  b: 123,
  0: "jack",
  name: "rose",
};

// 下面说一下对象的可选参数
/**
 * 怎么声明可选参数：在属性后面加一个问号即可,
 *  ? 是修饰符，修饰属性的
 * 将鼠标悬浮在time上，可以看到 time的类型是 Date | undefined
 * 所以可以显示的声明值为undefined
 * 有一条规则要记住：就是key的类型必须是number，string，symbol种的一种类型
 * */
let book: {
  time?: Date;
};
// 下面三种赋值都是对的
book = {
  time: new Date(),
};
book = {
  time: undefined,
};
book = {};

// 下面就是错误的
book = {
  time: null,
};

/**
 * readonly修饰符
 * 修饰符要放在属性前面
 * */
let phone: {
  readonly size: number;
};

phone = {
  size: 1900,
};
phone = {
  size: 1000,
}; // 这样可以

phone.size = 1800; // 这样是错误的，因为size是只读的

export default book;

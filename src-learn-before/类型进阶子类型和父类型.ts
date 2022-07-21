/**
 *
 * 什么是子类型？
 * 什么是父类型？
 * 书上是这么说的：如果有两个类型A和B,
 * 如果B是A的子类型，那么在使用A的地方都可以放心的使用B
 * 也就是说在使用超类的地方，可以使用放心的使用子类，
 * 但也不是绝对没有安全问题的，
 *
 * 我的理解：父类型的类型范围更大，子类型的类型范围要小一些
 *
 * Typescript中各个类型之间的关系
 * Array 是Object的子类型
 * Tuple是Array的子类型
 * 所有类型都是any类型的子类型
 *
 * 如果Bird类扩展自Animal类，那么Bird类就是Animal类的子类型
 *
 * 所以我的理解，在使用父类的地方可以使用子类
 * 一个类（子类）扩展自另外一个类（父类），子类就是子类型，父类就是父类型
 * */
//
type ExistingUser = {
  id: number;
  name: string;
};

type NewUser = {
  name: string;
};

function deleteUser(user: { id?: number; name: string }) {
  delete user.id;
}

// 结构和数组的型变
let user: ExistingUser = {
  id: 1233456,
  name: "jack",
};
// 将user变量传给 deleteUser是没有问题的
// user的类型是deleteUser函数的参数的子类型
deleteUser(user);

// 那么反过来，在子类型的地方可以使用超类型吗

type DriverUser = {
  id?: number | string;
  name: string;
};

let driver: DriverUser = {
  id: "12345",
  name: "jack",
};
// 这里的错误提示是 不能将类型string |number|undefined 分配给类型 number | undefined
// 因为driver的类型要大于 deleteUser参数的类型，是它的超类，所以这里就报错了
// 所以在子类的地方不能用超类
deleteUser(driver);

// 如果想保证A对象可以赋值给对象B,
// 那么A对象的每个属性的类型都要是B对象对应的属性类型的子类型

// 什么是协变
/**
 * Typescript的行为是这样的，ts需要一种预期的结构类型，我们可以使用属性的类型
 * （是预期的子类型）小于预期类型的结构，
 * 我们说typescript对结构的属性类型进行了协变
 * */

/**
 * 什么是可赋值性
 * 子类型和超类是静态类型语言中的核心概论
 * 如果A类型是B类型的子类型，那么A就可以赋值给B
 *
 * 很多报错都是前者不能赋值给后者，那么就说明前者是后者的父类型，而不是子类型
 * */
